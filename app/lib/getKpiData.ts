import fs from 'fs/promises';
import path from 'path';

export async function getKpiData() {
  console.log('Attempting to fetch KPI data...');
  try {
    let kpiData;

    if (process.env.NODE_ENV === 'development') {
      // For local development, read from the JSON file
      const filePath = path.join(process.cwd(), 'data', 'kpi-data.json');
      console.log('Attempting to read file from:', filePath);
      try {
        const fileContents = await fs.readFile(filePath, 'utf8');
        kpiData = JSON.parse(fileContents);
        console.log('Successfully loaded KPI data from local file');
      } catch (readError) {
        console.error('Error reading local file:', readError);
        throw new Error(`Failed to read local KPI data file: ${readError.message}`);
      }
    } else {
      // For production (Vercel), use the environment variable
      const kpiDataString = process.env.KPI_DATA;
      console.log('KPI_DATA env var exists:', !!kpiDataString);
      
      if (!kpiDataString) {
        throw new Error('KPI_DATA environment variable is not set');
      }

      try {
        kpiData = JSON.parse(kpiDataString);
        console.log('Successfully parsed KPI data from environment variable');
      } catch (parseError) {
        console.error('Error parsing KPI_DATA:', parseError);
        throw new Error('Invalid JSON in KPI_DATA environment variable');
      }
    }

    // Validate the required structure
    if (!kpiData || typeof kpiData !== 'object' || !kpiData.customerDollarRetention?.value) {
      throw new Error('Invalid KPI data structure: missing required fields');
    }

    // Provide default values for optional fields
    const processedData = {
      customerDollarRetention: {
        value: kpiData.customerDollarRetention.value,
      },
      customerDollarRetentionChart: kpiData.customerDollarRetentionChart ?? [],
      recommendedCallsPerMonth: {
        quarterlyTarget: kpiData.recommendedCallsPerMonth?.quarterlyTarget ?? 0,
        completed: kpiData.recommendedCallsPerMonth?.completed ?? 0,
        previousMonth: kpiData.recommendedCallsPerMonth?.previousMonth ?? 0,
      },
      ebrsPlanned: {
        value: kpiData.ebrsPlanned?.value ?? 0,
        upcomingEBRs: kpiData.ebrsPlanned?.upcomingEBRs ?? [],
        totalARR: kpiData.ebrsPlanned?.totalARR ?? 0,
        quarterlyTarget: kpiData.ebrsPlanned?.quarterlyTarget ?? 0,
        completed: kpiData.ebrsPlanned?.completed ?? 0,
      },
      successPlans: {
        inProgress: kpiData.successPlans?.inProgress ?? 0,
        shared: kpiData.successPlans?.shared ?? 0,
        totalARR: kpiData.successPlans?.totalARR ?? 0,
        quarterlyTarget: kpiData.successPlans?.quarterlyTarget ?? 0,
        completed: kpiData.successPlans?.completed ?? 0,
      },
      conversationsOnV0: {
        value: kpiData.conversationsOnV0?.value ?? 0,
        totalARR: kpiData.conversationsOnV0?.totalARR ?? 0,
        quarterlyTarget: kpiData.conversationsOnV0?.quarterlyTarget ?? 0,
        completed: kpiData.conversationsOnV0?.completed ?? 0,
      },
      customerOnsiteVisits: {
        completed: kpiData.customerOnsiteVisits?.completed ?? 0,
        upcoming: kpiData.customerOnsiteVisits?.upcoming ?? 0,
        total: kpiData.customerOnsiteVisits?.total ?? 0,
        upcomingOnsiteTop5: kpiData.customerOnsiteVisits?.upcomingOnsiteTop5 ?? [],
        totalARR: kpiData.customerOnsiteVisits?.totalARR ?? 0,
        quarterlyTarget: kpiData.customerOnsiteVisits?.quarterlyTarget ?? 0,
      },
      enterpriseSlackRequests: {
        newRequests: kpiData.enterpriseSlackRequests.newRequests,
        lastMonth: kpiData.enterpriseSlackRequests.lastMonth,
        topChannels: kpiData.enterpriseSlackRequests.topChannels ?? [],
      },
      customerLaunches: {
        lastMonth: kpiData.customerLaunches?.lastMonth ?? 0,
        thisMonth: kpiData.customerLaunches?.thisMonth ?? 0,
        totalARR: kpiData.customerLaunches?.totalARR ?? 0,
      }
    };

    return processedData;
  } catch (error) {
    console.error('Error reading KPI data:', error);
    throw error;
  }
}

