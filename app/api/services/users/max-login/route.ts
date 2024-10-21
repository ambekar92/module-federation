import { NextRequest, NextResponse } from 'next/server';
import { API_ROUTE } from '@/app/constants/routes';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const t = searchParams.get('t') || Date.now().toString();
  
  try {
    const response = await fetch(`${API_ROUTE}/max-login?t=${t}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'An error occurred' });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.error('Error in MAX login API route:', error);
    }
    return NextResponse.json({ error: 'An unexpected error occurred' });
  }
}