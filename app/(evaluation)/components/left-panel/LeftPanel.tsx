'use client'
import { useSessionUCMS } from '@/app/lib/auth'
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters'
import { getUserRole } from '@/app/shared/utility/getUserRole'
import { Link } from '@trussworks/react-uswds'
import { useParams, usePathname, useRouter, useSelectedLayoutSegment } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useApplicationData } from '../../firm/useApplicationData'
import { NavItem, QuestionnaireItem } from '../../types/types'
import ActionsDropdown from './ActionsDropdown'

interface LeftPanelProps {
  isNavItemsLoading: boolean;
  navItems: NavItem[];
  error: any;
}

function LeftPanel({ isNavItemsLoading, navItems, error }: LeftPanelProps) {
  const params = useParams<{application_id: string, section_questions: any}>();
  const {applicationData, isLoading: isAppDataLoading} = useApplicationData(ApplicationFilterType.id, params.application_id)
  const [activeSection, setActiveSection] = useState<string>('');
  const [activeTitle, setActiveTitle] = useState('');
  const sessionData = useSessionUCMS();
  const userRole = getUserRole(sessionData?.data?.permissions || []);
  const router = useRouter();
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
  }, [pathname, navItems, params.section_questions, selectedSegment])

  function onNavLinkClick(e: any, item: QuestionnaireItem) {
    e.preventDefault();
    const modifiedUrl = item.url.replace(/^\d+/, params.application_id);
    router.push(`../${modifiedUrl}`);
  }

  if (isAppDataLoading || isNavItemsLoading) {
    return <div></div>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  const renderProgram = (obj: Record<string, any> | undefined) => {
    return (
      <ul className="usa-list usa-list--unstyled">
        {obj && Object.entries(obj).map(([key, value]) => (
          <li key={key} className="display-inline">
            {value.programs.name === 'eight_a' ?
              '8(a)'
              : value.programs.name === 'hubzone' ?
                'HUBZone'
                : value.programs.name.toUpperCase().replace(/_/g, '')
            } {' '}
          </li>
        ))}
      </ul>
    );
  };

  if(!applicationData || !sessionData) {
    return
  }

  return (
    <div className='bg-white padding-top-2'>
      <div className="grid-container margin-top-2">
        <h2 className="margin-top-0">{applicationData?.sam_entity?.legal_business_name ?? 'N/A'}</h2>
        <div className="margin-top-1">
          <span className="text-bold margin-right-1">UEI</span>
          <span>{applicationData?.sam_entity?.uei ?? 'N/A'}</span>
        </div>
        <div className="margin-top-1">
          <p className="text-bold margin-right-1">Certification</p>
          {renderProgram(applicationData?.program_application)}
        </div>
        <div className="margin-top-1 margin-bottom-3">
          <span className="usa-tag margin-top-2">Entity Owned</span>
        </div>
        {(
          userRole === 'analyst' ||
					(userRole === 'screener' && applicationData.workflow_state === 'under_review') ||
					(userRole === 'reviewer')
        ) && (
          <ActionsDropdown />
        )}
      </div>
      <div className="grid-container">
        <nav aria-label="Side navigation">
          <ul className="usa-sidenav">
            {navItems.map((item, index) => {
              if (item.child.length > 0) {
                return (
                  <ul className='padding-left-0' key={index}>
                    <li style={{listStyle: 'none'}} className="usa-sidenav__item">
                      <Link onClick={(e) => onNavLinkClick(e, item.child[0])} href={`/${item.child[0].url}`} className={item.section === activeSection ? 'usa-current' : ''}>{item.section}</Link>
                      {item.child.length > 1 && <ul className="usa-sidenav__sublist">
                        {item.child.map((childItem, index1) => (
                          <div key={index1}>
                            <li className="usa-sidenav__item">
                              <Link onClick={(e) => onNavLinkClick(e, childItem)} href={`/${childItem.url}`} className={childItem.title === activeTitle ? 'usa-current' : ''}>{childItem.title}</Link>
                            </li>
                          </div>
                        ))}
                      </ul>}
                    </li>
                  </ul>
                )
              } else {
                return (
                  <ul key={index}>
                    <li style={{listStyle: 'none'}} className="usa-sidenav__item">
                      <Link onClick={(e) => onNavLinkClick(e, item as unknown as QuestionnaireItem)} href='#' className={item.section === activeSection ? 'usa-current' : ''}>{item.section}</Link>
                    </li>
                  </ul>
                )
              }
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default LeftPanel
