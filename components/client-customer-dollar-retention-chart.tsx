'use client'

import dynamic from 'next/dynamic'

const CustomerDollarRetentionChart = dynamic(
  () => import('./customer-dollar-retention-chart').then(mod => mod.CustomerDollarRetentionChart),
  { ssr: false }
)

interface ClientCustomerDollarRetentionChartProps {
  data: {
    quarter: string
    year: number
    retention: number
  }[]
}

export function ClientCustomerDollarRetentionChart({ data }: ClientCustomerDollarRetentionChartProps) {
  return <CustomerDollarRetentionChart data={data} />
}

