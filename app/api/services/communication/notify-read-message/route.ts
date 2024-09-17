import { NOTIFYING_READ_MESSAGE } from '@/app/constants/routes'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { NextRequest } from 'next/server'

export async function PUT(request: NextRequest) {
  return handleApiRequest(request, NOTIFYING_READ_MESSAGE, 'PUT')
}