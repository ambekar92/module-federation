import { NextRequest, NextResponse } from 'next/server';
import { API_ROUTE } from '@/app/constants/routes';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const naicsCode = searchParams.get('naics_code');

  if (!naicsCode) {
    return NextResponse.json({ error: 'NAICS code is required' }, { status: 400 });
  }

  const url = `${API_ROUTE}/amount-awarded?naics_code=${encodeURIComponent(naicsCode)}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json({ error: 'An error occurred' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}