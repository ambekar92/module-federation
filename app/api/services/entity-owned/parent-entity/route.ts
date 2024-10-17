import { BusinessEntity } from '@/app/api/parent-entity/types';
import { PARENT_ENTITY_ROUTE } from '@/app/constants/routes'
import { axiosInstance } from '@/app/services/axiosInstance';
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const {entity_type} = await request.json();
  const response = await axiosInstance.get<BusinessEntity[]>(`${PARENT_ENTITY_ROUTE}?entity_type=${entity_type}`);
  return Response.json({data: response.data});
  // return handleApiRequest(request, PARENT_ENTITY_ROUTE, 'POST')
}
