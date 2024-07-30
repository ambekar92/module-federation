import { Role } from "@/app/shared/types/role";
import { ReassignType } from "./types";


export const permissionsMap = {
    [ReassignType.REASSIGN_SCREENER]: [Role.SCREENER, Role.REVIEWER_HIGH_TIER, Role.REVIEWER_LOW_TIER, Role.SCREENER_COMMON_APP],
    [ReassignType.REASSIGN_ANALYST]: [Role.ANALYST_HIGH_TIER, Role.ANALYST_LOW_TIER, Role.REVIEWER_HIGH_TIER, Role.REVIEWER_LOW_TIER],
    [ReassignType.REASSIGN_APPROVER]: [Role.APPROVER_8a_aabd],
}

export const titleMap = {
    [ReassignType.REASSIGN_SCREENER]: 'Reassign Application',
    [ReassignType.REASSIGN_ANALYST]: 'Reassign User',
    [ReassignType.REASSIGN_APPROVER]: 'Reassign Approver',
}

export const userRolesOptionsMap = {
    [ReassignType.REASSIGN_SCREENER]: Role.SCREENER_COMMON_APP,
    [ReassignType.REASSIGN_ANALYST]: Role.ANALYST_LOW_TIER,
    [ReassignType.REASSIGN_APPROVER]: Role.APPROVER_8a_aabd,
}

export const subjectSuffixMap = {
    [ReassignType.REASSIGN_SCREENER]: '_Screening_reassignment',
    [ReassignType.REASSIGN_ANALYST]: '_Analyst_reassignment',
    [ReassignType.REASSIGN_APPROVER]: '_Approver_reassignment',
}
