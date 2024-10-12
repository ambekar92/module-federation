/* eslint-disable no-unused-vars */
import { Role } from '@/app/shared/types/role';
import { permissionsMap } from '../modals/reassign-user-modal/maps';
import { ReassignType } from '../modals/reassign-user-modal/types';

export enum ActionMenuIDs {
  CLOSE_APPLICATION = 2,
  RETURN_TO_ANALYST = 3,
  MAKE_RECOMMENDATION = 4,
  MAKE_APPROVAL = 5,
  COMPLETE_REVIEW = 6,
  ESCALATE_REVIEW = 7,
  PROVIDE_OPINION = 8,
  RETURN_TO_REVIEWER = 9,
  RETURN_TO_SCREENER = 10,
  REASSIGN_SCREENER = 11,
  REASSIGN_ANALYST = 12,
  REASSIGN_APPROVER = 13,
  UPDATE_VA_STATUS = 14,
  CHANGE_TIER = 15,
	COMPLETE_SCREENING = 16,
  REASSIGN_EXPERT = 17,
}

export const actionMenuData = [
  {
    id: ActionMenuIDs.RETURN_TO_ANALYST,
    optionLabel: 'Return to Analyst',
    permissions: [Role.REVIEWER_HIGH_TIER, Role.REVIEWER_LOW_TIER, Role.REVIEWER],
  },
  {
    id: ActionMenuIDs.MAKE_RECOMMENDATION,
    optionLabel: 'Make Recommendation',
    permissions: [
      Role.ANALYST,
      Role.ANALYST_HIGH_TIER,
      Role.ANALYST_LOW_TIER,
      Role.ANALYST_LOW,
      Role.ANALYST_HIGH,
    ],
  },
  {
    id: ActionMenuIDs.CLOSE_APPLICATION,
    optionLabel: 'Close Application',
    permissions: [
      Role.ANALYST,
      Role.ANALYST_HIGH_TIER,
      Role.ANALYST_LOW_TIER,
      Role.ANALYST_LOW,
      Role.ANALYST_HIGH,
      Role.REVIEWER, Role.REVIEWER_HIGH, Role.REVIEWER_HIGH_TIER, Role.REVIEWER_LOW,
      Role.REVIEWER_LOW_TIER,
      Role.SCREENER, Role.SCREENER_COMMON_APP,
      Role.APPROVER, Role.APPROVER_8a_aabd, Role.APPROVER_DELEGATE
    ],
  },
  {
    id: ActionMenuIDs.COMPLETE_REVIEW,
    optionLabel: 'Complete Review',
    permissions: [Role.REVIEWER, Role.REVIEWER_HIGH, Role.REVIEWER_HIGH_TIER, Role.REVIEWER_LOW, Role.REVIEWER_LOW_TIER],
  },
  {
    id: ActionMenuIDs.PROVIDE_OPINION,
    optionLabel: 'Provide Opinion',
    permissions: [Role.ANALYST_CONTRIBUTOR_OGC, Role.ANALYST_CONTRIBUTOR_OSS],
  },
  {
    id: ActionMenuIDs.RETURN_TO_REVIEWER,
    optionLabel: 'Return to Reviewer',
    permissions: [Role.APPROVER, Role.APPROVER_8a_aabd, Role.APPROVER_DELEGATE],
  },
  {
    id: ActionMenuIDs.MAKE_APPROVAL,
    optionLabel: 'Make an Approval',
    permissions: [Role.APPROVER, Role.APPROVER_8a_aabd, Role.APPROVER_DELEGATE],
  },
  {
    id: ActionMenuIDs.RETURN_TO_SCREENER,
    optionLabel: 'Return to Screener',
    permissions: [
      Role.ANALYST,
      Role.ANALYST_HIGH_TIER,
      Role.ANALYST_LOW_TIER,
      Role.ANALYST_HIGH,
      Role.ANALYST_LOW,
      Role.ANALYST_CONTRIBUTOR_OGC,
      Role.ANALYST_CONTRIBUTOR_OSS
    ],
  },
  {
    id: ActionMenuIDs.REASSIGN_SCREENER,
    optionLabel: 'Reassign Case',
    permissions: permissionsMap[ReassignType.REASSIGN_SCREENER],
  },
  {
    id: ActionMenuIDs.REASSIGN_ANALYST,
    optionLabel: 'Reassign Case',
    permissions: permissionsMap[ReassignType.REASSIGN_ANALYST],
  },
  {
    id: ActionMenuIDs.REASSIGN_APPROVER,
    optionLabel: 'Reassign Case',
    permissions: permissionsMap[ReassignType.REASSIGN_APPROVER],
  },
  {
    id: ActionMenuIDs.UPDATE_VA_STATUS,
    optionLabel: 'Update VA Status',
    permissions: [Role.SCREENER, Role.SCREENER_COMMON_APP],
  },
  {
    id: ActionMenuIDs.CHANGE_TIER,
    optionLabel: 'Change Tier',
    permissions: [Role.REVIEWER_LOW_TIER, Role.REVIEWER_HIGH_TIER, ],
  },
  {
    id: ActionMenuIDs.COMPLETE_SCREENING,
    optionLabel: 'Complete Screening',
    permissions: [Role.SCREENER, Role.SCREENER_COMMON_APP, ],
  },
  {
    id: ActionMenuIDs.REASSIGN_EXPERT,
    optionLabel: 'Reassign Case',
    permissions: permissionsMap[ReassignType.REASSIGN_EXPERT],
  },
  {
    id: ActionMenuIDs.ESCALATE_REVIEW,
    optionLabel: 'Escalate Review',
    permissions: [Role.REVIEWER, Role.REVIEWER_HIGH, Role.REVIEWER_HIGH_TIER, Role.REVIEWER_LOW, Role.REVIEWER_LOW_TIER,
      Role.ANALYST, Role.ANALYST_HIGH, Role.ANALYST_HIGH_TIER, Role.ANALYST_LOW, Role.ANALYST_LOW_TIER
    ]
  }
]
