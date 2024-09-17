import { SEND_INVITATION_DELEGATE } from '@/app/constants/questionnaires'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  return handleApiRequest(request, SEND_INVITATION_DELEGATE, 'POST')
}