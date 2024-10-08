
export const applicationLinks = [
  '/entity-owned',
  '/ownership',
  '/eligible-programs',
  '/control-and-operations',
  '/questionnaire-individual',
  '/document-upload',
  '/sign',
]
export const qaAppLinkPrefix = '/application/'

export const applicationSteps = {
  entityOwned: {
    stepIndex: null,
    link: '/entity-owned',
  },
  ownership: {
    stepIndex: 0,
    link: '/ownership',
  },
  controlAndOwnership: {
    stepIndex: 1,
    link: '/control-and-operations',
  },
  eligiblePrograms: {
    stepIndex: 2,
    link: '/eligible-programs',
  },
  questionnaire: {
    stepIndex: 3,
    link: '/questionnaires',
  },
  documentUpload: {
    stepIndex: 4,
    link: '/document-upload',
  },
  contributorInvitation: {
    stepIndex: 5,
    link: '/contributor-invite',
  },
  sign: {
    stepIndex: 6,
    link: '/sign',
  },
}

export const extractLastPart = (url: string) => {
  return url.substring(url.lastIndexOf('/') + 1);
};
