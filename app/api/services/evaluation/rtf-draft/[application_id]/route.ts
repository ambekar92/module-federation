import { NextRequest } from 'next/server';
import { handleApiRequest } from '@/app/services/handleApiRequest';
import { DRAFT_RTF_ITEMS_ROUTE } from '@/app/constants/routes';

export async function GET(
  request: NextRequest,
  { params }: { params: { application_id: string } }
) {
  const { application_id } = params;

  const url = `${DRAFT_RTF_ITEMS_ROUTE}/${application_id}`;

  return handleApiRequest(request, url, 'GET');
}