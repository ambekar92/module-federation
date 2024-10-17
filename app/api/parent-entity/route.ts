import { axiosInstance } from "@/app/services/axiosInstance";
import { BusinessEntity } from "./types";
import { PARENT_ENTITY_ROUTE } from "@/app/constants/routes";

export async function POST(request: Request) {
    const {entity_type} = await request.json();
    const response = await axiosInstance.get<BusinessEntity[]>(`${PARENT_ENTITY_ROUTE}?entity_type=${entity_type}`);
    return Response.json({data: response.data});
}