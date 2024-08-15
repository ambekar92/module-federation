export type QuestionnaireItem = {
		id: number,
    section: string,
    title: string,
    url: string,
    status?: string,
}

export type Params = {
    application_id: string,
    section_questions: string
}

export type NavItem = {
		id?: number,
    section: string,
    child: QuestionnaireItem[]
}
