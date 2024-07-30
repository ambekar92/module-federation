import { APPLICATION_PREVIEW_LINK, TIPS_FOR_SUCCESS_LINK, QUICK_START_GUIDE_LINK, PREPARE_LINK, GATHER_DOCUMENTS_LINK } from '@/app/constants/url'
export const Cards = [{
  title: 'Prepare',
  description: 'Here are three steps to get you ready for certification:',
  information: 'Familiarize yourself with the application process by clicking through the links below',
  linkPath: `${PREPARE_LINK}`,
  cards: [
    { id: 1, iconName:'/resourceApplication/preview.svg', grayText:'Initial Application' , boldText: 'Application Preview', linkPath: `${APPLICATION_PREVIEW_LINK}`},
    { id: 2, iconName:'/resourceApplication/tips_and_updates.svg', grayText:'Initial Application' ,boldText: 'Tip For Success', linkPath: `${TIPS_FOR_SUCCESS_LINK}`},
    { id: 3, iconName:'/resourceApplication/rocket_launch.svg', grayText:'Initial Application', boldText: 'Quick Start Guide', linkPath:`${QUICK_START_GUIDE_LINK}`},
  ]

},
{
  title: 'Gather Documents',
  description: 'Select your business type below for a document checklist',
  information: '',
  linkPath: `${GATHER_DOCUMENTS_LINK}`,
  cards: [
    { id: 1, iconName:'/resourceApplication/account_circle.svg', grayText:'Company Structure' , boldText: 'Sole Proprietorship', linkPath:''},
    { id: 2, iconName:'/resourceApplication/handshake.svg', grayText:'Company Structure' ,boldText: 'Partnership', linkPath: ''},
    { id: 3, iconName:'/resourceApplication/store.svg', grayText:'Company Structure', boldText: 'LLC*', linkPath:''},
    { id: 4, iconName:'/resourceApplication/business.svg', grayText:'Company Structure' ,boldText: 'Corporation', linkPath:'' },
    { id: 5, iconName:'/resourceApplication/groups.svg', grayText:'Comapny Structure', boldText: 'Entity-Owned', linkPath:''},
  ]

},
]
