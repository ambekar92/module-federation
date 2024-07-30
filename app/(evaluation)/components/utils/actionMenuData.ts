import { permissionsMap } from "../modals/reassign-user-modal/maps";
import { ReassignType } from "../modals/reassign-user-modal/types";

export enum ActionMenuIDs {
  REASSIGN_SCREENER = 11,
  REASSIGN_ANALYST = 12,
}

export const actionMenuData = [
    {
      "id": 1,
      "optionLabel": "Screener: Accept for Review",
			"permissions": [""],
      "title": "Accept for Review",
      "actionLabel": "Confirm",
      "modalType": "default",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      "steps": [],
      "table": {
        "step": -1,
        "tableHeader": [],
        "tableRows": []
      },
      "signature": {
        "step": -1,
        "description": ""
      },
      "upload": false,
      "uploadStep": -1,
      "notes": {
        "step": -1,
        "rows": []
      },
      "approvalLetter": {
        "step": -1,
        "rows": []
      }
    },
    {
      "id": 2,
      "optionLabel": "Close Application",
			"permissions": ["screener_common_app", "analyst_high_criteria", "analyst_high_criteria", "supervisor_high_criteria", "supervisor_low_criteria"],
      "title": "Close This Application",
      "actionLabel": "Close Application",
      "modalType": "textarea",
      "description": "Closing this application will end the review process. The applicant will be notified, and they will be allowed to re-apply at anytime",
      "inputDescription": "Please, provide more information regarding why you wish to close this application*",
      "steps": [],
      "table": {
        "step": -1,
        "tableHeader": [],
        "tableRows": []
      },
      "signature": {
        "step": -1,
        "description": ""
      },
      "upload": false,
      "uploadStep": -1,
      "notes": {
        "step": -1,
        "rows": []
      },
      "approvalLetter": {
        "step": -1,
        "rows": []
      }
    },
    {
      "id": 3,
      "optionLabel": "Return to Analyst",
			"permissions": ["supervisor_high_criteria", "supervisor_low_criteria"],
      "title": "Return to Analyst",
      "actionLabel": "De-escalate",
      "modalType": "textarea",
      "description": "By clicking 'De-escalate', you are returning this application to the person it was assigned to before you",
      "inputDescription": "Please, provide more information regarding why you are returning this application.",
      "steps": [],
      "table": {
        "step": -1,
        "tableHeader": [],
        "tableRows": []
      },
      "signature": {
        "step": -1,
        "description": ""
      },
      "upload": false,
      "uploadStep": -1,
      "notes": {
        "step": -1,
        "rows": []
      },
      "approvalLetter": {
        "step": -1,
        "rows": []
      }
    },
    {
      "id": 4,
      "optionLabel": "Make Recommendation",
			"permissions": ["analyst_low_criteria", "analyst_high_criteria"],
      "title": "Make Recommendation",
      "actionLabel": "Complete Recommendation",
      "modalType": "step",
      "description": "Reason for request.",
      "steps": ["Review and/or Edit Notes", "Upload and Recommend"],
      "table": {
        "step": 1,
        "tableHeader": ["Program", "Approve", "Decline"],
        "tableRows": [
          ["Program 1", "radio", "radio"],
          ["Program 2", "radio", "radio"],
          ["Program 3", "radio", "radio"],
          ["Program 4", "radio", "radio"]
        ]
      },
      "signature": {
        "step": -1,
        "description": ""
      },
      "upload": true,
      "uploadStep": 1,
      "notes": {
        "step": 0,
        "rows": [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        ]
      },
      "approvalLetter": {
        "step": -1,
        "rows": []
      }
    },
    {
      "id": 5,
      "optionLabel": "Make an Approval",
			"permissions": ["approver_8a_aabd", "approver_8a_delegate"],
      "title": "Make an Approval",
      "actionLabel": "Sign and Submit",
      "modalType": "step",
      "description": "Reason for request.",
      "steps": ["lorem ipsum", "lorem ipsum"],
      "table": {
        "step": 0,
        "tableHeader": ["Program", "Recommendation", "Concur and Finalize"],
        "tableRows": [
          ["Program 1", "Approve", "checkbox"],
          ["Program 2", "Decline", "checkbox"],
          ["Program 3", "Approve", "checkbox"],
          ["Program 4", "Approve", "checkbox"]
        ]
      },
      "signature": {
        "step": 1,
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      "upload": false,
      "uploadStep": -1,
      "notes": {
        "step": -1,
        "rows": []
      },
      "approvalLetter": {
        "step": 1,
        "rows": [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        ]
      }
    },
    {
      "id": 6,
      "optionLabel": "Complete Review",
			"permissions": ["supervisor_high_criteria", "supervisor_low_criteria"],
      "title": "Complete Review",
      "actionLabel": "Sign and Submit",
      "modalType": "step",
      "description": "Reason for request.",
      "steps": ["lorem ipsum", "lorem ipsum"],
      "table": {
        "step": 0,
        "tableHeader": ["Program", "Recommendation", "Concur and Finalize"],
        "tableRows": [
          ["Program 1", "Approve", "checkbox"],
          ["Program 2", "Decline", "checkbox"],
          ["Program 3", "Approve", "checkbox"],
          ["Program 4", "Approve", "checkbox"]
        ]
      },
      "signature": {
        "step": 1,
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      "upload": false,
      "uploadStep": -1,
      "notes": {
        "step": -1,
        "rows": []
      },
      "approvalLetter": {
        "step": 1,
        "rows": [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        ]
      }
    },
    {
      "id": 7,
      "optionLabel": "Request Expert Opinion",
			"permissions": ["analyst_low_criteria", "analyst_high_criteria", "supervisor_low_criteria", "supervisor_high_criteria"],
      "title": "Request Expert Opinion",
      "actionLabel": "Submit",
      "modalType": "requestExpert",
      "description": "Reason for request.",
      "steps": [],
      "table": {
        "step": -1,
        "tableHeader": [],
        "tableRows": []
      },
      "upload": false,
      "uploadStep": -1,
      "notes": {
        "step": -1,
        "rows": []
      },
      "approvalLetter": {
        "step": 1,
        "rows": []
      }
    },
    {
      "id": 8,
      "optionLabel": "Provide Opinion",
			"permissions": ["analyst_contributor_ogc", "analyst_contributor_oss"],
      "title": "Provide Opinion",
      "actionLabel": "Submit",
      "modalType": "textarea",
      "description": "Provide more information.",
      "steps": [],
      "table": {
        "step": -1,
        "tableHeader": [],
        "tableRows": []
      },
      "upload": false,
      "uploadStep": -1,
      "notes": {
        "step": -1,
        "rows": []
      },
      "approvalLetter": {
        "step": -1,
        "rows": []
      }
    },
		{
      "id": 9,
      "optionLabel": "Return to Reviewer",
			"permissions": ["approver_8a_aabd", "approver_8a_delegate"],
      "title": "Return to Reviewer",
      "actionLabel": "De-escalate",
      "modalType": "textarea",
      "description": "By clicking 'De-escalate', you are returning this application to the person it was assigned to before you",
      "inputDescription": "Please, provide more information regarding why you are returning this application.",
      "steps": [],
      "table": {
        "step": -1,
        "tableHeader": [],
        "tableRows": []
      },
      "signature": {
        "step": -1,
        "description": ""
      },
      "upload": false,
      "uploadStep": -1,
      "notes": {
        "step": -1,
        "rows": []
      },
      "approvalLetter": {
        "step": -1,
        "rows": []
      }
    },
		{
      "id": 10,
      "optionLabel": "Return to Screener",
			"permissions": ["analyst_low_criteria", "analyst_high_criteria"],
      "title": "Return to Screener",
      "actionLabel": "De-escalate",
      "modalType": "textarea",
      "description": "By clicking 'De-escalate', you are returning this application to the person it was assigned to before you",
      "inputDescription": "Please, provide more information regarding why you are returning this application.",
      "steps": [],
      "table": {
        "step": -1,
        "tableHeader": [],
        "tableRows": []
      },
      "signature": {
        "step": -1,
        "description": ""
      },
      "upload": false,
      "uploadStep": -1,
      "notes": {
        "step": -1,
        "rows": []
      },
      "approvalLetter": {
        "step": -1,
        "rows": []
      }
    },
		{
      id: ActionMenuIDs.REASSIGN_SCREENER,
      optionLabel: "Reassign Case",
			permissions: permissionsMap[ReassignType.REASSIGN_SCREENER],
    },
    {
      id: ActionMenuIDs.REASSIGN_ANALYST,
      optionLabel: "Reassign User",
      permissions: permissionsMap[ReassignType.REASSIGN_ANALYST],
    }
  ]

 

