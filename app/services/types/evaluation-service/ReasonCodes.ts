import { API_ROUTE } from '@/app/constants/routes'

export const REASON_CODE_ROUTE = API_ROUTE + '/reason-codes';

export type ReasonCode = {
	id: number,
	title: string,
	action_type: string
}
