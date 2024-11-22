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
      totalARR={totalARR}
      quarterlyTarget={quarterlyTarget}
      completed={completed}
    />
  )
}

