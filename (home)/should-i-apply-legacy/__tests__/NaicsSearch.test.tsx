import { NaicsCodeType } from '@/app/(home)/should-i-apply/components/utils/types';
import { naicsFetcherGET } from '@/app/(home)/should-i-apply/components/utils/fetch';
import { axiosInstance } from '@/app/services/fetcher';

type MockData = {
  [key: string]: {
    naics_code: string;
    description: string;
    award_amount: string;
  }[];
};

const mockData: MockData = {
  '/amount-awarded?keyword=soy': [
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
  ]
};

jest.mock('../app/services/fetcher', () => ({
  axiosInstance: {
    get: jest.fn((url: string) => {
      return new Promise((resolve, reject) => {
        if (mockData[url]) {
          resolve({ data: mockData[url], status: 200 });
        } else {
          reject(new Error('API call unsuccessful'));
        }
      });
    })
  }
}));

describe('naicsFetcherGET', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches data and returns an array of objects with naics_code, description, and award_amount', async () => {
    const url = '/amount-awarded?keyword=soy';
    const result = await naicsFetcherGET(url);

    expect(result).toEqual(mockData[url]);
    expect(axiosInstance.get).toHaveBeenCalledWith(url);

    result.forEach((item: NaicsCodeType) => {
      expect(item).toHaveProperty('naics_code');
      expect(item).toHaveProperty('description');
      expect(item).toHaveProperty('award_amount');
    });
  });

  it('throws an error when API call fails', async () => {
    const url = '/not-a-real-url';

    await expect(naicsFetcherGET(url)).rejects.toThrow('API call unsuccessful');
  });
});
