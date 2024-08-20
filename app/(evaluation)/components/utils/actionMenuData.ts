/* eslint-disable no-unused-vars */
import { Role } from '@/app/shared/types/role';
import { permissionsMap } from '../modals/reassign-user-modal/maps';
import { ReassignType } from '../modals/reassign-user-modal/types';

export enum ActionMenuIDs {
  SCREENER_ACCEPT_FOR_REVIEW = 1,
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
    'id': 1,
    'optionLabel': 'Screener: Accept for Review',
    'permissions': [''],
    'title': 'Accept for Review',
    'actionLabel': 'Confirm',
    'modalType': 'default',
    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    'steps': [],
    'table': {
      'step': -1,
      'tableHeader': [],
      'tableRows': []
    },
    'signature': {
      'step': -1,
      'description': ''
    },
    'upload': false,
    'uploadStep': -1,
    'notes': {
      'step': -1,
      'rows': []
    },
    'approvalLetter': {
      'step': -1,
      'rows': []
    }
  },
  {
    'id': 2,
    'optionLabel': 'Close Application',
    'permissions': ['screener_common_app', 'analyst_high_criteria', 'analyst_high_criteria', 'supervisor_high_criteria', 'supervisor_low_criteria'],
    'title': 'Close This Application',
    'actionLabel': 'Close Application',
    'modalType': 'textarea',
    'description': 'Closing this application will end the review process. The applicant will be notified, and they will be allowed to re-apply at anytime',
    'inputDescription': 'Please, provide more information regarding why you wish to close this application*',
    'steps': [],
    'table': {
      'step': -1,
      'tableHeader': [],
      'tableRows': []
    },
    'signature': {
      'step': -1,
      'description': ''
    },
    'upload': false,
    'uploadStep': -1,
    'notes': {
      'step': -1,
      'rows': []
    },
    'approvalLetter': {
      'step': -1,
      'rows': []
    }
  },
  {
    id: ActionMenuIDs.RETURN_TO_ANALYST,
    optionLabel: 'Return to Analyst',
    permissions: [Role.REVIEWER_HIGH_TIER, Role.REVIEWER_LOW_TIER, Role.REVIEWER],
  },
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
      Role.ANALYST_HIGH
    ],
  },

  {
    'id': ActionMenuIDs.COMPLETE_REVIEW,
    'optionLabel': 'Complete Review',
    'permissions': [Role.REVIEWER, Role.REVIEWER_HIGH, Role.REVIEWER_HIGH_TIER, Role.REVIEWER_LOW, Role.REVIEWER_LOW_TIER],
  },
  {
    'id': 7,
    'optionLabel': 'Escalate Review',
    'permissions': ['analyst_low_criteria', 'analyst_high_criteria', 'supervisor_low_criteria', 'supervisor_high_criteria'],
    'title': 'Escalate Review',
    'actionLabel': 'Submit',
    'modalType': 'requestExpert',
    'description': 'Reason for request.',
    'steps': [],
    'table': {
      'step': -1,
      'tableHeader': [],
      'tableRows': []
    },
    'upload': false,
    'uploadStep': -1,
    'notes': {
      'step': -1,
      'rows': []
    },
    'approvalLetter': {
      'step': 1,
      'rows': []
    }
  },
  {
    'id': 8,
    'optionLabel': 'Provide Opinion',
    'permissions': ['analyst_contributor_ogc', 'analyst_contributor_oss'],
    'title': 'Provide Opinion',
    'actionLabel': 'Submit',
    'modalType': 'textarea',
    'description': 'Your professional opinion has been requested on this application. If you haven’t already, review the request in the Notes section of this application review.',
    'inputDescription': 'Please provide your professional opinion on this application*',
    'steps': [],
    'table': {
      'step': -1,
      'tableHeader': [],
      'tableRows': []
    },
    'upload': false,
    'uploadStep': -1,
    'notes': {
      'step': -1,
      'rows': []
    },
    'approvalLetter': {
      'step': -1,
      'rows': []
    }
  },
  {
    id: ActionMenuIDs.RETURN_TO_REVIEWER,
    optionLabel: 'Return to Reviewer',
    permissions: [Role.APPROVER, Role.APPROVER_8a_aabd, Role.APPROVER_DELEGATE, Role.APPROVER_AABD],
  },
  {
    id: ActionMenuIDs.MAKE_APPROVAL,
    optionLabel: 'Make an Approval',
    permissions: [Role.APPROVER, Role.APPROVER_8a_aabd, Role.APPROVER_DELEGATE, Role.APPROVER_AABD],
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
    optionLabel: 'Reassign User',
    permissions: permissionsMap[ReassignType.REASSIGN_ANALYST],
  },
  {
    id: ActionMenuIDs.REASSIGN_APPROVER,
    optionLabel: 'Reassign Approver',
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
    permissions: [Role.REVIEWER_LOW_TIER, Role.REVIEWER_HIGH_TIER],
  },
  {
    id: ActionMenuIDs.COMPLETE_SCREENING,
    optionLabel: 'Complete Screening',
    permissions: [Role.SCREENER, Role.SCREENER_COMMON_APP],
  },
  {
    id: ActionMenuIDs.REASSIGN_EXPERT,
    optionLabel: 'Reassign Expert',
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
