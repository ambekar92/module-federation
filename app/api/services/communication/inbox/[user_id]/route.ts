import { NextRequest } from 'next/server'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { INBOX_ROUTE } from '@/app/constants/routes'

export async function GET(request: NextRequest, { params }: { params: { user_id: string } }) {
  const endpoint = `${INBOX_ROUTE}/${params.user_id}`
  return handleApiRequest(request, endpoint, 'GET')
}