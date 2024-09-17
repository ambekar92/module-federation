import { NextRequest } from 'next/server'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { USER_TASKS_ROUTE } from '@/app/constants/routes'

export async function GET(
  request: NextRequest
) {
  const { searchParams } = new URL(request.url)
  const role = searchParams.get('role_slug')
  
  if (!role) {
    return new Response('Role is required', { status: 400 })
  }

  const endpoint = `${USER_TASKS_ROUTE}?role_slug=${role}`
  return handleApiRequest(request, endpoint, 'GET')
}