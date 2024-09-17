import { ELIGIBLE_APPLY_PROGRAMS_ROUTE } from '@/app/constants/routes'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { NextRequest } from 'next/server'

export async function PUT(request: NextRequest) {
  return handleApiRequest(request, ELIGIBLE_APPLY_PROGRAMS_ROUTE, 'PUT')
}