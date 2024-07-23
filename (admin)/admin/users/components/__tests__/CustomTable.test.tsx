import { render, screen, act } from '@testing-library/react'
import { USER_ROUTE } from '@/app/constants/routes'
import { axiosInstance } from '@/app/services/fetcher'
import { fetcherGET } from '@/app/services/fetcher'
import CustomTable from '../../components/CustomTable'
import { adminHeader } from '../../../../../shared/components/forms/constant'

jest.mock('../../../../../services/fetcher', () => ({
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

describe('fetcherGET', () => {
  const mockData = [
    {
      id: 1,
      username: 'douglas68',
      first_name: 'Christina',
      last_name: 'Hall',
      email: 'thomaslynn@example.net',
      is_staff: false,
      is_superuser: false,
      is_active: true,
      last_login: null,
      date_joined: '2024-06-18T16:12:39.924933Z',
    },
    {
      id: 1,
      username: 'JohnDoe28',
      first_name: 'John',
      last_name: 'Doe',
      email: 'JohnDoe@example.net',
      is_staff: false,
      is_superuser: false,
      is_active: true,
      last_login: null,
      date_joined: '2024-06-18T16:12:39.924933Z',
    },
  ]
  ;(axiosInstance.get as jest.Mock).mockResolvedValue({
    data: mockData,
    status: 200,
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('fetches data and returns an array of objects with id, username, first_name, last_name, email, is_staff, is_superuser, is_active....', async () => {
    const url = USER_ROUTE
    const result = await fetcherGET(url)

    expect(result).toEqual(mockData)
    expect(axiosInstance.get).toHaveBeenCalledWith(url)

    result.forEach((item) => {
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('first_name')
      expect(item).toHaveProperty('last_name')
      expect(item).toHaveProperty('is_staff')
    })
  })
  it('should display the header column named Name', () => {
    const showNewUserAlert = true
    const newRow: any[] = []
    const onRowCountChangeMock = jest.fn()

    render(
      <CustomTable
        bordered={false}
        onRowCountChange={onRowCountChangeMock}
        headers={adminHeader}
        addSuccessUser={showNewUserAlert}
        newRow={newRow}
      />,
    )

    adminHeader.forEach(({ headerName }) => {
      const headerElement = screen.getByText('Name');
      expect(headerElement).toBeInTheDocument();
    });

  })
  it('throws an error when API call fails', async () => {
    ;(axiosInstance.get as jest.Mock).mockRejectedValue(
      new Error('API call unsuccessful'),
    )

    const url = USER_ROUTE + '/xyz'

    await expect(fetcherGET(url)).rejects.toThrow('API call unsuccessful')
  })
})
