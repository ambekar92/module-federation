import { ENTITIES_ROUTE } from '@/app/constants/routes'
import { axiosInstance } from '@/app/services/fetcher'
import { entitiesFetcherGET } from '@/app/(entity)/entities/utils/fetch'

jest.mock('../../../services/fetcher', () => ({
  axiosInstance: {
    get: jest.fn(() => Promise.resolve({ data: [] })),
  },
}))

describe('entitiesFetcherGET', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('fetches data and returns an array of objects with id, sam_entity object, and other various fields', async () => {
    const mockData = [
      {
        id: 1,
        sam_entity: {
          sam_entity_id: 4,
          legal_business_name: 'Becker-Harris',
          uei: '057OR6L0BT3T',
          cage_code: '4I3X3',
          account_hash: '123456789',
          tax_identifier_number: '123456789',
          dba_name: 'becker-harris',
          physical_address_1: '321 Mckee Throughway',
          physical_address_2: 'Suite 600',
          physical_city: 'Smithville',
          mailing_address_state_or_province: 'Utah',
          physical_zip_code_5: '58217',
          sam_extract_code: '2',
          entity_structure: 'CY',
          govt_bus_poc_first_name: 'Amanda',
          govt_bus_poc_last_name: 'Hernandez',
        },
        owner_user_id: 8,
        type: 'holding company',
        structure: 'corp',
        deleted_at: null,
        created_at: '2024-05-08T16:51:26.093811Z',
        updated_at: '2024-05-08T16:51:26.093824Z',
      },
      {
        id: 2,
        sam_entity: {
          sam_entity_id: 17,
          legal_business_name: 'Parker Group',
          uei: 'EJN4EXOUMK3H',
          cage_code: 'Z6NYF',
          account_hash: '123456789',
          tax_identifier_number: '123456789',
          dba_name: 'parker group',
          physical_address_1: '748 Shaw Circle',
          physical_address_2: 'Suite 060',
          physical_city: 'South Jacquelinestad',
          mailing_address_state_or_province: 'Maine',
          physical_zip_code_5: '31614',
          sam_extract_code: '3',
          entity_structure: 'ZZ',
          govt_bus_poc_first_name: 'Heidi',
          govt_bus_poc_last_name: 'York',
        },
        owner_user_id: 7,
        type: 'branch',
        structure: 'corp',
        deleted_at: null,
        created_at: '2024-05-08T16:51:26.108810Z',
        updated_at: '2024-05-08T16:51:26.108817Z',
      },
      {
        id: 3,
        sam_entity: {
          sam_entity_id: 2,
          legal_business_name: 'Young, Pierce and Maxwell',
          uei: 'WOKS13I4798E',
          cage_code: 'S9TT1',
          account_hash: '123456789',
          tax_identifier_number: '123456789',
          dba_name: 'young, pierce and maxwell',
          physical_address_1: '05959 Oconnor Ville',
          physical_address_2: 'Suite 531',
          physical_city: 'Codyshire',
          mailing_address_state_or_province: 'Idaho',
          physical_zip_code_5: '49873',
          sam_extract_code: '4',
          entity_structure: '2J',
          govt_bus_poc_first_name: 'Joseph',
          govt_bus_poc_last_name: 'Oconnor',
        },
        owner_user_id: 2,
        type: 'holding company',
        structure: 'corp',
        deleted_at: null,
        created_at: '2024-05-08T16:51:26.116988Z',
        updated_at: '2024-05-08T16:51:26.116996Z',
      },
    ]

    ;(axiosInstance.get as jest.Mock).mockResolvedValue({
      data: mockData,
      status: 200,
    })

    const result = await entitiesFetcherGET(ENTITIES_ROUTE)

    expect(result).toEqual(mockData)
    expect(axiosInstance.get).toHaveBeenCalledWith(ENTITIES_ROUTE)

    result.forEach((item) => {
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('sam_entity')
    })
  })

  it('throws an error when API call fails', async () => {
    ;(axiosInstance.get as jest.Mock).mockRejectedValue(
      new Error('API call unsuccessful'),
    )

    const url = ENTITIES_ROUTE + 'xyz'

    await expect(entitiesFetcherGET(url)).rejects.toThrow(
      'API call unsuccessful',
    )
  })
})
