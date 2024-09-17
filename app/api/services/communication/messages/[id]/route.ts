import { NextRequest } from 'next/server'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { MESSAGES_ROUTE } from '@/app/constants/routes'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const endpoint = `${MESSAGES_ROUTE}/${params.id}`
  return handleApiRequest(request, endpoint, 'GET')
}