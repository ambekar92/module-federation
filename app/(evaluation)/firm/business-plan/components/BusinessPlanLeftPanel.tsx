'use client'
import { Link } from '@trussworks/react-uswds'
import { useParams, usePathname, useRouter, useSelectedLayoutSegment } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Params, QuestionnaireItem } from '../../../types/types'
import { useLeftItems } from '@/app/(evaluation)/components/left-panel/useLeftItems'

function BusinessPlanLeftPanel() {
  const {isLoading, navItems, error} = useLeftItems()
  const [activeSection, setActiveSection] = useState<string>('');
  const [activeTitle, setActiveTitle] = useState('');
  const router = useRouter();
  const params = useParams<Params>();
  const pathname = usePathname();
  const selectedSegment = useSelectedLayoutSegment()

  useEffect(() => {
    const segment = params.section_questions ?? selectedSegment;
    if (!navItems || !Array.isArray(navItems)) {return;}
    const currentSection = navItems.map(nav => nav.child).flat().find(item => item.url.includes(segment));
    if (currentSection) {
      setActiveSection(currentSection.section);
      setActiveTitle(currentSection.title);
    }
  }, [pathname, navItems])

  function onNavLinkClick(e: any, item: QuestionnaireItem) {
    e.preventDefault();
    router.push(`../${item.url}`);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <div className="grid-container width-full">
        <nav aria-label="Side navigation">
          {isLoading && <div>Loading...</div>}
          {!isLoading && <ul className="usa-sidenav">
            <h3 className='text-primary bg-white height-full margin-y-0 padding-y-2 padding-left-2'>Table of Contents</h3>
            {navItems.map((item, index) => {
              if (item.child.length > 0) {
                return (
                  <ul className='padding-left-0 bg-white' key={index}>
                    {item.child.map((childItem, index1) => {
                      return (
                        <li style={{listStyle: 'none'}} key={index1}>
                          <div className="usa-sidenav__item">
                            <Link onClick={(e) => onNavLinkClick(e, childItem)} href={`../${childItem.url}`} className={childItem.title === activeTitle ? 'usa-current' : ''}>{childItem.title}</Link>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                )
              }
            })}
          </ul>}
        </nav>
      </div>
    </>
  )
}

export default BusinessPlanLeftPanel
