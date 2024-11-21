import fs from 'fs'
import path from 'path'

export function loadKpiData() {
  const filePath = path.join(process.cwd(), 'app', 'data', 'kpi-data.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents)
}

