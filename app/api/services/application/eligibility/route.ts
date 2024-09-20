import { APPLICATION_ELIGIBILITY_ROUTE } from '@/app/constants/routes'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { NextRequest } from 'next/server'

export async function PUT(request: NextRequest) {
  return handleApiRequest(request, APPLICATION_ELIGIBILITY_ROUTE, 'PUT')
}

export async function GET(request: NextRequest) {
  return handleApiRequest(request, APPLICATION_ELIGIBILITY_ROUTE, 'GET')
}