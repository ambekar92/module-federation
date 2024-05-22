import { GET_USER_PROFILE } from '@/app/constants/routes'
import { axiosInstance, fetcherGET } from '@/app/services/fetcher'

jest.mock('../../../../services/fetcher', () => ({
  axiosInstance: {
    get: jest.fn((url: string) => {
      return new Promise((resolve, reject) => {
        if (mockData[url]) {
          resolve({ data: mockData[url], status: 200 })
        } else {
          reject(new Error('API call unsuccessful'))
        }
      })
    }),
  },
  fetcherGET: jest.fn((url: string) => {
    return axiosInstance.get(url).then((response) => response.data)
  }),
}))

describe('UserProfileInfo', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('fetches data and returns an array of objects with first_name, last_name, email', async () => {
    const mockData = [
      {
        first_name: 'john',
        last_name: 'bell',
        email: 'john@gmail.com',
      },
      {
        first_name: 'abc',
        last_name: 'pq',
        email: 'abcpq@gmail.com',
      },
      {
        first_name: 'myfirst',
        last_name: 'name',
        email: 'myfirst@gmail.com',
      },
    ]

    ;(axiosInstance.get as jest.Mock).mockResolvedValue({
      data: mockData,
      status: 200,
    })

    const url = GET_USER_PROFILE + '1'
    const result = await fetcherGET(url)

    expect(result).toEqual(mockData)
    expect(axiosInstance.get).toHaveBeenCalledWith(url)

    result.forEach((item: any) => {
      expect(item).toHaveProperty('first_name')
      expect(item).toHaveProperty('last_name')
      expect(item).toHaveProperty('email')
    })
  })

  it('throws an error when API call fails', async () => {
    ;(axiosInstance.get as jest.Mock).mockRejectedValue(
      new Error('API call unsuccessful'),
    )

    const url = GET_USER_PROFILE + '1'

    await expect(fetcherGET(url)).rejects.toThrow('API call unsuccessful')
  })
})
