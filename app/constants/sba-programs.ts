export type ProgramOption = {
	name: string,
	description: string
	disadvantages: string[],
	details: string;
	registration: 'eightA' | 'wosb' | 'edwosb' | 'protege' | 'hubzone' | 'vosb' | 'sdvosb'
}

export const sbaProgramOptions: ProgramOption[] = [
  {
    name: '8(a)',
    description: `The 8(a) Business Development Program is a robust nine-year program to assist socially and
		economically disadvantaged entrepreneurs. Participants receive the following benefits:
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
    description: `Woman Owned Small Business (WOSB) Program: The WOSB Program aims to empower and foster the
		growth of women owned businesses. It offers opportunities for female entrepreneurs to
		compete for federal contracts and receive support to enhance their business capabilities.`,
    disadvantages: ['female', 'gender', 'woman'],
    details: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-federal-contract-program#id-program-eligibility-requirements',
    registration: 'wosb'
  },
  {
    name: 'EDWOSB',
    description: `Economically Disadvantaged Women Owned Small Business (EDWOSB) Program: The EDWOSB Program
		is a subset of the WOSB Program focused specifically on economically disadvantaged women
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
    description: `Veteran Owned Small Business (VOSB) Program: The VOSB Program supports and encourages
		businesses owned by America’s Veterans. This program encourages Veterans to continue
		contributing to the nation through economic means. VOSB participants benefit from SBA
		resources, training, and access to government contracts.`,
    disadvantages: ['veteran'],
    details: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/veteran-contracting-assistance-programs',
    registration: 'vosb'
  },
  {
    name: 'SDVOSB',
    description: `Service-Disabled Veteran Owned Small Business (SDVOSB) Program: The SDVOSB Program is an
		extension of the VOSB Program and offers additional benefits to veterans with
		service-connected disabilities.`,
    disadvantages: ['disabledVeteran'],
    details: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/veteran-contracting-assistance-programs',
    registration: 'sdvosb'
  }
]
