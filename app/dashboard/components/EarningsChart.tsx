"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { transactionSchemaType } from "@/app/schema/transactions"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
export const description = "A multiple bar chart"

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]

const chartConfig = {
  desktop: {
    label: "income",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "expense",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
const formatDate = (d: Date) =>
  d.toISOString().split("T")[0]
const getLastWeekTransactions=(transactions:transactionSchemaType)=>{
  const reversedTransactions=[...transactions]
  reversedTransactions.reverse()
    const today= new Date()
    const weekTransactionData:{day:string,income:number,expense:number}[]=[ ];
    for(let i=6; i>=0;i--){   
        const thisDate=new Date()
        thisDate.setDate(thisDate.getDate()-i)
        const dayNameOfTheTransactionDate=thisDate.toLocaleString('en-us',{weekday:"short"});
       const sameDateTransactions= transactions.filter((transaction)=>{
        const transactionDate=new Date(transaction.date.split(" ")[0])
        return formatDate(thisDate)===formatDate(transactionDate)
       })
       const credit= sameDateTransactions.reduce((total,transaction)=>total+transaction.credit,0)     
       const debit= sameDateTransactions.reduce((total,transaction)=>total+transaction.debit,0)     
       weekTransactionData.push({day:dayNameOfTheTransactionDate,income:credit,expense:debit})
       console.log('sameDateTransactions',sameDateTransactions,thisDate)
    }
    return weekTransactionData
}

  function getMonthAndDayName(date:Date){
     const d = date.getDate();
  const m = date.getMonth() + 1; // month is 0-based
  return `${d}/${m}`;
  }
  function normalize(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
/**
 * Gets the start of the week (Monday) for a given date
 * @param date - The date to get the week start for
 * @returns A normalized date representing Monday of that week
 */
function getWeekStart(date: Date): Date {
  const normalized = normalize(date);
  const dayOfWeek = normalized.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  // Calculate days to subtract to get to Monday (0 = Monday)
  // If Sunday (0), subtract 6 days; if Monday (1), subtract 0 days; etc.
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const weekStart = new Date(normalized);
  weekStart.setDate(weekStart.getDate() - daysToSubtract);
  return normalize(weekStart);
}

function getLastMonthTransaction(transactions: transactionSchemaType) {
  const weekTransactionData: { day: string; income: number; expense: number }[] = [];

  // normalize today to midnight
  const today = normalize(new Date());
  const currentWeekStart = getWeekStart(today);
  
  // Process 4 periods: this week, last week, 2 weeks ago, 3 weeks ago
  for (let i = 0; i < 4; i++) {
    let startDay: Date;
    let endDay: Date;
    let label: string;

    if (i === 0) {
      // This week: from start of current week to today (inclusive)
      startDay = currentWeekStart;
      endDay = new Date(today);
      endDay.setDate(endDay.getDate() + 1); // Make it exclusive for filtering
      label = "This Week";
    } else {
      // Previous weeks: complete weeks (Monday to Sunday)
      const weekStart = new Date(currentWeekStart);
      weekStart.setDate(weekStart.getDate() - i * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7); // End of week (exclusive)
      
      startDay = normalize(weekStart);
      endDay = normalize(weekEnd);
      
      if (i === 1) {
        label = "Last Week";
      } else if (i === 2) {
        label = "2 Weeks Ago";
      } else {
        label = "3 Weeks Ago";
      }
    }

    const sameRange = transactions.filter((t) => {
      const transactionDate = normalize(new Date(t.date));
      return transactionDate >= startDay && transactionDate < endDay;
    });

    const credit = sameRange.reduce((sum, t) => sum + t.credit, 0);
    const debit = sameRange.reduce((sum, t) => sum + t.debit, 0);
    
    weekTransactionData.push({
      day: label,
      income: credit,
      expense: debit,
    });
  }

  return weekTransactionData;
}
export function ChartBarMultiple({transactions}:{transactions:transactionSchemaType}) {
  const [transactionsDateType,setTransactionsDateType]=useState<'week'|'month'>('week')
  const lastweekTransactions=getLastWeekTransactions(transactions)
  const lastMonthTransactions=getLastMonthTransaction(transactions)
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-lg font-bold">Earnings</CardTitle>
        <Tabs className="w-auto" defaultValue={transactionsDateType} value={transactionsDateType} onValueChange={(value)=>setTransactionsDateType(value as 'week'|'month')}>
          <TabsList className="bg-transparent p-0 gap-4" >
            <TabsTrigger
              value="week"
              className="bg-transparent p-0 text-xs font-bold uppercase text-slate-400 data-[state=active]:bg-transparent data-[state=active]:text-slate-900 data-[state=active]:shadow-none data-[state=active]:underline data-[state=active]:decoration-2 data-[state=active]:underline-offset-4 data-[state=active]:decoration-slate-900">
              Week
            </TabsTrigger>
            <TabsTrigger
              value="month"
              className="bg-transparent p-0 text-xs font-bold uppercase text-slate-400 data-[state=active]:bg-transparent data-[state=active]:text-slate-900 data-[state=active]:shadow-none  data-[state=active]:underline data-[state=active]:decoration-2 data-[state=active]:underline-offset-4 data-[state=active]:decoration-slate-900"
            >
              Month
            </TabsTrigger>
          </TabsList>
        </Tabs>
    
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={transactionsDateType==="week"?lastweekTransactions:lastMonthTransactions}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="expense" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="income" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
