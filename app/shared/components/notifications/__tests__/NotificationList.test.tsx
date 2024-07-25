import { axiosInstance, fetcherGET } from '@/app/services/fetcher-legacy'

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

describe('NotificationList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('fetches data and returns an array of objects with recipient_id, unread, message', async () => {
    const mockData = [
      {
        recipient_id: 0,
        unread: true,
        message: "Test 1 Notification message",
      },
      {
        recipient_id: 1,
        unread: true,
        message: "Test 2 Notification message",
      },
      {
        recipient_id: 2,
        unread: true,
        message: "Test 3 Notification message",
      },
    ]

    ;(axiosInstance.get as jest.Mock).mockResolvedValue({
      data: mockData,
      status: 200,
    })

    const url = '/notifications?user_id=1'
    const result = await fetcherGET(url)

    expect(result).toEqual(mockData)
    expect(axiosInstance.get).toHaveBeenCalledWith(url)

    result.forEach((item: any) => {
      expect(item).toHaveProperty('recipient_id')
      expect(item).toHaveProperty('unread')
      expect(item).toHaveProperty('message')
    })
  })

  it('throws an error when API call fails', async () => {
    ;(axiosInstance.get as jest.Mock).mockRejectedValue(
      new Error('API call unsuccessful'),
    )
    const url = '/notifications?user_id=1'
    await expect(fetcherGET(url)).rejects.toThrow('API call unsuccessful')
  })
})
