'use client'
import {
  FormGroup,
  InputGroup,
  TextInput,
  Button,
  ButtonGroup,
} from '@trussworks/react-uswds'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useCallback, useEffect } from 'react'

const Search = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '')
  }, [searchParams])

  const handleBNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleChangeSearch = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchTerm) {
      params.set('q', searchTerm)
    } else {
      params.delete('q')
    }
    params.set('page', '1')
    router.push(`?${params.toString()}`)
  }, [searchTerm, searchParams, router])

  const handleClear = useCallback(() => {
    setSearchTerm('')
    const params = new URLSearchParams(searchParams)
    params.delete('q')
    params.set('page', '1')
    router.push(`?${params.toString()}`)
  }, [searchParams, router])

  return (
    <form onSubmit={handleChangeSearch}>

      <FormGroup>
        <div style={{ fontSize: '16px', fontWeight: '400', width: '700px' }}>
          Application Number
        </div>
        <div className='display-flex width-full flex-align-center'>
          <InputGroup className='flex-1 maxw-full radius-md'>
            <TextInput
              id="search"
              name="search"
              type="search"
              className='width-full maxw-full'
              value={searchTerm}
              onChange={handleBNameChange}
            />
          </InputGroup>
          <ButtonGroup className="display-flex flex-align-center margin-top-1 margin-left-2 margin-right-2px">
            <div className="padding-right-2">
              <Button unstyled type="button" onClick={handleClear}>
            			Clear
              </Button>
            </div>
            <div className='margin-right-0'>
              <Button type="submit">Search</Button>
            </div>
          </ButtonGroup>
        </div>
      </FormGroup>
    </form>
  )
}

export default Search
