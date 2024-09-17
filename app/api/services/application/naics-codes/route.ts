import { NextRequest, NextResponse } from 'next/server';
import { handleApiRequest } from '@/app/services/handleApiRequest';
import { API_ROUTE } from '@/app/constants/routes';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const naicsCode = searchParams.get('naics_code');

  if (!naicsCode) {
    return NextResponse.json({ error: 'NAICS code is required' }, { status: 400 });
  }

  const url = `${API_ROUTE}/amount-awarded?naics_code=${encodeURIComponent(naicsCode)}`;

  return handleApiRequest(request, url, 'GET');
}