import { DOCUMENT_TYPES_ENDPOINT } from '@/app/constants/routes'
import { axiosInstance } from '@/app/services/fetcher'
import { documentTypesFetcherGET } from '@/app/(admin)/admin/document-types/utils/fetch'

jest.mock('../../../../services/fetcher', () => ({
  axiosInstance: {
    get: jest.fn(() => Promise.resolve({ data: [] })),
  },
}))

describe('documentTypesFetcherGET', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('fetches data and returns an array of objects with id, name, description, document_class', async () => {
    const mockData = [
      {
        id: 1,
        name: 'Project Overview',
        description: 'Detailed description of the project',
        document_class: 'Project Document',
      },
      {
        id: 2,
        name: 'Technical Specifications',
        description: 'Technical details of the project',
        document_class: 'Project Document',
      },
      {
        id: 3,
        name: 'Project Timeline',
        description: 'Timeline and milestones of the project',
        document_class: 'Project Document',
      },
    ]

    ;(axiosInstance.get as jest.Mock).mockResolvedValue({
      data: mockData,
      status: 200,
    })

    const url = DOCUMENT_TYPES_ENDPOINT
    const result = await documentTypesFetcherGET(url)

    expect(result).toEqual(mockData)
    expect(axiosInstance.get).toHaveBeenCalledWith(url)

    result.forEach((item) => {
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('name')
      expect(item).toHaveProperty('description')
      expect(item).toHaveProperty('document_class')
    })
  })

  it('throws an error when API call fails', async () => {
    ;(axiosInstance.get as jest.Mock).mockRejectedValue(
      new Error('API call unsuccessful'),
    )

    const url = DOCUMENT_TYPES_ENDPOINT + '/xyz'

    await expect(documentTypesFetcherGET(url)).rejects.toThrow(
      'API call unsuccessful',
    )
  })
})
