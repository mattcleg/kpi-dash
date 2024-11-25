import path from 'path'
import { promises as fs } from 'fs'

export async function getKpiData() {
  try {
    const jsonDirectory = path.join(process.cwd(), 'app/data')
    const fileContents = await fs.readFile(jsonDirectory + '/kpi-data.json', 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error reading KPI data:', error)
    throw new Error('Failed to load KPI data')
  }
}

