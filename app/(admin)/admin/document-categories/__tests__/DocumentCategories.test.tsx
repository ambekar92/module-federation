import { API_ROUTE } from '@/app/constants/routes'
import { axiosInstance } from '@/app/services/fetcher'
import { documentCategoriesFetcherGET } from '@/app/(admin)/admin/document-categories/utils/fetch'

jest.mock('../../../../services/fetcher', () => ({
  axiosInstance: {
    get: jest.fn(() => Promise.resolve({ data: [] })),
  },
}))

describe('documentCategoriesFetcherGET', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('fetches data and returns an array of objects with id, name, and description', async () => {
    const mockData = [
      {
        id: 1,
        name: 'Project Overview',
        description: 'Detailed description of the project',
      },
      {
        id: 2,
        name: 'Technical Specifications',
        description: 'Technical details of the project',
      },
      {
        id: 3,
        name: 'Project Timeline',
        description: 'Timeline and milestones of the project',
      },
    ]

    ;(axiosInstance.get as jest.Mock).mockResolvedValue({
      data: mockData,
      status: 200,
    })

    const url = API_ROUTE + '/document-categories'
    const result = await documentCategoriesFetcherGET(url)

    expect(result).toEqual(mockData)
    expect(axiosInstance.get).toHaveBeenCalledWith(url)

    result.forEach((item) => {
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('name')
      expect(item).toHaveProperty('description')
    })
  })

  it('throws an error when API call fails', async () => {
    ;(axiosInstance.get as jest.Mock).mockRejectedValue(
      new Error('API call unsuccessful'),
    )

    const url = '/document-categories'

    await expect(documentCategoriesFetcherGET(url)).rejects.toThrow(
      'API call unsuccessful',
    )
  })
})
