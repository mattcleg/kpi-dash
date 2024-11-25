export async function getKpiData() {
  console.log('Attempting to fetch KPI data...');
  try {
    const kpiDataString = process.env.KPI_DATA;
    console.log('KPI_DATA env var exists:', !!kpiDataString);
    if (!kpiDataString) {
      console.error('KPI_DATA environment variable is not set');
      throw new Error('KPI_DATA environment variable is not set');
    }
    try {
      const parsedData = JSON.parse(kpiDataString);
      console.log('Successfully parsed KPI data');
      return parsedData;
    } catch (parseError) {
      console.error('Error parsing KPI_DATA:', parseError);
      throw new Error('Invalid JSON in KPI_DATA environment variable');
    }
  } catch (error) {
    console.error('Error reading KPI data:', error);
    throw error;
  }
}

