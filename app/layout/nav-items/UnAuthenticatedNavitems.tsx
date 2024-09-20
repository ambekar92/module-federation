import { CALCULATOR_DEMO_SBA_ONE_ROUTE, CERTIFICATION_SBA_ROUTE, FEDERAL_CONTRACTING_ASSISTANCE_PROGRAMS_ROUTE, GET_HELP_ROUTE, RESOURCES_GET_READY_ROUTE, RESOURCES_ROUTE, SBAONE_ATLASSIAN_SPACES_ROUTE } from '@/app/constants/url';
import { Menu, NavDropDownButton, PrimaryNav } from '@trussworks/react-uswds';
import Link from 'next/link';
import React, { useState } from 'react';

const UnAuthenticatedNavitems = ({toggleMobileNav, mobileExpanded, ReactGA}: {toggleMobileNav: any, mobileExpanded: boolean, ReactGA: any}) => {
  const [navDropdownOpen, setNavDropdownOpen] = useState([false, false, false])

  const handleClickGetHelp = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    ReactGA.event({
      category: 'Engagement',
      action: 'Clicked Get Help from Navbar',
      label: 'Main Navigation'
    });
  }

  const handleToggleNavDropdown = (index: number): void => {
    setNavDropdownOpen((prevNavDropdownOpen) => {
      const newOpenState = Array(prevNavDropdownOpen.length).fill(true)
      newOpenState[index] = !prevNavDropdownOpen[index]
      return newOpenState
    })
  }

  const handleClickOurProgram = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    ReactGA.event({
      category: 'Engagement',
      action: 'Clicked Our Program from Navbar',
      label: 'Main Navigation'
    });
  }

  const navitems = [
    <React.Fragment key="primaryNav_3">
      <Link className="usa-nav_link" href={CERTIFICATION_SBA_ROUTE}>
        <span>Home</span>
      </Link>
    </React.Fragment>,
    <React.Fragment key="primaryNav_3">
      <Link className="usa-nav_link" href="/should-i-apply/ownership">
        <span>Should I Apply?</span>
      </Link>
    </React.Fragment>,
    <React.Fragment key="primaryNav_2">
      <NavDropDownButton
        menuId="extended-nav-section-resources"
        isOpen={navDropdownOpen[2]}
        label="Resources"
        onToggle={() => handleToggleNavDropdown(2)}
      />
      <Menu
        id="extended-nav-section-resources"
        items={[
          <Link key={0} href={RESOURCES_ROUTE}>
            Resources
          </Link>,
          <Link key={1} href={RESOURCES_GET_READY_ROUTE}>
            Prepare for Application
          </Link>,
          <Link key={2} href={CALCULATOR_DEMO_SBA_ONE_ROUTE}>
            HUBZone Calculator
          </Link>,
          <Link
            key={3}
            href={SBAONE_ATLASSIAN_SPACES_ROUTE}
          >
            Knowledge Base
          </Link>,
        ]}
        isOpen={navDropdownOpen[2]}
      />
    </React.Fragment>,
    <React.Fragment key="primaryNav_3">
      <a onClick={handleClickOurProgram}
        className="usa-nav_link"
        href={FEDERAL_CONTRACTING_ASSISTANCE_PROGRAMS_ROUTE}
      >
        <span>Our Programs</span>
      </a>
    </React.Fragment>,
    <React.Fragment key="primaryNav_3">
      <a onClick={handleClickGetHelp}
        className="usa-nav_link margin-left-4"
        href={GET_HELP_ROUTE}
      >
        <span>Get Help</span>
      </a>
    </React.Fragment>,

  ];

  return (
    <PrimaryNav
      aria-label="Primary navigation"
      items={navitems}
      mobileExpanded={mobileExpanded}
      onToggleMobileNav={toggleMobileNav}
    />
  )
}

export default UnAuthenticatedNavitems
