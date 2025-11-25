import { Bell, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between py-6">
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5 text-slate-600" />
          <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 border border-white" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <LogOut className="h-5 w-5 text-slate-600" />
        </Button>
      </div>
    </header>
  )
}
