'use client'
import { Icon, SideNav } from '@trussworks/react-uswds';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ShouldApplyResponseTypes } from '../../should-i-apply-legacy/components/utils/types';
import { determineCompleteness } from '../utils/determineCompleteness';
import styles from './NavBar.module.scss';

const listItemClasses = 'bg-white radius-sm width-card-lg margin-y-1 line-height' + styles.lineHeight

const NavBar = () => {
  const [active, setActive] = React.useState(0);
  const pathname = usePathname();
  const {getValues} = useFormContext<ShouldApplyResponseTypes>();
  const [ownershipComplete, setOwnershipComplete] = React.useState(false);
  const [readinessComplete, setReadinessComplete] = React.useState(false);
  const [eligibilityComplete, setEligibilityComplete] = React.useState(false);
  const [matchComplete, setMatchComplete] = React.useState(false);

  useEffect(() => {
    const values = JSON.parse(localStorage.getItem('should-i-apply') ?? '{}');
    const ownershipComplete = determineCompleteness('ownership', values);
    setOwnershipComplete(ownershipComplete);

    const readinessComplete = determineCompleteness('readiness', values);
    setReadinessComplete(readinessComplete);

    const eligibilityComplete = determineCompleteness('eligibility', values);
    setEligibilityComplete(eligibilityComplete);

    const matchComplete = determineCompleteness('match', values);
    setMatchComplete(matchComplete);

    if (ownershipComplete) {
      setActive(0);
    }
  }, [pathname])

  useEffect(() => {
    if (pathname.includes('ownership')) {
      setActive(0);
    } else if (pathname.includes('match')) {
      setActive(1);
    } else if (pathname.includes('readiness')) {
      setActive(2);
    } else if (pathname.includes('eligibility')) {
      setActive(3);
    } else if (pathname.includes('results')) {
      setActive(4);
    }
  }, [pathname])
  return (
    <div className='bg-base-lighter padding-2'>
      <SideNav items={
        [<div key='ownership' className={listItemClasses}>
          <Link style={{display: 'flex', justifyContent: 'space-between'}} className={active === 0 ? 'usa-current' : ''} href="/should-i-apply/ownership">
            <span>Ownership</span>
            {ownershipComplete && <Icon.CheckCircle color='#00A91C'></Icon.CheckCircle>}
          </Link>
        </div>,
        <li key='match' className={listItemClasses}>
          <Link style={{display: 'flex', justifyContent: 'space-between'}} className={active === 1 ? 'usa-current' : ''} href="/should-i-apply/match">
            <span>Match</span>
            {matchComplete && <Icon.CheckCircle color='#00A91C'></Icon.CheckCircle>}
          </Link>
        </li>,
        <li key='readiness' className={listItemClasses}>
          <Link style={{display: 'flex', justifyContent: 'space-between'}} className={active === 2 ? 'usa-current' : ''} href="/should-i-apply/readiness">
            <span>Readiness</span>
            {readinessComplete && <Icon.CheckCircle color='#00A91C'></Icon.CheckCircle>}
          </Link>
        </li>,
        <li key='eligibility' className={listItemClasses}>
          <Link style={{display: 'flex', justifyContent: 'space-between'}} className={active === 3 ? 'usa-current' : ''} href="/should-i-apply/eligibility">
            <span>Eligibility</span>
            {eligibilityComplete && <Icon.CheckCircle color='#00A91C'></Icon.CheckCircle>}
          </Link>
        </li>,
        <li key='results' className={listItemClasses}>
          <Link style={{display: 'flex', justifyContent: 'space-between'}} className={active === 4 ? 'usa-current' : ''} href="/should-i-apply/results">Results</Link>
        </li>

        ]
      } /></div>
  )
}

export default NavBar
