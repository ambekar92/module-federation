import { CHANGE_APPLICATION_TIER_ROUTE } from '@/app/constants/routes'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { NextRequest } from 'next/server'

export async function PUT(request: NextRequest) {
  return handleApiRequest(request, CHANGE_APPLICATION_TIER_ROUTE, 'PUT')
}