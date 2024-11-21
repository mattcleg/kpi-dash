import { KPIData } from '../types/kpi';

export async function getKpiData(): Promise<KPIData> {
  try {
    // Use a relative URL instead of an absolute one
    const res = await fetch('/api/kpi', { 
      next: { revalidate: 60 },
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data as KPIData;
  } catch (error) {
    console.error('Error fetching KPI data:', error);
    throw new Error('Failed to fetch KPI data');
  }
}

