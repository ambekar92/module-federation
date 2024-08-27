import React, { useState, useEffect, useCallback } from 'react';
import { Button, Link } from '@trussworks/react-uswds';
import { useParams, usePathname, useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { NavItem, QuestionnaireItem } from '../../types/types';
import { useQuestionnaireState } from './useQuestionnaireState';
import { Application } from '@/app/services/types/application-service/Application';
import { getAnalystQuestionnaires } from './constants';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSessionUCMS } from '@/app/lib/auth';
import { getUserRole } from '@/app/shared/utility/getUserRole';

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
};

interface NavigationItemsProps {
  navItems: NavItem[];
  isNavItemsLoading: boolean;
  error: any;
  applicationData: Application;
}

const NavigationItems: React.FC<NavigationItemsProps> = React.memo(({
  navItems,
  applicationData
}) => {
  const params = useParams<{application_id: string, section_questions: string}>();
  const [activeSection, setActiveSection] = useState<string>('');
  const [activeTitle, setActiveTitle] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const selectedSegment = useSelectedLayoutSegment();
  const sessionData = useSessionUCMS();
  const userRole = getUserRole(sessionData?.data?.permissions || []);

  const analystQuestionnaires = React.useMemo(() => {
    if (!applicationData?.program_application) {return [];}
    return getAnalystQuestionnaires(applicationData.program_application);
  }, [applicationData?.program_application]);

  const { completedQuestionnaires } = useQuestionnaireState(applicationData, analystQuestionnaires);

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

  const isItemClickable = useCallback((index: number) => {
    if (index === 0) {return true;}

    const questionnaireKeys = analystQuestionnaires.map(url =>
      url.replace('/', '').replace('analyst-questionnaire-', '')
    );

    for (let i = 0; i < index; i++) {
      if (!completedQuestionnaires[questionnaireKeys[i]]) {
        return false;
      }
    }
    return true;
  }, [completedQuestionnaires, analystQuestionnaires]);

  const renderNavItem = useCallback((childItem: QuestionnaireItem, index: number) => {
    const isAnalystQuestionnaire = childItem.url.includes('analyst-questionnaire');
    const isClickable = isItemClickable(index);

    if (childItem.title === 'HUBZone Calculator' && userRole !== 'analyst' && userRole !== 'reviewer') {
      return null;
    }

    if (isAnalystQuestionnaire && !isClickable) {
      return (
        <Button
          type='button'
          disabled
          style={{ backgroundColor: 'transparent', color: '#565c65', fontSize: '16px', fontWeight: 400, textAlign: 'left' }}
          className={`padding-y-1 padding-right-2 padding-left-4 text-baseline text-normal ${childItem.title === activeTitle ? 'usa-current' : ''}`}
        >
          {childItem.title}
        </Button>
      );
    }

    return (
      <Link
        onClick={(e) => onNavLinkClick(e, childItem)}
        href={`/firm/application/${params.application_id}/${childItem.url}`}
        className={childItem.title === activeTitle ? 'usa-current' : ''}
        style={{paddingLeft: '32px', display: 'flex', alignContent: 'center', justifyContent: 'space-between'}}
      >
        {truncateText(childItem.title, 12)} {isAnalystQuestionnaire && isClickable && (
          <CheckCircleIcon className={`${
            index === analystQuestionnaires.length - 1
              ? completedQuestionnaires['hubzone-specific']
                ? 'text-green'
                : 'text-gold'
              : isItemClickable(index + 1)
                ? 'text-green'
                : 'text-gold'
          }`} />
        )}
      </Link>
    );
  }, [activeTitle, onNavLinkClick, isItemClickable, params.application_id]);

  return (
    <nav aria-label="Side navigation">
      <ul className="usa-sidenav">
        {navItems.map((item, index) => {
          if (item.child.length > 0) {
            return (
              <ul className='padding-left-0' key={index}>
                <li style={{listStyle: 'none'}} className="usa-sidenav__item">
                  <Link onClick={(e) => onNavLinkClick(e, item.child[0])} href={`/${item.child[0].url}`} className={item.section === activeSection ? 'usa-current' : ''} style={{paddingLeft: '16px'}}>
                    {item.section}
                  </Link>
                  {item.child.length > 1 && (
                    <ul className="usa-sidenav__sublist">
                      {item.child.map((childItem, childIndex) => (
                        <li key={childIndex} className="usa-sidenav__item">
                          {renderNavItem(childItem, childIndex)}
                        </li>
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
