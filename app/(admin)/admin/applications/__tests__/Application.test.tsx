import { APPLICATION_ROUTE } from '@/app/constants/routes'
import { axiosInstance } from '@/app/services/fetcher'
import { applicationFetcherGET } from '@/app/(admin)/admin/applications/utils/fetch'

jest.mock('../../../../services/fetcher', () => ({
  axiosInstance: {
    get: jest.fn(() => Promise.resolve({ data: [] })),
  },
}))

describe('applicationFetcherGET', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('fetches data and returns an array of objects with id, sam_entity object, and other various fields', async () => {
    const mockData = [
      {
        id: 20,
        entity: {
          entity_id: 51,
          type: null,
          structure: '2A',
          uei: 'C0INDGB0I9EV'
        },
        sam_entity: {
          legal_business_name: 'Burton Ltd',
          uei: 'C0INDGB0I9EV',
          cage_code: 'U0AFJ',
          tax_identifier_number: '017419031',
          dba_name: 'burton ltd',
          physical_address_1: '128 Weaver Course',
          physical_address_2: 'Suite 846',
          physical_city: 'South Jason',
          mailing_address_state_or_province: 'Ohio',
          physical_zip_code_5: '85758',
          naics_code_string: '423940',
          entity_structure: '2K',
          sam_extract_code: 'A',
          exclusion_status_flag: 'Y',
          debt_subject_to_offset_flag: 'Y',
          expiration_date: '20300907',
          last_update_date: '20000914',
          business_start_date: '20040615',
          corporate_url: 'https://Burton_Ltd.com'
        },
        application_type: {
          id: 1,
          name: 'initial-application',
          description: 'Initial application for new certifications',
          title: 'Initial Application'
        },
        program_application: [
          {
            id: 11,
            program_id: 1,
            programs: {
              name: 'eight_a',
              description: null,
              title: '8(a) Business Development'
            }
          },
          {
            id: 12,
            program_id: 3,
            programs: {
              name: 'wosb',
              description: null,
              title: 'Woman-Owned'
            }
          },
          {
            id: 13,
            program_id: 6,
            programs: {
              name: 'ed_wosb',
              description: null,
              title: 'Economically Disadvantaged Women-Owned'
            }
          },
          {
            id: 14,
            program_id: 2,
            programs: {
              name: 'hubzone',
              description: null,
              title: 'Historically Underutilized Business Zone'
            }
          },
          {
            id: 15,
            program_id: 4,
            programs: {
              name: 'vosb',
              description: null,
              title: 'Veteran-Owned'
            }
          },
          {
            id: 16,
            program_id: 5,
            programs: {
              name: 'sd_vosb',
              description: null,
              title: 'Service-Disabled Veteran-Owned'
            }
          },
          {
            id: 19,
            program_id: 1,
            programs: {
              name: 'eight_a',
              description: null,
              title: '8(a) Business Development'
            }
          },
          {
            id: 20,
            program_id: 2,
            programs: {
              name: 'hubzone',
              description: null,
              title: 'Historically Underutilized Business Zone'
            }
          },
          {
            id: 21,
            program_id: 3,
            programs: {
              name: 'wosb',
              description: null,
              title: 'Woman-Owned'
            }
          }
        ],
        workflow_state: 'draft',
        application_version: 2,
        application_contributor_id: [
          1
        ],
        process: null,
        deleted_at: null,
        created_at: '2024-07-10T20:10:22.432731Z',
        updated_at: '2024-07-16T12:43:23.682442Z',
        pplication_tier: 'low',
        submitted_at: null,
        signed_date: null,
        agree_to_statement: null,
        progress: 'Contributor Invitation',
        signed_by: null
      },
    ]

    ;(axiosInstance.get as jest.Mock).mockResolvedValue({
      data: mockData,
      status: 200,
    })

    const result = await applicationFetcherGET(APPLICATION_ROUTE)

    expect(result).toEqual(mockData)
    expect(axiosInstance.get).toHaveBeenCalledWith(APPLICATION_ROUTE)

    result.forEach((item:any) => {
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('created_at')
    })
  })

  it('throws an error when API call fails', async () => {
    ;(axiosInstance.get as jest.Mock).mockRejectedValue(
      new Error('API call unsuccessful'),
    )

    const url = APPLICATION_ROUTE + 'xyz'

    await expect(applicationFetcherGET(url)).rejects.toThrow(
      'API call unsuccessful',
    )
  })
})
