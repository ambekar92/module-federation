import { ACCEPT_INVITATION_ROUTE } from '@/app/constants/routes'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  return handleApiRequest(request, ACCEPT_INVITATION_ROUTE, 'POST')
}