import { APPLICATION_PREVIEW_LINK, GATHER_DOCUMENTS_LINK, PREPARE_LINK } from '@/app/constants/url'
export const Cards = [{
  title: 'Prepare',
  description: 'Here are three steps to get you ready for certification:',
  information: 'Familiarize yourself with the application process by clicking through the links below',
  linkPath: `${PREPARE_LINK}`,
  cards: [
    { id: 1, iconName:'/resourceApplication/preview.svg', grayText:'Initial Application' , boldText: 'Application Preview', linkPath: `${APPLICATION_PREVIEW_LINK}`, comingSoon: false},
    { id: 2, iconName:'/resourceApplication/tips_and_updates.svg', grayText:'Initial Application' ,boldText: 'Tips For Success', linkPath: '', comingSoon: true},
    { id: 3, iconName:'/resourceApplication/rocket_launch.svg', grayText:'Initial Application', boldText: 'Quick Start Guide', linkPath:'', comingSoon: true},
  ]
},
{
  title: 'Gather Documents',
  description: 'Select your business type below for a document checklist',
  information: '',
  linkPath: `${GATHER_DOCUMENTS_LINK}`,
  cards: [
    { id: 1, iconName:'/resourceApplication/account_circle.svg', grayText:'Company Structure' , boldText: 'Sole Proprietorship', linkPath:'', comingSoon: true},
    { id: 2, iconName:'/resourceApplication/handshake.svg', grayText:'Company Structure' ,boldText: 'Partnership', linkPath: '', comingSoon: true},
    { id: 3, iconName:'/resourceApplication/store.svg', grayText:'Company Structure', boldText: 'LLC*', linkPath:'', comingSoon: true},
    { id: 4, iconName:'/resourceApplication/business.svg', grayText:'Company Structure' ,boldText: 'Corporation', linkPath:'', comingSoon: true },
    { id: 5, iconName:'/resourceApplication/groups.svg', grayText:'Company Structure', boldText: 'Entity-Owned', linkPath:'', comingSoon: true},
  ]

},
]

export const topPartInfo = [
  {
    id: 1,
    iconName: '/navbaricons/application.svg',
    title: 'Prepare for Application',
    description: 'Get your business ready for certification',
    buttonName: 'Prepare',
    link: '/resources/get-ready',
  },
  {
    id: 2,
    iconName: '/navbaricons/calculation.svg',
    title: 'HUBZone Calculator',
    description: 'See if your business qualifies for HUBZone',
    buttonName: 'Sign Up',
    link: process.env.NEXT_PUBLIC_HUBZONE_URL,
  },
  {
    id: 3,
    iconName: '/navbaricons/video.svg',
    title: 'How to Videos',
    description: 'Watch Useful Videos to Guide You In MySBA Certifications',
    buttonName: 'View',
    link: 'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3274014721/How+To+Videos',
  },
  {
    id: 4,
    iconName: '/navbaricons/knowledge.svg',
    title: 'Knowledge Base',
    description: 'All the latest resources and updates ',
    buttonName: 'Learn More',
    link: 'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3185574025/Knowledge+Base+Home',
  },
]
