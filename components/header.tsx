import { Mountain } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <Mountain className="h-6 w-6 mr-2" />
        <h1 className="text-2xl font-bold">Team KPI Dashboard</h1>
      </div>
    </header>
  )
}

