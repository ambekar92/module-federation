import { NextRequest, NextResponse } from 'next/server';
import { API_ROUTE } from '@/app/constants/routes';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const t = searchParams.get('t') || Date.now().toString();

    const response = await fetch(`${API_ROUTE}/max-login?t=${t}`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'An error occurred' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
		if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
			console.error('Error in MAX login API route:', error);
		}
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
