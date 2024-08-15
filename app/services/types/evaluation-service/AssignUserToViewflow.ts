type AssignUserToViewflowPayload = {
	process_id: number;
	user_id: number | undefined;
	pre_screener_id: number;
	analyst_id: number;
	supervisor_id: number;
	approver_id: number;
	mpp_screener_id: number;
	mpp_analyst_id: number;
};
