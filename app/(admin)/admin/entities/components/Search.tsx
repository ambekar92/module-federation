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
  const [selectedValue, setSelectedValue] = useState('instruction')
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false)
  const [searchTerm1, setSearchTerm1] = useState('')
  const [searchTerm2, setSearchTerm2] = useState('')
  const [inputName, setInputName] = useState('')
  const [flag1, setFlag1] = useState(false)
  const [flag2, setFlag2] = useState(false)
  const [searchTerm1Adv, setSearchTerm1Adv] = useState('')
  const [searchTerm2Adv, setSearchTerm2Adv] = useState('')

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    setSearchTerm1(searchParams.get('q') || '')
    setSearchTerm2(searchParams.get('uei') || '')
  }, [searchParams])

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value
    if (selectedOption === 'searchTerm1') {
      setFlag1(true)
      setInputName(searchTerm1)
    }
    if (selectedOption === 'searchTerm2') {
      setFlag2(true)
      setFlag1(false)
      setInputName(searchTerm2)
    }
    setSelectedValue(selectedOption)
  }
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm1(e.target.value)
    },
    [],
  )
  const handleUEIChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm2(e.target.value)
    },
    [],
  )
  const handleAdNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm1Adv(e.target.value)
    },
    [],
  )
  const handleAdUEIChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm2Adv(e.target.value)
    },
    [],
  )
  const handleChangeSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const params = new URLSearchParams()

      if (searchTerm1) {
        params.set('q', searchTerm1)
      }
      if (searchTerm2) {
        params.set('uei', searchTerm2)
      }

      if (searchTerm1Adv) {
        params.set('q', searchTerm1Adv)
      }
      if (searchTerm2Adv) {
        params.set('uei', searchTerm2Adv)
      }
      params.set('page', '1')
      router.push(`?${params.toString()}`)
    },
    [searchTerm1, searchTerm2, searchTerm2Adv, searchTerm1Adv, router],
  )

  const handleClear = useCallback(() => {
    setSearchTerm1('')
    setSearchTerm2('')
    setSearchTerm1Adv('')
    setSearchTerm2Adv('')
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
                  >
                    {' '}
                    <MenuItem disabled value="instruction">
                      Select Search Criteria
                    </MenuItem>
                    <MenuItem value="searchTerm1">Business Name</MenuItem>
                    <MenuItem value="searchTerm2">Business UEI</MenuItem>
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
                    value={flag1 ? searchTerm1 : flag2 ? searchTerm2 : ''}
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
        </FormGroup>
      ) : (
        <div></div>
      )}
      {showAdvanceSearch ? (
        <>
          <Grid row gap>
            <Grid mobile={{ col: 12 }} tablet={{ col: 6 }}>
              <FormGroup className="control-questions">
                <Label
                  htmlFor="search-uei"
                  style={{
                    fontSize: '16px',
                    fontWeight: '400',
                    width: '650px',
                  }}
                >
                  Business Name
                </Label>
                <InputGroup className="maxw-full">
                  <TextInput
                    id="search-uei"
                    name="search"
                    className="width-full maxw-full"
                    type="search"
                    //value={searchTerm1}
                    value={searchTerm1Adv}
                    onChange={handleAdNameChange}
                  />
                </InputGroup>
              </FormGroup>
            </Grid>
            <Grid mobile={{ col: 12 }} tablet={{ col: 6 }}>
              <FormGroup className="control-questions">
                <Label
                  htmlFor="search-uei"
                  style={{
                    fontSize: '16px',
                    fontWeight: '400',
                    width: '650px',
                  }}
                >
                  Business UEI
                </Label>
                <InputGroup className="maxw-full">
                  <TextInput
                    id="search-uei"
                    name="search"
                    className="width-full maxw-full"
                    type="search"
                    //value={searchTerm2}
                    value={searchTerm2Adv}
                    onChange={handleAdUEIChange}
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
            <div className="margin-right-0">
              <Button type="submit">Search</Button>
            </div>
          </ButtonGroup>
        </>
      ) : (
        <div></div>
      )}
    </form>
  )
}

export default Search
