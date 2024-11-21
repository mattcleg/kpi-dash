import { Header } from "./header"
import { KPICard } from "./kpi-card"
import { EBRsPlanned } from "./ebrs-planned"
import { CustomerDollarRetentionChart } from "./customer-dollar-retention-chart"
import { CustomerOnsiteVisits } from "./customer-onsite-visits"
import { SuccessPlansCard } from "./success-plans-card"
import { CustomerLaunchesCard } from "./customer-launches-card"
import { CustomerAdoptionChecks } from "./customer-adoption-checks"
import ErrorBoundary from "./error-boundary"

const kpiData = {
  customerDollarRetention: {
    value: "95%",
    change: 1,
    changeType: "increase" as const
  },
  recommendedCallsPerMonth: {
    recommended: 16,
    currentMonth: 16,
    previousMonth: 12,
    change: 33.33
  },
  ebrsPlanned: {
    value: 15,
    change: 3,
    changeType: "increase" as const,
    upcomingEBRs: [
      "Acme Corp",
      "TechGiant Inc",
      "InnovateCo",
      "Global Systems Ltd",
      "FutureTech Solutions"
    ],
    totalARR: 7500000,
    quarterlyTarget: 20,
    completed: 15
  },
  successPlans: {
    inProgress: 8,
    shared: 12,
    totalARR: 4500000,
    quarterlyTarget: 25,
    completed: 20
  },
  conversationsOnV0: {
    value: 18,
    change: 31,
    changeType: "increase" as const,
    totalARR: 2000000,
    quarterlyTarget: 30,
    completed: 18
  },
  previewCommentsTouchpoints: {
    value: 92,
    change: 8,
    changeType: "increase" as const,
    totalARR: 3500000,
    quarterlyTarget: 100,
    completed: 92
  },
  cdnDiscoveryConversations: {
    value: 57,
    change: 5,
    changeType: "increase" as const
  },
  customerOnsiteVisits: {
    completed: 18,
    upcoming: 7,
    total: 25,
    upcomingOnsiteTop5: [
      "TechCorp Inc.",
      "Global Solutions Ltd.",
      "Innovate Systems",
      "DataDrive Analytics",
      "CloudNine Technologies"
    ],
    totalARR: 5000000,
    quarterlyTarget: 30
  },
  enterpriseSlackRequests: {
    lastWeek: 45,
    newRequests: 12,
    change: 26.67,
    changeType: "increase" as const,
    topChannels: [
      "product-feedback",
      "support-enterprise",
      "feature-requests"
    ]
  },
  customerLaunches: {
    lastMonth: 5,
    thisMonth: 7,
    totalARR: 3000000
  },
  customerAdoptionChecks: {
    completed: 40,
    quarterlyTarget: 50,
    totalARR: 6000000
  },
  customerDollarRetentionChart: [
    { quarter: "Q1", year: 2024, retention: 94 },
    { quarter: "Q2", year: 2024, retention: 95 },
    { quarter: "Q3", year: 2024, retention: 93 },
    { quarter: "Q4", year: 2024, retention: 96 },
    { quarter: "Q1", year: 2025, retention: 95 }
  ]
}

export default function Dashboard() {
  if (!kpiData || !kpiData.customerDollarRetention || !kpiData.recommendedCallsPerMonth) {
    return <div>Error: Missing required data</div>
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <section className="mb-8">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <KPICard
                  title="Current Quarter Customer Dollar Retention"
                  value={kpiData.customerDollarRetention.value}
                  description="Current quarter-to-date"
                  change={kpiData.customerDollarRetention.change}
                  changeType={kpiData.customerDollarRetention.changeType}
                  changeFrequency="from last quarter"
                />
              </div>
              <div className="lg:col-span-2">
                <CustomerDollarRetentionChart data={kpiData.customerDollarRetentionChart} />
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Touch Points</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <KPICard
                title="Recommended Calls/Month"
                value={kpiData.recommendedCallsPerMonth.recommended.toString()}
                description="Target number of calls"
                change={kpiData.recommendedCallsPerMonth.change}
                changeType="increase"
                changeFrequency="from last month"
                additionalInfo={{
                  label: "This Month vs Previous Month",
                  currentValue: kpiData.recommendedCallsPerMonth.currentMonth.toString(),
                  value: kpiData.recommendedCallsPerMonth.previousMonth.toString(),
                  difference: kpiData.recommendedCallsPerMonth.change
                }}
              />
              <KPICard
                title="Enterprise Slack Requests"
                value={kpiData.enterpriseSlackRequests.newRequests.toString()}
                description="New requests this week"
                change={kpiData.enterpriseSlackRequests.change}
                changeType={kpiData.enterpriseSlackRequests.changeType}
                changeFrequency="from last week"
                additionalInfo={{
                  label: "Last Week's Requests",
                  currentValue: kpiData.enterpriseSlackRequests.newRequests.toString(),
                  value: kpiData.enterpriseSlackRequests.lastWeek.toString(),
                  difference: kpiData.enterpriseSlackRequests.change
                }}
                topChannels={kpiData.enterpriseSlackRequests.topChannels}
              />
            </div>
          </section>

          <section className="mb-8">
            <CustomerOnsiteVisits
              completed={kpiData.customerOnsiteVisits.completed}
              upcoming={kpiData.customerOnsiteVisits.upcoming}
              total={kpiData.customerOnsiteVisits.total}
              upcomingOnsiteTop5={kpiData.customerOnsiteVisits.upcomingOnsiteTop5}
              totalARR={kpiData.customerOnsiteVisits.totalARR}
              quarterlyTarget={kpiData.customerOnsiteVisits.quarterlyTarget}
            />
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Additional KPIs</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <KPICard
                title="Conversations on v0"
                value={kpiData.conversationsOnV0.value.toString()}
                description="Total conversations to date"
                change={kpiData.conversationsOnV0.change}
                changeType={kpiData.conversationsOnV0.changeType}
                changeFrequency="this week"
                totalARR={kpiData.conversationsOnV0.totalARR}
                quarterlyTarget={kpiData.conversationsOnV0.quarterlyTarget}
                completed={kpiData.conversationsOnV0.completed}
              />
              <KPICard
                title="Preview Comments Touchpoints"
                value={kpiData.previewCommentsTouchpoints.value.toString()}
                description="Current number of touchpoints"
                change={kpiData.previewCommentsTouchpoints.change}
                changeType={kpiData.previewCommentsTouchpoints.changeType}
                changeFrequency="this week"
                totalARR={kpiData.previewCommentsTouchpoints.totalARR}
                quarterlyTarget={kpiData.previewCommentsTouchpoints.quarterlyTarget}
                completed={kpiData.previewCommentsTouchpoints.completed}
              />
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Customer Success Activities</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <EBRsPlanned
                value={kpiData.ebrsPlanned.value}
                change={kpiData.ebrsPlanned.change}
                changeType={kpiData.ebrsPlanned.changeType}
                upcomingEBRs={kpiData.ebrsPlanned.upcomingEBRs}
                totalARR={kpiData.ebrsPlanned.totalARR}
                quarterlyTarget={kpiData.ebrsPlanned.quarterlyTarget}
                completed={kpiData.ebrsPlanned.completed}
              />
              <SuccessPlansCard
                inProgress={kpiData.successPlans.inProgress}
                shared={kpiData.successPlans.shared}
                totalARR={kpiData.successPlans.totalARR}
                quarterlyTarget={kpiData.successPlans.quarterlyTarget}
                completed={kpiData.successPlans.completed}
              />
              <CustomerAdoptionChecks
                completed={kpiData.customerAdoptionChecks.completed}
                quarterlyTarget={kpiData.customerAdoptionChecks.quarterlyTarget}
                totalARR={kpiData.customerAdoptionChecks.totalARR}
              />
            </div>
          </section>

          <section>
            <CustomerLaunchesCard
              lastMonth={kpiData.customerLaunches.lastMonth}
              thisMonth={kpiData.customerLaunches.thisMonth}
              totalARR={kpiData.customerLaunches.totalARR}
            />
          </section>
        </main>
      </div>
    </ErrorBoundary>
  )
}

