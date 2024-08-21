'use client'
import React, { PropsWithChildren, useEffect } from 'react'
import NavBar from './components/NavBar'
import { Button, ButtonGroup, Grid } from '@trussworks/react-uswds'
import { FormProvider, useForm } from 'react-hook-form'
import { ShouldIApplyFormType, shouldIApplySchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { defaultOwnershipValues } from './ownership/constants'
import { usePathname, useRouter } from 'next/navigation'
import { defaultReadinessValues } from './readiness/constants'
import { defaultEligibilityValues } from './eligibility/constants'
import { defaultMatchValues } from './match/constants'

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter()
  const methods = useForm<ShouldIApplyFormType>({
    resolver: zodResolver(shouldIApplySchema),
    defaultValues: {
      ownership: defaultOwnershipValues,
      readiness: defaultReadinessValues,
      eligibility: defaultEligibilityValues,
      match: defaultMatchValues,
    },
  })
  const pathname = usePathname()

  useEffect(() => {
    methods.reset(JSON.parse(localStorage.getItem('should-i-apply') || '{}'))
  }, [pathname])

  function onSubmit() {
    const data: ShouldIApplyFormType = methods.getValues()
    const saved = JSON.parse(localStorage.getItem('should-i-apply') || '{}')
    const updated = { ...saved, ...data }
    localStorage.setItem('should-i-apply', JSON.stringify(updated))
    handleNext()
  }

  function handleNext() {
    if (pathname.includes('ownership')) {
      router.push('/should-i-apply/match')
      return
    }
    if (pathname.includes('match')) {
      router.push('/should-i-apply/readiness')
      return
    }
    if (pathname.includes('readiness')) {
      router.push('/should-i-apply/eligibility')
      return
    }
    if (pathname.includes('eligibility')) {
      router.push('/should-i-apply/results')
      return
    }
  }
  function handlePrevious() {
    if (pathname.includes('match')) {
      router.push('/should-i-apply/ownership')
      return
    }
    if (pathname.includes('readiness')) {
      router.push('/should-i-apply/match')
      return
    }
    if (pathname.includes('eligibility')) {
      router.push('/should-i-apply/readiness')
      return
    }
    if (pathname.includes('results')) {
      router.push('/should-i-apply/eligibility')
      return
    }
  }
  return (
    <>
      <FormProvider {...methods}>
        <h1>Should I Apply?</h1>
        <Grid
          row
          className="height-full border-y border-y-05 border-base-lighter"
        >
          <NavBar />
          <div className="padding-x-2 flex-1 margin-bottom-2">{children}</div>
        </Grid>
        <ButtonGroup className="flex flex-row flex-justify margin-y-2">
          {!pathname.includes('ownership') && (
            <Button type="button" onClick={handlePrevious} outline>
              Previous
            </Button>
          )}
          <Button
            type="button"
            data-testid="testid-close-or-next-button-should-i-apply"
            onClick={onSubmit}
          >
            {pathname.includes('results') ? 'Close' : 'Next'}
          </Button>
        </ButtonGroup>
      </FormProvider>
    </>
  )
}

export default Layout
