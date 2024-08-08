export interface IRTFItems {
	id: number,
	explanation: string,
	application: number,
	reason: number,
	author: number,
	request: null
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
