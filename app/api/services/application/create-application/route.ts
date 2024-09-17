import { NextRequest } from 'next/server'
import { APPLICATION_ROUTE } from '@/app/constants/routes'
import { handleApiRequest } from '@/app/services/handleApiRequest'

export async function POST(request: NextRequest) {
  return handleApiRequest(request, APPLICATION_ROUTE, 'POST')
}