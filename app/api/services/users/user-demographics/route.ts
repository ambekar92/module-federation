import { NextRequest } from 'next/server'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { USER_DEMOGRAPHICS_ROUTE } from '@/app/constants/routes'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
	const application_id = searchParams.get('application_id');

  const url = `${USER_DEMOGRAPHICS_ROUTE}?application_id=${application_id}`;

  return handleApiRequest(request, url, 'GET');
}