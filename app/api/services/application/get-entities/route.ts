import { NextRequest } from 'next/server'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { ENTITIES_ROUTE } from '@/app/constants/routes'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const apiSearchParams = new URLSearchParams()
  searchParams.forEach((value, key) => {
    apiSearchParams.append(key, value)
  })

  const endpoint = `${ENTITIES_ROUTE}?${apiSearchParams.toString()}`

  return handleApiRequest(request, endpoint, 'GET')
}