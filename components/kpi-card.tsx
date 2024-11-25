import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'

interface AdditionalInfo {
  label: string;
  currentValue: string;
  value: string;
}

interface KPICardProps {
  title: string
  value: string
  description: string
  additionalInfo?: AdditionalInfo
  topChannels?: string[]
  quarterlyTarget?: number;
  completed?: number;
  totalARR?: number;
}

export function KPICard({ 
  title, 
  value, 
  description, 
  additionalInfo,
  topChannels,
  quarterlyTarget,
  completed,
  totalARR
}: KPICardProps) {
  const percentToTarget = quarterlyTarget && completed ? (completed / quarterlyTarget) * 100 : null

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-semibold leading-none tracking-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
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

