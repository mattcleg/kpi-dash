import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string
  description: string
  change: number
  changeType: "increase" | "decrease"
  changeFrequency: string
  additionalInfo?: {
    label: string
    value: string
    currentValue: string
    difference: number
  }
  topChannels?: string[]
  totalARR?: number
  quarterlyTarget?: number
  completed?: number
}

export function KPICard({ 
  title, 
  value, 
  description, 
  change, 
  changeType, 
  changeFrequency,
  additionalInfo,
  topChannels,
  totalARR,
  quarterlyTarget,
  completed
}: KPICardProps) {
  const percentToTarget = quarterlyTarget && completed ? (completed / quarterlyTarget) * 100 : null

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-semibold leading-none tracking-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {quarterlyTarget && completed && (
          <div className="mt-2 pt-2 border-t">
            <p className="text-sm font-medium">Quarterly Target: {quarterlyTarget}</p>
            <p className="text-sm font-medium">Completed: {completed}</p>
            <p className="text-sm font-medium">% To Target: {percentToTarget?.toFixed(1)}%</p>
          </div>
        )}
        {additionalInfo && (
          <div className="mt-2 pt-2 border-t">
            <p className="text-sm font-medium">{additionalInfo.label}</p>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-muted-foreground">Current: </span>
                <span className="text-lg font-bold">{additionalInfo.currentValue}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Previous: </span>
                <span className="text-lg font-bold">{additionalInfo.value}</span>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center pt-1">
          {changeType === "increase" ? (
            <ArrowUpIcon className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-red-500" />
          )}
          <span className={`text-xs font-medium ${changeType === "increase" ? "text-green-500" : "text-red-500"}`}>
            {change}%
          </span>
          <span className="text-xs text-muted-foreground ml-1">{changeFrequency}</span>
        </div>
        {topChannels && (
          <div className="mt-2 pt-2 border-t">
            <p className="text-sm font-medium mb-1">Most Active Channels:</p>
            <ol className="text-sm list-decimal list-inside">
              {topChannels.map((channel, index) => (
                <li key={index} className="text-muted-foreground">{channel}</li>
              ))}
            </ol>
          </div>
        )}
        {totalARR !== undefined && (
          <div className="mt-2 pt-2 border-t">
            <p className="text-sm font-medium">Total ARR touched:</p>
            <p className="text-lg font-bold">${totalARR.toLocaleString()}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

