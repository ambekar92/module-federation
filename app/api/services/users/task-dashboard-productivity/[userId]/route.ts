import { NextRequest } from 'next/server'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { USER_PRODUCTIVITY_ROUTE } from '@/app/constants/routes'

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params
  const endpoint = `${USER_PRODUCTIVITY_ROUTE}/${userId}`
  return handleApiRequest(request, endpoint, 'GET')
}