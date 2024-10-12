import { UPDATE_PROFILE_ROUTE } from '@/app/constants/routes'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { NextRequest } from 'next/server'

export async function PUT(request: NextRequest) {
  return handleApiRequest(request, UPDATE_PROFILE_ROUTE, 'PUT')
}