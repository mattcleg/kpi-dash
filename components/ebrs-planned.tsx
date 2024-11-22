import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon } from 'lucide-react'

interface EBRsPlannedProps {
  value: number
  change: number
  upcomingEBRs: string[]
  totalARR: number
  quarterlyTarget: number
  completed: number
}

export function EBRsPlanned({ 
  value, 
  change, 
  upcomingEBRs, 
  totalARR,
  quarterlyTarget,
  completed
}: EBRsPlannedProps) {
  const percentToTarget = (completed / quarterlyTarget) * 100

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-semibold leading-none tracking-tight">EBRs Planned</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">For the current quarter</p>
        <div className="mt-2 pt-2 border-t">
          <p className="text-sm font-medium">Quarterly Target: {quarterlyTarget}</p>
          <p className="text-sm font-medium">Completed: {completed}</p>
          <p className="text-sm font-medium">% To Target: {percentToTarget.toFixed(1)}%</p>
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">Upcoming EBRs:</h4>
          <ul className="text-sm space-y-1">
            {upcomingEBRs.map((customer, index) => (
              <li key={index}>{customer}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4 pt-2 border-t">
          <p className="text-sm font-medium">Total ARR touched:</p>
          <p className="text-lg font-bold">${totalARR.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}

