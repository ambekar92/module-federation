import { USER_ROLES_ROUTE } from '@/app/constants/routes'
import { axiosInstance } from '@/app/services/fetcher'
import { roleFetcherGET } from '@/app/(admin)/admin/user-roles/utils/fetch'

jest.mock('../../../../services/fetcher', () => ({
  axiosInstance: {
    get: jest.fn(() => Promise.resolve({ data: [] })),
  },
}))

describe('roleFetcherGET', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('fetches data and returns an array of objects with name, description, and other various fields', async () => {
    const mockData = [
      {
        "id": 1,
        "slug": "internal_user",
        "name": "Internal User",
        "description": "",
        "parameters": "set()"
      },
      {
        "id": 2,
        "slug": "external_user",
        "name": "External User",
        "description": "",
        "parameters": "set()"
      },
    ]

    ;(axiosInstance.get as jest.Mock).mockResolvedValue({
      data: mockData,
      status: 200,
    })

    const result = await roleFetcherGET(USER_ROLES_ROUTE)

    expect(result).toEqual(mockData)
    expect(axiosInstance.get).toHaveBeenCalledWith(USER_ROLES_ROUTE)

    result.forEach((item:any) => {
      expect(item).toHaveProperty('name')
      expect(item).toHaveProperty('description')
    })
  })

  it('throws an error when API call fails', async () => {
    ;(axiosInstance.get as jest.Mock).mockRejectedValue(
      new Error('API call unsuccessful'),
    )

    const url = USER_ROLES_ROUTE + 'xyz'

    await expect(roleFetcherGET(url)).rejects.toThrow(
      'API call unsuccessful',
    )
  })
})
