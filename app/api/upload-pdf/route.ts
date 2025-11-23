import {  transactionSchemaType } from "@/app/schema/transactions";
import { NextRequest, NextResponse } from "next/server";
import  pdf  from "pdf-parse";
import z, { number } from "zod"

export const POST = async (request: NextRequest) => {
  const form = await request.formData();
  const pdfFile = form.get("pdf-file") as File;

  if (!pdfFile) {
    return NextResponse.json({ success: false, error: "No PDF provided" });
  }

  try {
    const binary = Buffer.from(await pdfFile.arrayBuffer());
    const loader = await pdf(binary)
    const stracturedPdfTxt=parseTransactions(loader.text)

   return NextResponse.json({
      success: true,
      data:stracturedPdfTxt,
    });
  } catch (e) {
    console.error("PDF parsing error:", e);
    return NextResponse.json({ 
      success: false, 
      error: "Parsing failed",
      details: e instanceof Error ? e.message : "Unknown error"
    });
  }
};


function parseTransactions(text: string) {
  const blocks = text.split("TRANSACTION").slice(1);
  const results:transactionSchemaType = [];

  const regex = /(\d{11,})\s+(\d{4}-\d{2}-)\s+(\d{2})\s+(\d{2}:\d{2}:\d{2})\s+(.+?)\$([\d.]+)\$([\d.]+)\$([\d.]+)([\s\S]*?)(?=\d{11,}|$)/g

  for (const block of blocks) {
    let match;
    while ((match = regex.exec(block)) !== null) {
      results.push({
      id: Number(match[1]),
      date: `${match[2]}${match[3]} ${match[4]}`, // YYYY-MM-DD HH:MM:SS
      otherParty: match[5].trim(),                // correct
      credit: Number(match[6]),
      debit: Number(match[7]),
      balance: Number(match[8]),
      description: match[9].trim().replace(/\s+/g, " "),
    });

    }
  }

  return results;
}


