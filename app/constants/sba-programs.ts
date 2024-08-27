export type ProgramOption = {
  id: number
  name: string
  description: string
  disadvantages: string[]
  details: string
  registration:
    | 'eight_a'
    | 'wosb'
    | 'edwosb'
    | 'protege'
    | 'hubZone'
    | 'vosb'
    | 'sdvosb'
}

export const sbaProgramOptions: ProgramOption[] = [
  {
    id: 1,
    name: '8(a) Business Development',
    description: `The 8(a) Business Development Program is a robust nine-year program to assist socially and
		economically-disadvantaged entrepreneurs. Participants receive the following benefits:
		Business development assistance, mentorship, and access to government contracts.`,
    disadvantages: [
      'ethnic_origin',
      'asian_pacific_american',
      'native_american',
      'hispanic_american',
      'black_american',
      'sexual-orientation',
      'Sexual Orientation',
      'minority',
      'race',
      'Race',
      'Native American',
      'Hispanic American',
      'Black American',
      'Asian Pacific American',
      'Ethnic Origin'
    ],
    details:
      'https://www.sba.gov/federal-contracting/contracting-assistance-programs/8a-business-development-program',
    registration: 'eight_a',
  },
  {
    id: 3,
    name: 'Women-Owned',
    description: `Women-Owned Small Business (WOSB) Certification: The WOSB Federal Contract Program aims to
    empower and foster the growth of women-owned business in the federal contracting marketplace. It offers
    opportunities for women owned and controlled businesses to compete for federal contracts and receive
    support to enhance their federal contracting business capabilities.`,
    disadvantages: ['female', 'gender', 'woman', 'Gender'],
    details:
      'https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-federal-contract-program#id-program-eligibility-requirements',
    registration: 'wosb',
  },
  {
    id: 6,
    name: 'Economically-Disadvantaged Women-Owned',
    description: `Economically Disadvantaged Women-Owned Small Business (EDWOSB) Certification: EDWOSB certification
    is a subset of the WOSB Federal Contract Program for women-owned businesses that meet the
    qualifications for WOSB Program and fall within the financial thresholds of the program. Benefits include
    additional contracting opportunities and resources to support business growth and success in the federal
    contracting marketplace.`,
    disadvantages: ['gender', 'woman', 'female', 'Gender'],
    details:
      'https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-federal-contract-program#id-program-eligibility-requirements',
    registration: 'edwosb',
  },
  // {
  //   id: 7,
  //   name: 'Mentor-Protégé Program',
  //   description: `A mentor and its protégé can joint venture as a small business for any small business
  // 	contract, provided the protégé individually qualifies as small. The joint venture may
  // 	also pursue any type of set-aside contract for which the protégé qualifies, including
  // 	contracts set aside for 8(a), service-disabled veteran-owned, women-owned, and HUBZone
  // 	businesses.`,
  //   disadvantages: ['long_term_isolated_residence', 'woman', 'gender'],
  //   details:
  //     'https://www.sba.gov/federal-contracting/contracting-assistance-programs/sba-mentor-protege-program',
  //   registration: 'protege',
  // },
  {
    id: 2,
    name: 'HUBZone',
    description: `The HUBZone Program supports businesses located in historically underutilized areas. It
		aims to stimulate economic growth in these regions by providing government contracting
		preferences to qualified HUBZone businesses.`,
    disadvantages: [
      'long_term_isolated_residence', 'unmarried-not-veteran', 'gender', 'woman', 'female',
      'ethnic_origin', 'asian_pacific_american', 'native_american', 'hispanic_american',
  		'black_american', 'minority', 'race', 'disabledVeteran', 'veteran',
      'Race', 'Native American', 'Hispanic American', 'Black American', 'Asian Pacific American',
      'Long term residence in an environment isolated from mainstream of American society.', 'Other',
      'Religion', 'Ethnic Origin', 'Identifiable Disibility'
    ],
    details:
      'https://www.sba.gov/federal-contracting/contracting-assistance-programs/hubzone-program',
    registration: 'hubZone',
  },
  {
    id: 4,
    name: 'Veteran-Owned',
    description: `Veteran-Owned Small Business (VOSB) Program: The VOSB Program supports and encourages
		businesses owned by America’s veterans. This program encourages veterans to continue
		contributing to the nation through economic means. VOSB participants benefit from SBA
		resources, training, and access to government contracts.`,
    disadvantages: ['veteran'],
    details:
      'https://www.sba.gov/federal-contracting/contracting-assistance-programs/veteran-contracting-assistance-programs',
    registration: 'vosb',
  },
  {
    id: 5,
    name: 'Service-Disabled Veteran-Owned',
    description: `Service-Disabled Veteran-Owned Small Business (SDVOSB) Program: The SDVOSB Program is an
		extension of the VOSB Program and offers additional benefits to veterans with
		service-connected disabilities.`,
    disadvantages: ['disabled_veteran'],
    details:
      'https://www.sba.gov/federal-contracting/contracting-assistance-programs/veteran-contracting-assistance-programs',
    registration: 'sdvosb',
  },
]
