import { NextRequest, NextResponse } from 'next/server';
import { handleApiRequest } from '@/app/services/handleApiRequest';
import { FIRM_EVALUATIONS_ROUTE } from '@/app/constants/routes';

export async function POST(request: NextRequest) {
  return handleApiRequest(request, FIRM_EVALUATIONS_ROUTE, 'POST');
}