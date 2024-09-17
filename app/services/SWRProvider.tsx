'use client'
import { PropsWithChildren } from 'react';
import { SWRConfig } from 'swr';
import { superFetcher } from './superFetcher';

export default function SWRProvider({ children }: PropsWithChildren) {
  return (
    <SWRConfig value={{fetcher: superFetcher}}>
      {children}
    </SWRConfig>
  )
}
