export const featureFlags = {
    showCustomerDollarRetention: false,
    showEnterpriseSlackRequests: true,
    showCustomerOnsiteVisits: true,
    showCustomerSuccessActivities: false,
  };
  
  export type FeatureFlag = keyof typeof featureFlags;
  
  