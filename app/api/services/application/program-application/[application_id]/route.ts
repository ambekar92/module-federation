import { PROGRAM_APPLICATION } from '@/app/constants/routes'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { application_id: string } }) {
	const { application_id } = params;
	const url = `${PROGRAM_APPLICATION}/${application_id}`;
  return handleApiRequest(request, url, 'GET')
}
