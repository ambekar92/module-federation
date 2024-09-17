import { NextRequest } from 'next/server';
import { handleApiRequest } from '@/app/services/handleApiRequest';
import { RFI_DRAFT_ROUTE } from '@/app/constants/routes';

export async function GET(
  request: NextRequest,
  { params }: { params: { application_id: string } }
) {
  const { application_id } = params;

  const url = `${RFI_DRAFT_ROUTE}/${application_id}`;

  return handleApiRequest(request, url, 'GET');
}