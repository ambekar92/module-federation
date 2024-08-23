import React, { useState, useEffect, useCallback } from 'react';
import { Link, Button } from '@trussworks/react-uswds';
import { useParams, usePathname, useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { useFirmSelector } from '@/app/(evaluation)/firm/store/hooks';
import { NavItem, QuestionnaireItem } from '../../types/types';

interface NavigationItemsProps {
  navItems: NavItem[];
  isNavItemsLoading: boolean;
  error: any;
}

const NavigationItems: React.FC<NavigationItemsProps> = React.memo(({
  navItems,
  isNavItemsLoading,
  error
}) => {
  const params = useParams<{application_id: string, section_questions: any}>();
  const [activeSection, setActiveSection] = useState<string>('');
  const [activeTitle, setActiveTitle] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const selectedSegment = useSelectedLayoutSegment();
  const completedAnalystQAs = useFirmSelector(state => state.evaluation.completedAnalystQAs);

  useEffect(() => {
    const segment = params.section_questions ?? selectedSegment;
    if (!navItems || !Array.isArray(navItems)) {return;}
    const currentSection = navItems.map(nav => nav.child).flat().find(item => item.url.includes(segment));
    if (currentSection) {
      setActiveSection(currentSection.section);
      setActiveTitle(currentSection.title);
    }
  }, [pathname, navItems, params.section_questions, selectedSegment]);

  const onNavLinkClick = useCallback((e: React.MouseEvent, item: QuestionnaireItem) => {
    e.preventDefault();
    const modifiedUrl = item.url.replace(/^\d+/, params.application_id);
    router.push(`../${modifiedUrl}`);
  }, [params.application_id, router]);

  const renderNavItem = useCallback((childItem: QuestionnaireItem, index: number) => {
    const isAnalystQuestionnaire = childItem.url.includes('analyst-questionnaire');
    const questionnaireKey = childItem.url.split('-').pop() as keyof typeof completedAnalystQAs;
    const isCompleted = completedAnalystQAs[questionnaireKey];
    const isFirstQuestionnaire = index === 0;

    if (isAnalystQuestionnaire && !isFirstQuestionnaire && !isCompleted) {
      return (
        <Button
          type='button'
          disabled
          style={{ backgroundColor: 'transparent', fontSize: '16px' }}
          className={`padding-y-1 padding-right-2 padding-left-4 text-normal ${childItem.title === activeTitle ? 'usa-current' : ''}`}
        >
          {childItem.title}
        </Button>
      );
    }

    return (
      <Link
        onClick={(e) => onNavLinkClick(e, childItem)}
        href={`/${childItem.url}`}
        className={childItem.title === activeTitle ? 'usa-current' : ''}
      >
        {childItem.title}
      </Link>
    );
  }, [activeTitle, completedAnalystQAs, onNavLinkClick]);

  if (isNavItemsLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <nav aria-label="Side navigation">
      <ul className="usa-sidenav">
        {navItems.map((item, index) => {
          if (item.child.length > 0) {
            return (
              <ul className='padding-left-0' key={index}>
                <li style={{listStyle: 'none'}} className="usa-sidenav__item">
                  <Link onClick={(e) => onNavLinkClick(e, item.child[0])} href={`/${item.child[0].url}`} className={item.section === activeSection ? 'usa-current' : ''}>{item.section}</Link>
                  {item.child.length > 1 && (
                    <ul className="usa-sidenav__sublist">
                      {item.child.map((childItem, index1) => (
                        <div key={index1}>
                          <li className="usa-sidenav__item">
                            {renderNavItem(childItem, index1)}
                          </li>
                        </div>
                      ))}
                    </ul>
                  )}
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
  );
});

NavigationItems.displayName = 'NavigationItems';

export default NavigationItems;
