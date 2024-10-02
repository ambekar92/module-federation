import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button, Link } from '@trussworks/react-uswds';
import { useParams, usePathname, useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { NavItem, QuestionnaireItem } from '../../types/types';
import { useQuestionnaireState } from './useQuestionnaireState';
import { Application } from '@/app/services/types/application-service/Application';
import { getAnalystQuestionnaires } from './constants';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSessionUCMS } from '@/app/lib/auth';
import { getUserRole } from '@/app/shared/utility/getUserRole';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const selectedSegment = useSelectedLayoutSegment();
  const sessionData = useSessionUCMS();
  const userRole = getUserRole(sessionData?.data?.permissions || []);

  const isNavItem = (item: QuestionnaireItem | NavItem): item is NavItem => {
    return 'child' in item && Array.isArray((item as NavItem).child);
  };

  const analystQuestionnaires = React.useMemo(() => {
    if (!applicationData?.program_application) {return [];}
    return getAnalystQuestionnaires(applicationData.program_application);
  }, [applicationData?.program_application]);

  const { completedQuestionnaires } = useQuestionnaireState(applicationData, analystQuestionnaires);

  const filteredNavItems = useMemo(() => {
    return navItems.filter(item =>
      item.section !== 'Contributor Two Application' &&
      item.section !== 'Contributor Three Application' ||
      (item.child && item.child.length > 0)
    );
  }, [navItems]);

  useEffect(() => {
    const segment = params.section_questions ?? selectedSegment;
    if (!filteredNavItems || !Array.isArray(filteredNavItems)) {return;}
    const currentSection = filteredNavItems.map(nav => nav.child).flat().find(item => item.url?.includes(segment));
    if (currentSection) {
      setActiveSection(currentSection.section);
      setActiveTitle(currentSection.title);
      setExpandedSections(prev => {
        const newExpandedSections = [...prev];
        if (!newExpandedSections.includes(currentSection.section)) {
          newExpandedSections.push(currentSection.section);
        }
        if (!newExpandedSections.includes('Application')) {
          newExpandedSections.push('Application');
        }
        return newExpandedSections;
      });
    }
  }, [pathname, filteredNavItems, params.section_questions, selectedSegment]);

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
    const questionnaireKey = childItem.url.split('/').pop()?.replace('analyst-questionnaire-', '') || '';

    return (
      <Link
        onClick={(e) => onNavLinkClick(e, childItem)}
        href={`/firm/application/${params.application_id}/${childItem.url}`}
        className={childItem.title === activeTitle ? 'usa-current' : ''}
        style={{paddingLeft: '32px', display: 'flex', alignContent: 'center', justifyContent: 'space-between'}}
      >
        {childItem.title} {isAnalystQuestionnaire && isClickable && (
          <CheckCircleIcon className={`${
            completedQuestionnaires[questionnaireKey]
              ? 'text-green'
              : 'text-gold'
          }`} />
        )}
      </Link>
    );
  }, [activeTitle, onNavLinkClick, isItemClickable, params.application_id, userRole, analystQuestionnaires.length, completedQuestionnaires]);

  const renderContributorAccordion = useCallback((contributorItem: NavItem) => {
    return (
      <Accordion
        expanded={expandedSections.includes(contributorItem.section)}
        onChange={() => handleAccordionChange(contributorItem.section)}
        sx={{
          boxShadow: 'none',
          '&:before': {
            display: 'none',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            padding: '0 16px 0 32px',
            minHeight: '48px',
            '& .MuiAccordionSummary-content': {
              margin: '0',
            },
          }}
        >
          <Typography>{contributorItem.section}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          <ul className="usa-sidenav__sublist">
            {contributorItem.child.map((childItem, childIndex) => (
              <li key={childIndex} className="usa-sidenav__item">
                {renderNavItem(childItem, childIndex)}
              </li>
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>
    );
  }, [expandedSections, renderNavItem]);

  const handleAccordionChange = useCallback((section: string) => {
    setExpandedSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  }, []);

  const renderNavSection = useCallback((item: NavItem, index: number) => {
    if (item.child.length === 1) {
      return (
        <Link
          onClick={(e) => onNavLinkClick(e, item.child[0])}
          href={`/${item.child[0].url}`}
          className={item.section === activeSection ? 'usa-current' : ''}
          style={{paddingLeft: '16px'}}
        >
          {item.section}
        </Link>
      );
    }

    return (
      <Accordion
        expanded={expandedSections.includes(item.section)}
        onChange={() => handleAccordionChange(item.section)}
        sx={{
          boxShadow: 'none',
          '&:before': {
            display: 'none',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            padding: '0 16px',
            minHeight: '48px',
            '& .MuiAccordionSummary-content': {
              margin: '0',
            },
          }}
        >
          <Typography>{item.section}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          <ul className="usa-sidenav__sublist">
            {item.child.map((childItem, childIndex) => (
              <li key={childIndex} className="usa-sidenav__item">
                {isNavItem(childItem) ? renderContributorAccordion(childItem) : renderNavItem(childItem, childIndex)}
              </li>
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>
    );
  }, [expandedSections, handleAccordionChange, renderContributorAccordion]);

  return (
    <nav aria-label="Side navigation">
      <ul className="usa-sidenav">
        {filteredNavItems.map((item, index) => (
          <li key={index} style={{listStyle: 'none'}} className="usa-sidenav__item">
            {renderNavSection(item, index)}
          </li>
        ))}
      </ul>
    </nav>
  );
});

NavigationItems.displayName = 'NavigationItems';

export default NavigationItems;
