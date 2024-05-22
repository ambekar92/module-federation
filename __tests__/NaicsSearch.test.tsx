import { naicsFetcherGET } from '@/app/(home)/should-i-apply/components/utils/fetch';
import { NaicsCodeType } from '@/app/(home)/should-i-apply/components/utils/types';
import { axiosInstance } from '@/app/services/fetcher';

jest.mock('../app/services/fetcher', () => ({
  axiosInstance: {
    get: jest.fn(() => Promise.resolve({ data: [] }))
  }
}));

describe('naicsFetcherGET', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('fetches data and returns an array of objects with naics_code, description, award_amount', async () => {
    const mockData: NaicsCodeType[] = [
      {
        naics_code: '111110',
        description: 'Soybean Farming',
        award_amount: '$92,418.00'
      },
      {
        naics_code: '111120',
        description: 'Oilseed (except Soybean) Farming',
        award_amount: '$0'
      },
      {
        naics_code: '311224',
        description: 'Soybean and Other Oilseed Processing',
        award_amount: '$1,377,955.42'
      }
    ];

    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: mockData, status: 200 });

    const url = '/amount-awarded?keyword=soy';
    const result = await naicsFetcherGET(url);

    expect(result).toEqual(mockData);
    expect(axiosInstance.get).toHaveBeenCalledWith(url);

    result.forEach(item => {
      expect(item).toHaveProperty('naics_code');
      expect(item).toHaveProperty('description');
      expect(item).toHaveProperty('award_amount');
    });
  });

  it('throws an error when API call fails', async () => {
    (axiosInstance.get as jest.Mock).mockRejectedValue(new Error('API call unsuccessful'));

    const url = '/amount-awarded?keyword=soy';

    await expect(naicsFetcherGET(url)).rejects.toThrow('API call unsuccessful');
  });
});
