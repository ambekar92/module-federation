import { Application, News } from './utils/types';

export const mockNews = [
  { id: 1, title: 'Scientists Discover New Species of Orchid in Amazon Rainforest', description: 'A team of biologists has uncovered a previously unknown species of orchid deep within the Amazon rainforest. The discovery highlights the importance of conservation efforts in protecting the world\'s biodiversity.' },
  { id: 2, title: 'Government Announces Plan to Combat Air Pollution in Major Cities', description: 'In response to rising concerns about air quality, the government has unveiled a comprehensive plan to tackle air pollution in major urban centers. The initiative includes stricter emissions standards for vehicles and incentives for renewable energy adoption.' },
  { id: 3, title: 'Tech Giant Unveils Breakthrough in Artificial Intelligence Research', description: 'A leading tech company has revealed a significant advancement in artificial intelligence research. The breakthrough could have far-reaching implications for various industries, from healthcare to autonomous vehicles.' }
] satisfies News[];

export const mockApplications = [
  {
    id: 1,
    title: 'Initial Application',
    status: 'Submitted',
    percentComplete: 25,
    submittedDate: new Date(),
    tags: ['8(a)', 'Women-Owned', 'Veteran-Owned']
  },
  // {
  //   id: 2,
  //   title: 'Initial Application',
  //   status: 'In progress',
  //   percentComplete: 60,
  //   submittedDate: new Date('2024-03-20'),
  //   tags: ['Mobile', 'Health', 'App Development']
  // },
  // {
  //   id: 3,
  //   title: 'E-commerce Website Redesign',
  //   status: 'Not started',
  //   percentComplete: 0,
  //   submittedDate: new Date('2024-04-30'),
  //   tags: ['Mobile', 'Health', 'App Development']
  // }
] satisfies Application[];
