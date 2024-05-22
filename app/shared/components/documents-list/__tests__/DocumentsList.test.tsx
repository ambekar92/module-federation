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

describe('DocumentsList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('fetches data and returns an array of objects with file_name, path_name, internal_document', async () => {
    const mockData = [
      {
        file_name: 'filename1',
        path_name: 'system/myfolder/',
        internal_document: true,
      },
      {
        file_name: 'filename1',
        path_name: 'system/myfolder/',
        internal_document: true,
      },
      {
        file_name: 'filename1',
        path_name: 'system/myfolder/',
        internal_document: true,
      },
    ]

    ;(axiosInstance.get as jest.Mock).mockResolvedValue({
      data: mockData,
      status: 200,
    })

    const url = '/documents?user_id=1'
    const result = await fetcherGET(url)

    expect(result).toEqual(mockData)
    expect(axiosInstance.get).toHaveBeenCalledWith(url)

    result.forEach((item: any) => {
      expect(item).toHaveProperty('file_name')
      expect(item).toHaveProperty('path_name')
      expect(item).toHaveProperty('internal_document')
    })
  })

  it('throws an error when API call fails', async () => {
    ;(axiosInstance.get as jest.Mock).mockRejectedValue(
      new Error('API call unsuccessful'),
    )
    const url = '/documents?user_id=1';
    await expect(fetcherGET(url)).rejects.toThrow('API call unsuccessful')
  })

});
