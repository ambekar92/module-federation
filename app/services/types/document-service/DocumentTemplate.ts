export interface DocumentTemplate {
	id: number
	document_type_id: number
	content: string
	name: string
}

export enum DocumentTemplateType {
	vetCertApproval = 'ucp_approval_letter_vet_cert_supp',
	generalApproval = 'ucp_approval_letter',
	hubzoneDecline = 'ucp_decline_letter_hz_supp',
	wosbApproval = 'ucp_approval_letter_wosb_supp',
	generalDecline = 'ucp_decline_letter',
	eightADeclineAppeal = 'ucp_decline_letter_8a_supp_appeal',
	vetCertDecline = 'ucp_decline_letter_vet_cert_supp_no_appeal',
	hubzoneApproval = 'ucp_approval_letter_hz_supp',
	eightAApproval = 'ucp_approval_letter_8a_supp',
	eightADecline = 'ucp_decline_letter_8a_supp_no_appeal',
	vetCertDeclineAppeal = 'ucp_decline_letter_vet_cert_supp_appeal'
}
