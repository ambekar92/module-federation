import { ConfirmVA } from '@/app/(evaluation)/components/modals/confirm-veteran-status-modal/schema'

export type ConfirmVeteranStatusPayload = {
	application_id: number,
	veteran_status: ConfirmVA,
	vba_feedback: string
}
