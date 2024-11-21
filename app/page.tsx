import { Header } from "../components/header"
import { KPICard } from "../components/kpi-card"
import { EBRsPlanned } from "../components/ebrs-planned"
import { ClientCustomerDollarRetentionChart } from "../components/client-customer-dollar-retention-chart"
import { CustomerOnsiteVisits } from "../components/customer-onsite-visits"
import { SuccessPlansCard } from "../components/success-plans-card"
import { CustomerLaunchesCard } from "../components/customer-launches-card"
import { CustomerAdoptionChecks } from "../components/customer-adoption-checks"
import ErrorBoundary from "../components/error-boundary"
import { getKpiData } from "./lib/getKpiData"
import { Suspense } from 'react'

export default async function Home() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <MainContent />
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}

async function MainContent() {
  let kpiData;
  try {
    kpiData = await getKpiData();
  } catch (error) {
    return <div className="container mx-auto px-4 py-8">Error loading KPI data. Please try again later.</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-8">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <KPICard
              title="Current Quarter Customer Dollar Retention"
              value={kpiData.customerDollarRetention.value.toString()}
              description="Current quarter-to-date"
              change={kpiData.customerDollarRetention.change}
              changeType={kpiData.customerDollarRetention.changeType}
              changeFrequency="from last quarter"
            />
          </div>
          {kpiData.customerDollarRetentionChart && (
            <div className="lg:col-span-2">
              <ClientCustomerDollarRetentionChart data={kpiData.customerDollarRetentionChart} />
            </div>
          )}
        </div>
      </section>

      {/* Rest of the component remains unchanged */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Touch Points</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <KPICard
            title="Target Avg Calls/Month Per CSM"
            value={String(kpiData.recommendedCallsPerMonth.quarterlyTarget ?? 0)}
            change={kpiData.recommendedCallsPerMonth.change}
            changeType={kpiData.recommendedCallsPerMonth.changeType}
            changeFrequency="from last month"
            additionalInfo={{
              label: "This Month vs Previous Month",
              currentValue: kpiData.recommendedCallsPerMonth.currentMonth,
              value: kpiData.recommendedCallsPerMonth.previousMonth,
              difference: kpiData.recommendedCallsPerMonth.change
            }}
            quarterlyTarget={kpiData.recommendedCallsPerMonth.quarterlyTarget}
          />
          <KPICard
            title="Enterprise Slack Requests"
            additionalInfo={{
              label: "Last Month's Requests",
              currentValue: kpiData.enterpriseSlackRequests.newRequests.toString(),
              value: kpiData.enterpriseSlackRequests.lastMonth.toString()
            }}
            change={kpiData.enterpriseSlackRequests.change}
            changeType={kpiData.enterpriseSlackRequests.changeType}
            changeFrequency="from last month"
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
        <h2 className="text-2xl font-bold mb-4">Customer Success Activities</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <SuccessPlansCard
            inProgress={kpiData.successPlans.inProgress}
            shared={kpiData.successPlans.shared}
            totalARR={kpiData.successPlans.totalARR}
            quarterlyTarget={kpiData.successPlans.quarterlyTarget}
            completed={kpiData.successPlans.completed}
          />
          <EBRsPlanned
            value={kpiData.ebrsPlanned.value}
            change={kpiData.ebrsPlanned.change}
            changeType={kpiData.ebrsPlanned.changeType}
            upcomingEBRs={kpiData.ebrsPlanned.upcomingEBRs}
            totalARR={kpiData.ebrsPlanned.totalARR}
            quarterlyTarget={kpiData.ebrsPlanned.quarterlyTarget}
            completed={kpiData.ebrsPlanned.completed}
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

    </main>
  );
}

