import { handleApiRequest } from '@/app/services/handleApiRequest'
import { REASON_CODE_ROUTE } from '@/app/services/types/evaluation-service/ReasonCodes'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  return handleApiRequest(request, REASON_CODE_ROUTE, 'GET')
}