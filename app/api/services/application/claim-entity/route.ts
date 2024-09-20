import { NextRequest, NextResponse } from 'next/server'
import { ENTITY_ROUTE } from '@/app/constants/routes'
import { handleApiRequest } from '@/app/services/handleApiRequest'


export async function POST(request: NextRequest) {
  return handleApiRequest(request, ENTITY_ROUTE, 'POST')
}