export async function getKpiData() {
  try {
    const kpiDataString = process.env.KPI_DATA;
    if (!kpiDataString) {
      throw new Error('KPI_DATA environment variable is not set');
    }
    return JSON.parse(kpiDataString);
  } catch (error) {
    console.error('Error reading KPI data:', error);
    throw new Error('Failed to load KPI data');
  }
}

