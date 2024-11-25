import { KPICard } from "./kpi-card"

interface SuccessPlansCardProps {
  inProgress: number
  shared: number
  totalARR: number
  quarterlyTarget: number
  completed: number
}

export function SuccessPlansCard({ 
  inProgress, 
  shared, 
  totalARR,
  quarterlyTarget,
  completed
}: SuccessPlansCardProps) {
  return (
    <KPICard
      title="Success Plans"
      description="In Progress / Shared"
      additionalInfo={{
        label: "In progress / Shared",
        currentValue: inProgress.toString(),
        value: shared.toString(),
      }}
      totalARR={totalARR}
      quarterlyTarget={quarterlyTarget}
      completed={completed}
      value={shared.toString()}
    />
  )
}

