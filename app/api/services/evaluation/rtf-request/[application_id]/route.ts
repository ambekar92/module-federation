import { NextRequest } from 'next/server';
import { handleApiRequest } from '@/app/services/handleApiRequest';
import { RTF_REQUEST_ROUTE } from '@/app/constants/routes';

export async function GET(
  request: NextRequest,
  { params }: { params: { application_id: string } }
) {
  const { application_id } = params;

  const url = `${RTF_REQUEST_ROUTE}/${application_id}`;

  return handleApiRequest(request, url, 'GET');
}