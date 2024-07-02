export type DocumentUpload = {
  id: number,
	name: string,
	profile_answer_flag: boolean,
	description: string,
	title: string,
	question_type: string,
	pii_flag: boolean,
	answer_choice: any | null,
	answer_required_flag: boolean,
	document_required_flag: boolean,
	question_ordinal: string,
	application_section: string,
	answer: any | null
};

export type DocumentUploadType = DocumentUpload[]
