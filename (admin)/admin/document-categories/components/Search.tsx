'use client'
import { FormGroup, Icon, InputGroup, InputSuffix, TextInput } from '@trussworks/react-uswds';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const Search = async () => {
  const searchParams = useSearchParams();
  const searchParamsState = new URLSearchParams(Array.from(searchParams.entries()));
  const pathName = usePathname();
  const router = useRouter();

  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    searchParamsState.set('q', e.target.value);
    searchParamsState.set('page', '1');
    const q = searchParamsState.toString();
    router.push(`${pathName}?${q}`)
  }
  return (
    <FormGroup>
    <InputGroup>
      <TextInput id="search" name="search" type="search" onChange={handleChangeSearch} />
      <InputSuffix>
        <Icon.Search />
      </InputSuffix>
    </InputGroup>
  </FormGroup>
  )
}

export default Search