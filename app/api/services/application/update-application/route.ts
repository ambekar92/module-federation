import { NextRequest, NextResponse } from 'next/server';
import { handleApiRequest } from '@/app/services/handleApiRequest';
import { APPLICATION_ROUTE } from '@/app/constants/routes';

export async function PUT(request: NextRequest) {
  return handleApiRequest(request, APPLICATION_ROUTE, 'PUT');
}

export async function POST(request: NextRequest) {
  return handleApiRequest(request, APPLICATION_ROUTE, 'POST');
}