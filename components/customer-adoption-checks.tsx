import { KPICard } from "./kpi-card"

interface CustomerAdoptionChecksProps {
  completed: number
  quarterlyTarget: number
  totalARR: number
}

export function CustomerAdoptionChecks({ 
  completed, 
  quarterlyTarget,
  totalARR
}: CustomerAdoptionChecksProps) {
  return (
    <KPICard
      title="Customer Adoption Checks"
      value={completed.toString()}
      description="Completed adoption checks"
      change={0}
      changeType="increase"
      changeFrequency="No change"
      totalARR={totalARR}
      quarterlyTarget={quarterlyTarget}
      completed={completed}
    />
  )
}

