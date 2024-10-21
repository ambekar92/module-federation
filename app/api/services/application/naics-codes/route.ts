import { NextRequest, NextResponse } from 'next/server';
import { API_ROUTE } from '@/app/constants/routes';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const naicsCode = searchParams.get('naics_code');
  const keyword = searchParams.get('keyword');
  let url;

  if (!naicsCode && !keyword) {
    return NextResponse.json({ error: 'NAICS code or keyword is required' }, { status: 400 });
  }

  if (keyword) {
    url = `${API_ROUTE}/amount-awarded?keyword=${encodeURIComponent(keyword)}`;
  } else {
    url = `${API_ROUTE}/amount-awarded?naics_code=${encodeURIComponent(naicsCode!)}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json({ error: 'An error occurred' }, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.error('Error in NAICS code API route:', error);
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}