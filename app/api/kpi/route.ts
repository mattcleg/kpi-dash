import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    // Get the path of the json file
    const jsonDirectory = path.join(process.cwd(), 'app/data');
    // Read the json file
    const fileContents = await fs.readFile(jsonDirectory + '/kpi-data.json', 'utf8');
    // Parse the data as json
    const data = JSON.parse(fileContents);

    // Return the data as a JSON response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading KPI data:', error);
    // Ensure we always return a response, even in case of an error
    return NextResponse.json({ error: 'Failed to load KPI data' }, { status: 500 });
  }
}

