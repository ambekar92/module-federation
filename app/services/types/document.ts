// get all documents
export type Documents = {
	id: number,
	created_at: string,
	updated_at: string,
	deleted_at: null | string,
	document_type: {
		id: number,
		name: string
	},
	entity_id: number,
	upload_user: {
		id: number,
		first_name: string,
		last_name: string
	},
	doc_owner_user_id: null,
	file_name: string,
	path_name: string,
	av_scanned: null | boolean,
	internal_document: boolean,
	notes: null | string,
	application_contributor: {
		id: number,
		application_id: number,
		user_id: number,
		application_role_id: number
	},
	question_id: number,
	hubzone_key: null | number
}

export type DocumentsType = Documents[] | [];
