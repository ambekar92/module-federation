import { ProgramOption, sbaProgramOptions } from '@/app/constants/sba-programs';

export const applicationLinks = [
  '/ownership',
  '/eligible-programs',
  '/control-and-operations',
  '/questionnaire-individual',
  '/document-upload',
  '/sign'
]
export const qaAppLinkPrefix = '/application/';

export const applicationSteps = {
  'ownership':{
    'stepIndex': 0,
    'link': '/ownership'
  },
  'eligiblePrograms':{
    'stepIndex': 2,
    'link': '/eligible-programs'
  },
  'controlAndOwnership':{
    'stepIndex': 1,
    'link': '/control-and-operations'
  },
  'questionnaire':{
    'stepIndex': 3,
    'link': '/questionnaires'
  },
  'documentUpload':{
    'stepIndex': 4,
    'link': '/document-upload'
  },
  'contributorInvitation': {
    'stepIndex': 5,
    'link': '/contributor-invite'
  },
  'sign':{
    'stepIndex': 6,
    'link': '/sign'
  }
}

export const calculateEligiblePrograms = (owners: any[]): ProgramOption[] => {
  return sbaProgramOptions.filter(program => {
    return owners.some(owner => {
      let updatedDisadvantages = owner.socialDisadvantages.length > 0
        ? owner.socialDisadvantages
        : ['not_claiming'];

      if (updatedDisadvantages.length > 1) {
        updatedDisadvantages = updatedDisadvantages.filter((d: string) => d !== 'not_claiming');
      }

      const manageDisadvantage = (condition: boolean, disadvantage: string) => {
        if (condition && !updatedDisadvantages.includes(disadvantage)) {
          updatedDisadvantages.push(disadvantage);
        } else if (!condition) {
          updatedDisadvantages = updatedDisadvantages.filter((d: string) => d !== disadvantage);
        }
      };

      manageDisadvantage(owner.gender === 'f', 'female');
      manageDisadvantage(owner.isVeteran === 'veteran' || owner.isVeteran === 'service_disabled_veteran', 'veteran');
      manageDisadvantage(owner.isVeteran === 'service_disabled_veteran', 'disabledVeteran');
      manageDisadvantage(owner.maritalStatus === 'unmarried' && owner.isVeteran === 'not_applicable', 'unmarried-not-veteran')

      return program.disadvantages.some(disadvantage => updatedDisadvantages.includes(disadvantage));
    });
  });
};
