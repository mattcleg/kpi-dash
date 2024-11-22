import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CustomerOnsiteVisitsProps {
  completed: number
  upcoming: number
  total: number
  upcomingOnsiteTop5: string[]
  totalARR: number
  quarterlyTarget: number
  isVerified: boolean
}

export function CustomerOnsiteVisits({ 
  completed, 
  upcoming, 
  total, 
  upcomingOnsiteTop5, 
  totalARR,
  quarterlyTarget
}: CustomerOnsiteVisitsProps) {
  const percentToTarget = (completed / quarterlyTarget) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Onsite Visits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-muted-foreground">Quarterly Target</p>
            <p className="text-xl font-bold">{quarterlyTarget}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-muted-foreground">Completed</p>
            <p className="text-xl font-bold">{completed}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
            <p className="text-xl font-bold">{upcoming}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-muted-foreground">Total</p>
            <p className="text-xl font-bold">{total}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-muted-foreground">% To Target</p>
            <p className="text-xl font-bold">{percentToTarget.toFixed(1)}%</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">Upcoming Onsite Visits:</h4>
          <ul className="text-sm space-y-1">
            {upcomingOnsiteTop5.map((company, index) => (
              <li key={index} className="text-sm">{company}</li>
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

