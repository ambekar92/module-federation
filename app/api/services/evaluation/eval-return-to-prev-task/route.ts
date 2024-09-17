import { CHANGE_APPLICATION_TIER_ROUTE, EVALUATING_RETURN_TO_PREV_TASK_ROUTE } from '@/app/constants/routes'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  return handleApiRequest(request, EVALUATING_RETURN_TO_PREV_TASK_ROUTE, 'POST')
}