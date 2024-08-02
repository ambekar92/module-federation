import { ConfirmVA } from "@/app/(evaluation)/components/modals/confirm-veteran-status-modal/schema"

export type ConfirmVeteranStatusPayload = {
    process_id: number,
    data: {
        veteran_status: ConfirmVA,
        vba_feedback: string
    }
}