import { Program } from './types';

export const programs: Program[] =  [
  {
    title: '8(a)',
    subtitle: '8(a) Business Development Program',
    rules: {
      ownership: {
        ownOver50Percent: 'yes',
        USCitizen: 'yes',
        socialDisadvantage: 'yes'
      },
      eligibility: {
        underFinancialLimits: 'yes',
        provideAnnualFinancialStatement: 'yes',
        ownBusinessInUS: 'yes',
        suspended: 'yes'
      }
    },
    url: 'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3213361153/8+a+Initial+Application+Guide',
    description: 'The 8(a) Business Development Program is a business assistance program for small disadvantaged businesses. The 8(a) Program offers a broad scope of assistance to firms that are owned and controlled at least 51% by socially and economically disadvantaged individuals.',
  },
  {
    title: 'HUBZone',
    subtitle: 'Historically Underutilized Business Zone Program',
    rules: {
      ownership: {
        USCitizen: 'yes',
        ownOver50Percent: 'yes'
      },
      eligibility: {
        businessLocation: 'yes',
        employeesResideInHubZone: 'yes',
        underFinancialLimits: 'yes' || 'no',
        ownBusinessInUS: 'yes',
        suspended: 'yes'
      }
    },
    url: 'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3236528130/HUBZone+Initial+Application+Guide',
    description: 'The HUBZone program helps small businesses in urban and rural communities gain preferential access to federal procurement opportunities. These preferences go to small businesses that obtain HUBZone certification in part by employing staff who live in a HUBZone.',
  },
  {
    title: 'WOSB',
    subtitle: 'Woman-Owned',
    rules: {
      ownership: {
        ownOver50Percent: 'yes',
        USCitizen: 'yes',
        gender: 'female'
      },
      eligibility: {
        suspended: 'yes',
        ownBusinessInUS: 'yes',
      }
    },
    url: 'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3236529422/Women-Owned+Initial+Application+Guide',
    description: 'The WOSB Federal Contract Program was implemented in February 2011 with the goal of expanding the number of industries where WOSB were able to compete for business with the federal government.',
  },
  {
    title: 'SDVOSB',
    rules: {
      ownership: {
        ownOver50Percent: 'yes',
        veteran: 'yes'
      },
      eligibility: {suspended: 'yes',  ownBusinessInUS: 'yes',}},
    subtitle: 'Service-Disabled Veteran-Owned Small Business Program',
    url: 'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3236528776/Veteran-Owned+Initial+Application+Guide',
    description: 'The Veterans Benefits, Health Care, and Information Technology Act of 2006 (Public Law 109-461) provides the U.S. Department of Veterans Affairs (VA) with unique authority for Service-Disabled Veteran-Owned Small Business (SDVOSB) and Veteran-Owned Small Business (VOSB) set-aside and sole source contracts.',
  },
  {
    title: 'VOSB',
    rules: {
      ownership: {
        ownOver50Percent: 'yes',
        veteran: 'yes'
      },
      eligibility: {suspended: 'yes',  ownBusinessInUS: 'yes',}},
    subtitle: 'Veteran-Owned Small Business Program', // TODO: need correct subtitle
    url: 'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3236528776/Veteran-Owned+Initial+Application+Guide', //TODO need correct url
    description: 'The Veterans Benefits, Health Care, and Information Technology Act of 2006 (Public Law 109-461) provides the U.S. Department of Veterans Affairs (VA) with unique authority for Service-Disabled Veteran-Owned Small Business (SDVOSB) and Veteran-Owned Small Business (VOSB) set-aside and sole source contracts.', // TODO: need correct description
  },
  {
    title: 'EDWOSB',
    rules: {
      ownership: {
        USCitizen: 'yes',
        ownOver50Percent: 'yes',
        gender: 'female',
      },
      eligibility: {
        underFinancialLimits: 'yes',
        provideAnnualFinancialStatement: 'yes',
        suspended: 'yes',
        ownBusinessInUS: 'yes'
      }
    },
    subtitle: 'Veteran-Owned Small Business Program', // TODO: need correct subtitle
    url: 'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3236528776/Veteran-Owned+Initial+Application+Guide', //TODO need correct url
    description: 'The Veterans Benefits, Health Care, and Information Technology Act of 2006 (Public Law 109-461) provides the U.S. Department of Veterans Affairs (VA) with unique authority for Service-Disabled Veteran-Owned Small Business (SDVOSB) and Veteran-Owned Small Business (VOSB) set-aside and sole source contracts.', // TODO: need correct description
  },
  // {
  //   title: 'VetCert',
  //   rules: {
  //     ownership: {
  //       USCitizen: 'yes',
  //       veteran: 'yes',
  //       ownOver50Percent: 'yes'
  //     },
  //     eligibility: {suspended: 'yes',  ownBusinessInUS: 'yes',}},
  //   subtitle: 'Veteran-Owned Small Business Program', // TODO: need correct subtitle
  //   url: 'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3236528776/Veteran-Owned+Initial+Application+Guide', //TODO need correct url
  //   description: 'The Veterans Benefits, Health Care, and Information Technology Act of 2006 (Public Law 109-461) provides the U.S. Department of Veterans Affairs (VA) with unique authority for Service-Disabled Veteran-Owned Small Business (SDVOSB) and Veteran-Owned Small Business (VOSB) set-aside and sole source contracts.', // TODO: need correct description
  // },
];
