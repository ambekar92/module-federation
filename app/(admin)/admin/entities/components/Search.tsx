'use client'
import {
  FormGroup,
  InputGroup,
  TextInput,
  Grid,
  Button,
  Label,
  ButtonGroup,
} from '@trussworks/react-uswds'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useCallback, useEffect } from 'react'

const Search = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchTerm1, setSearchTerm1] = useState('')
  const [searchTerm2, setSearchTerm2] = useState('')

  useEffect(() => {
    setSearchTerm1(searchParams.get('q') || '')
    setSearchTerm2(searchParams.get('uei') || '')
  }, [searchParams])

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm1(e.target.value)
  }, [])

  const handleUEIChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm2(e.target.value)
  }, [])

  const handleChangeSearch = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchTerm1) {params.set('q', searchTerm1)}
    if (searchTerm2) {params.set('uei', searchTerm2)}
    params.set('page', '1')
    router.push(`?${params.toString()}`)
  }, [searchTerm1, searchTerm2, router])

  const handleClear = useCallback(() => {
    setSearchTerm1('')
    setSearchTerm2('')
    router.push('?page=1')
  }, [router])

  return (
    <form onSubmit={handleChangeSearch}>
      <Grid row gap>
        <Grid mobile={{ col: 12 }} tablet={{ col: 6 }}>
          <FormGroup>
            <Label htmlFor='search-business' style={{ fontSize: '16px', fontWeight: '400', width: '650px' }}>
              Business Name
            </Label>
            <InputGroup className='maxw-full radius-md'>
              <TextInput
                id="search-business"
                name="search"
                type="search"
                className='width-full maxw-full'
                value={searchTerm1}
                onChange={handleNameChange}
              />
            </InputGroup>
          </FormGroup>
        </Grid>
        <Grid mobile={{ col: 12 }} tablet={{ col: 6 }}>
          <FormGroup>
            <Label htmlFor='search-uei' style={{ fontSize: '16px', fontWeight: '400', width: '650px'}}>
              Business UEI
            </Label>
            <InputGroup className='maxw-full radius-md'>
              <TextInput
                id="search-uei"
                name="search"
                className='width-full maxw-full'
                type="search"
                value={searchTerm2}
                onChange={handleUEIChange}
              />
            </InputGroup>
          </FormGroup>
        </Grid>
      </Grid>

      <ButtonGroup className="display-flex flex-justify-end margin-top-3 margin-right-2px">
        <div className="padding-right-2 padding-top-1">
          <Button unstyled type="button" onClick={handleClear}>
            Clear
          </Button>
        </div>
        <div className='margin-right-0'>
          <Button type="submit">Search</Button>
        </div>
      </ButtonGroup>
    </form>
  )
}

export default Search
