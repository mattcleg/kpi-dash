import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

interface ChartData {
  quarter: string
  year: number
  retention: number
}

interface CustomerDollarRetentionChartProps {
  data: ChartData[]
}

export function CustomerDollarRetentionChart({ data }: CustomerDollarRetentionChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    label: `${item.quarter} ${item.year}`
  }))

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Customer Dollar Retention</CardTitle>
        <CardDescription>Quarterly retention rate from Q1 2024 to Q1 2025</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="label" 
                tick={{ fontSize: 12 }}
                interval={0}
              />
              <YAxis 
                domain={[90, 100]} 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, "Retention"]}
                labelFormatter={(label) => `Quarter: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="retention" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
