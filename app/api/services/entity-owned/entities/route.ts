import { ENTITIES_ROUTE } from "@/app/constants/routes";
import { handleApiRequest } from "@/app/services/handleApiRequest";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body: {sam_entity_uei: string, sam_entity_legal_business_name: string } = await request.json()
    return handleApiRequest(request, `${ENTITIES_ROUTE}?sam_entity_uei=${body.sam_entity_uei}&?sam_entity_legal_business_name=${body.sam_entity_legal_business_name}`, 'GET')
}