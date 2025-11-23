"use client"

import type React from "react"

import { motion } from "framer-motion"
import {  FileText,   } from "lucide-react"
import Image from "next/image"
import UploadCard from "./Upload-card"

interface ConnectedNodeProps {
  icon: React.ReactNode
  position: "left" | "right"
  index: number
  total: number
  label?: string
  delay?: number
}

function ConnectedNode({ icon, position, index, total, label, delay = 0 }: ConnectedNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={`absolute top-1/2 -translate-y-1/2 ${
        position === "left" ? "left-0" : "right-0"
      } flex items-center z-20`}
      style={{
        marginTop: `${(index - (total - 1) / 2) * 120}px`,
        [position === "left" ? "marginRight" : "marginLeft"]: "auto",
      }}
    >
      <div className="relative group">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-100 transition-transform hover:scale-105 hover:shadow-xl">
          {icon}
        </div>
        {label && (
          <div
            className={`absolute top-full mt-2 ${
              position === "left" ? "right-0" : "left-0"
            } bg-[#1a1b2e] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30`}
          >
            {label}
            <div
              className={`absolute bottom-full ${
                position === "left" ? "right-2" : "left-2"
              } border-4 border-transparent border-b-[#1a1b2e]`}
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}

function ConnectionLine({ position, index, total }: { position: "left" | "right"; index: number; total: number }) {
  const yOffset = (index - (total - 1) / 2) * 120
  const isLeft = position === "left"

  // SVG path calculation
  // Start from the node side
  const startX = isLeft ? 0 : 200
  const startY = 150 + yOffset

  // End at the card side - stop before reaching the card edge on both sides
  const endX = isLeft ? 150 : 50
  const endY = 150 + yOffset * 0.2 // Converge slightly towards center vertically

  // Control points for smooth bezier curve - consistent style on both sides
  const controlX1 = isLeft ? 50 : 150
  const controlX2 = isLeft ? 50 : 100

  return (
    <svg
      className={`w-full mt-15  absolute top-0 ${isLeft ? "left-16" : "right-13"} h-full  pointer-events-none z-0 hidden md:block`}
      style={{ overflow: "visible" }}
    >
      <motion.path
        d={`M ${startX} ${startY} C ${controlX1} ${startY} ${controlX2} ${endY} ${endX} ${endY}`}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
      />
   
    </svg>
  )
}

export function ConnectedUpload() {

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-12 flex justify-center items-center">
      {/* Left Nodes */}
      <div className="hidden md:flex flex-col items-end justify-center absolute left-0 top-0 bottom-0 w-[200px] pointer-events-none">
        <div className="pointer-events-auto contents">
          <ConnectedNode
          index={0}
            total={3.5}
            position="left"
            icon={
              <div className="relative w-10 h-10">
                <Image src="/images/logo-h.png" alt="H Logo" fill className="object-contain" />
              </div>
            }
            label="Source H"
            delay={0.2}
          />
          <ConnectionLine position="left" index={-0.6} total={2} />

          <ConnectedNode
            index={2}
            total={2}
            position="left"
            icon={<FileText className="w-8 h-8 text-red-500" />}
            delay={0.3}
          />
          <ConnectionLine position="left" index={2.2} total={2} />


        </div>
      </div>

          <UploadCard/>

      {/* Right Nodes */}

      <div className="hidden md:flex flex-col items-start justify-center absolute right-0 top-0 bottom-0 w-[200px] pointer-events-none">
        <div className="pointer-events-auto contents">
          <ConnectedNode
            index={0}
            total={3.5}
            position="right"
            icon={
              <div className="relative w-10 h-10">
                <Image src="/images/logo-wf.png" alt="WF Logo" fill className="object-contain" />
              </div>
            }
            delay={0.5}
          />
          <ConnectionLine position="right" index={-0.6} total={2} />
          
          <ConnectedNode
            index={2}
            total={2}
            position="right"
            icon={
              <div className="relative w-10 h-10">
                <Image src="/images/logo-salaam.png" alt="Salaam Logo" fill className="object-contain" />
              </div>
            }
            label="Ibrahim"
            delay={0.6}
          />
          <ConnectionLine position="right" index={2.2} total={2} />
{/* 
          <ConnectedNode
            index={2}
            total={3}
            position="right"
            icon={<Headphones className="w-8 h-8 text-purple-500" />}
            delay={0.7}
          />
          <ConnectionLine position="right" index={2} total={3} /> */}
        </div>
      </div>

    </div>
  )
}
