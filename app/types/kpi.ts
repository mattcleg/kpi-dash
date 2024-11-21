type ChangeType = 'increase' | 'decrease';

interface MetricWithChange {
  value: string | number;
  change: number;
  changeType: ChangeType;
  isVerified: boolean; 
}

interface RecommendedCalls {
  recommended: number;
  completed: number;
  previousMonth: number;
  change: number;
  quarterlyTarget: number;
  changeType: ChangeType;
}

interface EBRsPlanned extends MetricWithChange {
  upcomingEBRs: string[];
  totalARR: number;
  quarterlyTarget: number;
  completed: number;
}

interface SuccessPlans {
  inProgress: number;
  shared: number;
  totalARR: number;
  quarterlyTarget: number;
  completed: number;
}

interface MetricWithTargets extends MetricWithChange {
  totalARR: number;
  quarterlyTarget: number;
  completed: number;
}

interface CustomerOnsiteVisits {
  completed: number;
  upcoming: number;
  total: number;
  upcomingOnsiteTop5: string[];
  totalARR: number;
  quarterlyTarget: number;
}

interface EnterpriseSlackRequests extends MetricWithChange {
  newRequests: number;
  lastMonth: number;
  change: number;
  changeType: ChangeType;
  topChannels?: string[];
}

interface CustomerLaunches {
  lastMonth: number;
  thisMonth: number;
  totalARR: number;
}

interface CustomerAdoptionChecks {
  completed: number;
  quarterlyTarget: number;
  totalARR: number;
}

interface RetentionDataPoint {
  quarter: string;
  year: number;
  retention: number;
}

export interface KPIData {
  customerDollarRetention: MetricWithChange;
  recommendedCallsPerMonth: RecommendedCalls;
  ebrsPlanned: EBRsPlanned;
  successPlans: SuccessPlans;
  conversationsOnV0: MetricWithTargets;
  previewCommentsTouchpoints: MetricWithTargets;
  cdnDiscoveryConversations: MetricWithChange;
  customerOnsiteVisits: CustomerOnsiteVisits;
  enterpriseSlackRequests: EnterpriseSlackRequests;
  customerLaunches: CustomerLaunches;
  customerAdoptionChecks: CustomerAdoptionChecks;
  customerDollarRetentionChart: RetentionDataPoint[];
}

