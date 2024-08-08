import useSWR, { SWRConfiguration, SWRResponse } from 'swr';

const defaultConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: 0,
  shouldRetryOnError: false,
  errorRetryCount: 0,
};

function useFetchOnce<Data = any, Error = any>(
  key: string | null,
  fetcher: ((...args: any) => any) | null,
  customConfig: SWRConfiguration = {}
): SWRResponse<Data, Error> {
  const config = { ...defaultConfig, ...customConfig };
  return useSWR<Data, Error>(key, fetcher, config);
}

export default useFetchOnce;
