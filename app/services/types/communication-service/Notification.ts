export interface INotification {
	id: number,
	recipient_id: number,
	unread: boolean,
	message: string,
	created_at: string,
	title: string
}
