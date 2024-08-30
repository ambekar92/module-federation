export const TopPartInfo = [
  {
    id: 1,
    iconName: '/navbaricons/question.svg',
    title: 'Should I Apply',
    description: 'See if your business is ready to be certified',
    buttonName: 'Find Out',
    link: '/should-i-apply/ownership',
  },
  {
    id: 2,
    iconName: '/navbaricons/application.svg',
    title: 'Prepare for Application',
    description: 'Get your business ready for certification',
    buttonName: 'Prepare',
    link: '/resources/get-ready',
  },
  {
    id: 3,
    iconName: '/navbaricons/calculation.svg',
    title: 'HUBZone Calculator',
    description: 'See if your business qualifies for HUBZone',
    buttonName: 'Launch',
    link: process.env.NEXT_PUBLIC_HUBZONE_URL,
  },
]

export const MediumPartInfo = [
  { description: 'Access to sole-source and competitive set-aside contracts' },
  { description: 'Assistance from federal procurement experts' },
  {
    description:
      'Business development assistance from dedicated Business Opportunity Specialists',
  },
  {
    description:
      'Opportunities to create joint ventures with established businesses',
  },
  { description: 'Priority access to federal surplus property' },
]

export const MediumLowerPartInfo = [
  {
    subTitle: '8(a)',
    title: '8(a) Business Development',
    link: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/8a-business-development-program',
  },
  {
    subTitle: 'HUBZone',
    title: 'HUBZone',
    link: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/hubzone-program',
  },
  {
    subTitle: 'VOSB',
    title: 'Veteran-Owned',
    link: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/veteran-contracting-assistance-programs',
  },
  {
    subTitle: 'WOSB',
    title: 'Women-Owned',
    link: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-federal-contract-program',
  }
]
