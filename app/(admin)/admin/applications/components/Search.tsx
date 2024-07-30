'use client'
import {
  FormGroup,
  InputGroup,
  TextInput,
  Button,
  ButtonGroup,
  Grid,
} from '@trussworks/react-uswds'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useCallback, useEffect } from 'react'
import Select from '@mui/material/Select'
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

  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedValue, setSelectedValue] = useState('instruction')
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false)

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '')
  }, [searchParams])

  const handleBNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    },
    [],
  )
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value
    setSelectedValue(selectedOption)
  }
  const handleChangeSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const params = new URLSearchParams(searchParams)
      if (searchTerm) {
        params.set('q', searchTerm)
      } else {
        params.delete('q')
      }
      params.set('page', '1')
      router.push(`?${params.toString()}`)
    },
    [searchTerm, searchParams, router],
  )

  const handleClear = useCallback(() => {
    setSearchTerm('')
    router.push('?page=1')
  }, [router])


  return (
  
    <form onSubmit={handleChangeSearch}>
        {!showAdvanceSearch ? (
      <FormGroup>
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
                  <MenuItem value="searchTerm1">Application Number</MenuItem>
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
                  value={searchTerm}
                  onChange={handleBNameChange}
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
      </FormGroup>):(<div></div>)}
      {showAdvanceSearch ? (
        <FormGroup>
          <div style={{ fontSize: '16px', fontWeight: '400', width: '700px' }}>
            Application Number
          </div>
          <div className="control-questions display-flex width-full flex-align-center">
            <InputGroup className="flex-1 maxw-full">
              <TextInput
                id="search"
                name="search"
                type="search"
                className="width-full maxw-full"
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
