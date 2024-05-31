interface ReadinessResponses {
  revenue: string;
  electronicPayments: string;
  qualityGoods: string;
  coverCosts: string;
}

interface EligibilityResponses {
  usCitizen: string;
  smallBusiness: string;
  financialStatements: string;
  financialLimits: string;
  socialDisadvantage: string;
}

export interface ShouldApplyResponseTypes {
  readiness: ReadinessResponses;
  eligibility: EligibilityResponses;
};

export type OwnershipType = {
  gender: string
  socialDisadvantage: string[]
  usCitizen: string
  veteran: string
  ownershipPercentage: number
	businessLocation: string
	disabledVeteran: string
}

export const SocialDisadvantagesData: SelectOption[] = [
  { label: 'Not Claiming Social Disadvantage', value: 'not_claiming' },
  { label: 'Black American', value: 'black_american' },
  { label: 'Hispanic American', value: 'hispanic_american' },
  { label: 'Native American', value: 'native_american' },
  { label: 'Asian Pacific American', value: 'asian_pacific_american' },
  { label: 'Race', value: 'race' },
  { label: 'Religion', value: 'religion' },
  { label: 'Ethnic Origin', value: 'ethnic_origin' },
  { label: 'Gender', value: 'gender' },
  { label: 'Sexual Orientation', value: 'sexual_orientation' },
  { label: 'Identifiable Disability', value: 'identifiable_disability' },
  {
    label: 'Long term residence in an environment isolated from mainstream of American society',
    value: 'long_term_isolated_residence'
  }
]

export interface SelectOption {
	value: string
	label: string
}

export type ProgramOption = {
	name: string,
	description: string
	disadvantages: string[],
	details: string;
}

export interface NaicsCodeType {
  naics_code: string;
  description: string;
	award_amount: string;
}

export interface SIAFormData {
  naicsCode: string;
  description: string;
  awardedFY21: string;
  revenueResponse: string;
  qualityGoodsResponse: string;
  electronicPaymentsResponse: string;
  coverCostsResponse: string;
  usBusinessResponse: string;
  financialLimitsResponse: string;
  financialStatementsResponse: string;
  usCitizenResponse: string;
  disadvantagedGroupResponse: string;
}

export const programOptions: ProgramOption[] = [
  {
    name: '8(a)',
    description: `The 8(a) Business Development Program is a robust nine-year program to assist socially and
		economically-disadvantaged entrepreneurs. Participants receive the following benefits:
		Business development assistance, mentorship, and access to government contracts.`,
    disadvantages: [
      'ethnic_origin',
      'asian_pacific_american',
      'native_american',
      'hispanic_american',
      'black_american',
      'race'
    ],
    details: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/8a-business-development-program'
  },
  {
    name: 'WOSB',
    description: `Women-Owned Small Business (WOSB) Program: The WOSB Program aims to empower and foster the
		growth of women owned-businesses. It offers opportunities for female entrepreneurs to
		compete for federal contracts and receive support to enhance their business capabilities.`,
    disadvantages: ['female', 'gender', 'woman'],
    details: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-federal-contract-program#id-program-eligibility-requirements'
  },
  {
    name: 'EDWOSB',
    description: `Economically-Disadvantaged Women-Owned Small Business (EDWOSB) Program: The EDWOSB Program
		is a subset of the WOSB Program focused specifically on economically-disadvantaged women
		entrepreneurs. Benefits include additional contracting opportunities and resources to
		support business growth and success.`,
    disadvantages: ['gender', 'woman'],
    details: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-federal-contract-program#id-program-eligibility-requirements'
  },
  {
    name: 'Mentor-Protégé Program',
    description: `A mentor and its protégé can joint venture as a small business for any small business
		contract, provided the protégé individually qualifies as small. The joint venture may
		also pursue any type of set-aside contract for which the protégé qualifies, including
		contracts set aside for 8(a), service-disabled veteran-owned, women-owned, and HUBZone
		businesses.`,
    disadvantages: ['long_term_isolated_residence', 'woman', 'gender'],
    details: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/sba-mentor-protege-program'
  },
  {
    name: 'HUBZone',
    description: `The HUBZone Program supports businesses located in historically underutilized areas. It
		aims to stimulate economic growth in these regions by providing government contracting
		preferences to qualified HUBZone businesses.`,
    disadvantages: ['long_term_isolated_residence'],
    details: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/hubzone-program'
  },
  {
    name: 'VOSB',
    description: `Veteran-Owned Small Business (VOSB) Program: The VOSB Program supports and encourages
		businesses owned by America’s veterans. This program encourages veterans to continue
		contributing to the nation through economic means. VOSB participants benefit from SBA
		resources, training, and access to government contracts.`,
    disadvantages: ['veteran'],
    details: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/veteran-contracting-assistance-programs'
  },
  {
    name: 'SDVOSB',
    description: `Service-Disabled Veteran-Owned Small Business (SDVOSB) Program: The SDVOSB Program is an
		extension of the VOSB Program and offers additional benefits to veterans with
		service-connected disabilities.`,
    disadvantages: ['disabledVeteran'],
    details: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/veteran-contracting-assistance-programs'
  }
]

export const stateAbbreviations = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];
