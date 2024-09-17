import { NextRequest } from 'next/server'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { THREADS_ROUTE } from '@/app/constants/routes'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const uuid = searchParams.get('uuid')

  if (!uuid) {
    return new Response(JSON.stringify({ error: 'Message UUID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const endpoint = `${THREADS_ROUTE}?uuid=${uuid}`
  return handleApiRequest(request, endpoint, 'GET')
}