import { CREATING_APPLICATION_ROUTE } from '@/app/constants/routes'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  return handleApiRequest(request, CREATING_APPLICATION_ROUTE, 'POST')
}