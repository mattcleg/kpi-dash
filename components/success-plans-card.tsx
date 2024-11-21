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
      value={`${inProgress} / ${shared}`}
      description="In Progress / Shared"
      change={0}
      changeType="increase"
      changeFrequency="No change"
      additionalInfo={{
        label: "Success Plans Breakdown",
        currentValue: inProgress.toString(),
        value: shared.toString()
      }}
      totalARR={totalARR}
      quarterlyTarget={quarterlyTarget}
      completed={completed}
    />
  )
}

