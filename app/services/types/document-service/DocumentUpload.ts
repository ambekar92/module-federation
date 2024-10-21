export type DocumentUpload = {
	id: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	document_type: {
		id: number;
		name: string;
	};
	entity_id: number;
	upload_user: {
		id: number;
		first_name: string;
		last_name: string;
		roles: string[];
	};
	doc_owner_user_id: number | null;
	file_name: string;
	path_name: string;
	av_scanned: boolean;
	internal_document: boolean;
	notes: string | null;
	application_contributor: {
		id: number;
		application_id: number;
		user_id: number;
		application_role_id: number;
	};
	question: {
		question_id: number;
		application_section_id: number;
	};
	hubzone_key: number;
	signed_url: string;
};
