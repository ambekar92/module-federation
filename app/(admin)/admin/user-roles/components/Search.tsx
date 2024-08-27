'use client'

import {
  FormGroup,
  Label,
  InputGroup,
  TextInput,
  ButtonGroup,
  Button,
  Grid,
} from '@trussworks/react-uswds'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useState, useEffect } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const Search = () => {
  const StyledSelect = styled(Select)({
    borderRadius: '10px 0 0 10px',
    border: '.5px solid black',
    backgroundColor: '#E5E4E2',
    width: 230,
    height: '40px',
    '& .MuiMenu-paper': {
      backgroundColor: 'gray-0',
      borderRadius: 10,
    },
  })

  const theme = createTheme({
    components: {
      MuiMenuItem: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: 'lightgray',
              color: 'black',
            },
          },
        },
      },
    },
  })

  const [selectedValue, setSelectedValue] = useState('instruction')
  const [searchTerm1, setSearchTerm1] = useState('')
  const [searchTerm1Adv, setSearchTerm1Adv] = useState('')
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    setSearchTerm1(searchParams.get('q') || '')
  }, [searchParams])

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm1(e.target.value)
    },

    [],
  )
  const handleAdNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm1Adv(e.target.value)
    },
    [],
  )
  const handleOptionChange = (event: SelectChangeEvent<any>) => {
    const selectedOption = event.target.value
    setSelectedValue(selectedOption)
  }

  const handleChangeSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const params = new URLSearchParams()
      if (searchTerm1) {
        params.set('q', searchTerm1)
      }
      if (searchTerm1Adv) {
        params.set('q', searchTerm1Adv)
      }
      params.set('page', '1')
      router.push(`?${params.toString()}`)
    },

    [searchTerm1, router, searchTerm1Adv],
  )

  const handleClear = useCallback(() => {
    setSearchTerm1('')
    setSearchTerm1Adv('')
    router.push('?page=1')
  }, [router])

  return (
    <form onSubmit={handleChangeSearch}>
      {!showAdvanceSearch ? (
        <>
          <Grid row>
            <Grid className="grid-col flex-1"></Grid>
            <Grid>
              <ThemeProvider theme={theme}>
                <div style={{ paddingTop: '8px', paddingLeft: '2px' }}>
                  <StyledSelect
                    value={selectedValue}
                    label={'Select Search Criteria'}
                    placeholder="Business Name"
                    IconComponent={KeyboardArrowDownIcon}
                    onChange={handleOptionChange}
                  >
                    {' '}
                    <MenuItem disabled value="instruction">
                      Select Search Criteria
                    </MenuItem>
                    <MenuItem value="searchTerm1">Users</MenuItem>
                  </StyledSelect>
                </div>
              </ThemeProvider>
            </Grid>

            <Grid>
              <div style={{ width: '350px' }}>
                <InputGroup className="">
                  <TextInput
                    id="search-business"
                    name="search"
                    type="search"
                    style={{ height: '38px', width: '800px' }}
                    className="width-full maxw-full"
                    value={searchTerm1}
                    onChange={handleNameChange}
                  />
                </InputGroup>{' '}
              </div>
            </Grid>

            <Grid>
              {' '}
              <div style={{ paddingTop: '8px' }}>
                <Button type="submit">Search</Button>
              </div>
            </Grid>

            <Grid>
              <div className="padding-top-2 padding-left-2">
                <Button unstyled type="button" onClick={handleClear}>
                  Clear
                </Button>
              </div>
            </Grid>
            <Grid className="grid-col flex-1"></Grid>
          </Grid>

          <Grid row>
            <Grid className="grid-col flex-1"></Grid>
            <Grid>
              <div className="padding-top-2 padding-left-2 padding-bottom-3">
                <Button
                  unstyled
                  type="button"
                  onClick={() => setShowAdvanceSearch(!showAdvanceSearch)}
                >
                  Advance Search
                </Button>
              </div>
            </Grid>

            <Grid className="grid-col flex-1"></Grid>
          </Grid>
        </>
      ) : (
        <div></div>
      )}

      {showAdvanceSearch ? (
        <FormGroup>
          <div className="display-flex width-full flex-align-center">
            <InputGroup className="control-questions flex-1 maxw-full">
              <TextInput
                id="search-business"
                name="search"
                type="search"
                className="width-full maxw-full"
                value={searchTerm1Adv}
                onChange={handleAdNameChange}
              />
            </InputGroup>

            <ButtonGroup className="display-flex flex-justify-end margin-top-3 margin-left-2 margin-right-2px">
              <div className="padding-right-2">
                <Button unstyled type="button" onClick={handleClear}>
                  Clear
                </Button>
              </div>

              <div className="margin-right-0">
                <Button type="submit">Search</Button>
              </div>
            </ButtonGroup>
          </div>
        </FormGroup>
      ) : (
        <div></div>
      )}
    </form>
  )
}

export default Search
