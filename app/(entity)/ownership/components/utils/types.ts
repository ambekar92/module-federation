import { z } from 'zod';
import { OwnershipFormDataSchema } from './schema';

export const formSteps: { id: string; name: string; description?: string; fields?: FieldName[] }[] = [
  {
		 id: 'Step 1',
		 name: 'Firm Ownership Information',
		 fields: [
      'firstName',
      'middleInitial',
      'lastName',
      'gender',
      'socialDisadvantage',
      'usCitizen',
      'veteran',
      'ownershipPercentage'
		 ]
  },
  {
    id: 'Step 1',
    name: 'Control & Operation',
    fields: ['name', 'role', 'position', 'licenseHolder']
  },
  {
		 id: 'Step 3',
		 name: 'Eligible Programs',
		 description:
				'Based on your responses you may continue to apply for the following programs. Please select the program(s) for which you wish to apply.',
		 fields: ['eightA', 'wosb']
  },
  // {
  // 	 id: 'Step 4',
  // 	 name: 'Supporting Documentation',
  // 	 fields: [
  //     'fileLicenseHolder',
  //     'fileShareholderMeetingMinutes',
  //     'fileBoardMeetingMinutes',
  //     'fileArticlesIncorporation',
  //     'fileBylaws',
  //     'fileStockCertsAndLedgers'
  // 	 ]
  // }
]

export type FieldName =
	| 'firmName'
	| 'businessType'
	| 'firstName'
	| 'middleInitial'
	| 'lastName'
	| 'gender'
	| 'socialDisadvantage'
	| 'usCitizen'
	| 'veteran'
	| 'ownershipPercentage'
	| 'eightA'
	| 'wosb'
	| 'name'
	| 'role'
	| 'position'
	| 'licenseHolder'
	| 'fileLicenseHolder'
	| 'fileShareholderMeetingMinutes'
	| 'fileBoardMeetingMinutes'
	| 'fileArticlesIncorporation'
	| 'fileBylaws'
	| 'fileStockCertsAndLedgers'

export type SocialDisadvantageOption = {
	label: string
	value: string
}

export type FirmOwnershipType = {
	firstName: string
	middleInitial: string
	lastName: string
	gender: string
	socialDisadvantages: string[]
	usCitizen: string
	veteran: string
	ownershipPercentage: number
	disabledVeteran: string
}

export type OwnerType = FirmOwnershipType & { id?: number }

export const socialDisadvantages: SocialDisadvantageOption[] = [
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

export type ControllingEmployeeType = {
	name: string
	role: string
	position: string
	licenseHolder: string
}

export type EmployeeType = ControllingEmployeeType & { id: number }

export interface SelectOption {
	value: string
	label: string
}

export type OwnershipInputsType = z.infer<typeof OwnershipFormDataSchema>
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
	registration: 'eightA' | 'wosb' | 'edwosb' | 'protege' | 'hubzone' | 'vosb' | 'sdvosb'
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
      'minority',
      'race'
    ],
    details: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/8a-business-development-program',
    registration: 'eightA'
  },
  {
    name: 'WOSB',
    description: `Women-Owned Small Business (WOSB) Program: The WOSB Program aims to empower and foster the
		growth of women-owned businesses. It offers opportunities for female entrepreneurs to
		compete for federal contracts and receive support to enhance their business capabilities.`,
    disadvantages: ['female', 'gender', 'woman'],
    details: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-federal-contract-program#id-program-eligibility-requirements',
    registration: 'wosb'
  },
  {
    name: 'EDWOSB',
    description: `Economically-Disadvantaged Women-Owned Small Business (EDWOSB) Program: The EDWOSB Program
		is a subset of the WOSB Program focused specifically on economically-disadvantaged women
		entrepreneurs. Benefits include additional contracting opportunities and resources to
		support business growth and success.`,
    disadvantages: ['gender', 'woman'],
    details: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-federal-contract-program#id-program-eligibility-requirements',
    registration: 'edwosb'
  },
  {
    name: 'Mentor-Protégé Program',
    description: `A mentor and its protégé can joint venture as a small business for any small business
		contract, provided the protégé individually qualifies as small. The joint venture may
		also pursue any type of set-aside contract for which the protégé qualifies, including
		contracts set aside for 8(a), service-disabled veteran-owned, women-owned, and HUBZone
		businesses.`,
    disadvantages: ['long_term_isolated_residence', 'woman', 'gender'],
    details: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/sba-mentor-protege-program',
    registration: 'protege'
  },
  {
    name: 'HUBZone',
    description: `The HUBZone Program supports businesses located in historically underutilized areas. It
		aims to stimulate economic growth in these regions by providing government contracting
		preferences to qualified HUBZone businesses.`,
    disadvantages: ['long_term_isolated_residence'],
    details: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/hubzone-program',
    registration: 'hubzone'
  },
  {
    name: 'VOSB',
    description: `Veteran-Owned Small Business (VOSB) Program: The VOSB Program supports and encourages
		businesses owned by America’s veterans. This program encourages veterans to continue
		contributing to the nation through economic means. VOSB participants benefit from SBA
		resources, training, and access to government contracts.`,
    disadvantages: ['veteran'],
    details: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/veteran-contracting-assistance-programs',
    registration: 'vosb'
  },
  {
    name: 'SDVOSB',
    description: `Service-Disabled Veteran-Owned Small Business (SDVOSB) Program: The SDVOSB Program is an
		extension of the VOSB Program and offers additional benefits to veterans with
		service-connected disabilities.`,
    disadvantages: ['disabledVeteran'],
    details: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/veteran-contracting-assistance-programs',
    registration: 'sdvosb'
  }
]

export const stateAbbreviations = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];
