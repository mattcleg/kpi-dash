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
  } catch (_error) {
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
            />
          </div>
          {kpiData.customerDollarRetentionChart && (
            <div className="lg:col-span-2">
              <ClientCustomerDollarRetentionChart data={kpiData.customerDollarRetentionChart} />
            </div>
          )}
        </div>
      </section>

      <section className="mb-8">
        <div className="grid gap-4 md:grid-cols-2">
          <KPICard
            title="Target Avg Calls/Month Per CSM"
            description="Target number of calls"
            value={String(kpiData.recommendedCallsPerMonth.quarterlyTarget ?? 0)}
            additionalInfo={{
              label: "Last Month's Requests",
              currentValue: kpiData.recommendedCallsPerMonth.completed.toString(),
              value: kpiData.recommendedCallsPerMonth.previousMonth.toString(),
            }}
          />
          <KPICard
            title="Enterprise Slack Requests"
            description="New requests"
            value={kpiData.enterpriseSlackRequests.newRequests.toString()}
            additionalInfo={{
              label: "Last Month's Requests",
              currentValue: kpiData.enterpriseSlackRequests.newRequests.toString(),
              value: kpiData.enterpriseSlackRequests.lastMonth.toString(),
            }}
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
        <div className="grid gap-4 md:grid-cols-3">
          <SuccessPlansCard
            inProgress={kpiData.successPlans.inProgress}
            shared={kpiData.successPlans.shared}
            totalARR={kpiData.successPlans.totalARR}
            quarterlyTarget={kpiData.successPlans.quarterlyTarget}
            completed={kpiData.successPlans.completed}
          />
          <EBRsPlanned
            value={Number(kpiData.ebrsPlanned.value)}
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

    </main>
  );
}

