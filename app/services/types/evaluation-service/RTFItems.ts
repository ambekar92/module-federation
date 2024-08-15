export interface IRTFItems {
	id: number,
	explanation: string,
	application: number,
	author: number,
	request: null,
	reason: {
		id: number,
		title: string,
		action_type: string
	},
	application_section:
		{
			id: number,
			title: string,
			description: string,
			name: string,
			ordinal: number
		}
}

export interface IRTFRequestItem {
	id: number,
	total_seconds: string,
	items: [
		{
			id: number,
			explanation: string,
			application: number,
			reason: number,
			author: number,
			request: number
		}
	],
	opened: string,
	closed: null | string
}
