import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CustomerLaunchesCardProps {
  lastMonth: number
  thisMonth: number
  totalARR: number
}

export function CustomerLaunchesCard({ lastMonth, thisMonth, totalARR }: CustomerLaunchesCardProps) {
  const change = ((thisMonth - lastMonth) / lastMonth) * 100
  const changeType = change >= 0 ? "increase" : "decrease"

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Customer Launches</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Launches Last Month</p>
            <p className="text-2xl font-bold">{lastMonth}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Launches This Month</p>
            <p className="text-2xl font-bold">{thisMonth}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <span className={`text-sm font-medium ${changeType === "increase" ? "text-green-500" : "text-red-500"}`}>
            {change.toFixed(2)}%
          </span>
          <span className="text-sm text-muted-foreground ml-2">
            {changeType === "increase" ? "increase" : "decrease"} from last month
          </span>
        </div>
        <div className="mt-4 pt-2 border-t">
          <p className="text-sm font-medium">Total ARR touched:</p>
          <p className="text-lg font-bold">${totalARR.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}

