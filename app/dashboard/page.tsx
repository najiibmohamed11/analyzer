"use client"
import React, { useEffect, useState } from 'react'
import { transactionSchema, transactionSchemaType } from '../schema/transactions'
import { DashboardHeader } from './components/Dashboard-header'
import { ChartBarMultiple } from './components/EarningsChart'

function page() {
  const [allTransactions,setAllTransactions]=useState<transactionSchemaType|null|undefined>(null)
  useEffect(()=>{
    const transactions=localStorage.getItem("transactions")
    if(!transactions){
      setAllTransactions(undefined)
      return
    }
    const result=transactionSchema.safeParse(JSON.parse(transactions))
    console.log("helllllllllllllllllllllllllllllll")
    console.log(result)
    if(!result.success){
      setAllTransactions(undefined)
      return
    }
    setAllTransactions(JSON.parse(transactions) as transactionSchemaType)

  },[])
  if(allTransactions===null){
    return <div>loading....</div>
  }
  if(allTransactions===undefined){
    return <div>no transaction fund</div>
  }
  console.log("transactions",allTransactions)

  return(
     <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader/>
         <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Content Area (Left + Middle) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
             

              {/* Middle Column */}
              <div className="md:col-span-8 space-y-8">
                {/* <div>llllllllllllll</div> */}
                <ChartBarMultiple transactions={allTransactions}/>
              </div>
            </div>

            {/* Bottom Stats Section */}
            <div>
              <h2 className="mb-6 text-lg font-bold text-slate-900">Your statistics</h2>
                              <div>side card</div>

            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
                           <div>profile</div>

          </div>
        </div>
      </div>
     </div>

  )
}

export default page