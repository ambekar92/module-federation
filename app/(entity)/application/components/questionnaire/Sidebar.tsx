import { Accordion } from '@trussworks/react-uswds';
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Question {
  title: string;
  route: string;
  stepIs: number | null;
}

interface Section {
  sectionName: string;
  questions: Question[];
}

interface SidebarProps {
  // eslint-disable-next-line no-unused-vars
  handleStep?: (index: number) => void;
  sections: Section[];
}

const Sidebar = ({ handleStep, sections }: SidebarProps) => {
  const router = useRouter();

  const sidebarItems: AccordionItemProps[] = sections.map((section, index) => ({
    id: `item${index + 1}`,
    title: section.sectionName,
    content: (
      <>
        {section.questions.map((question, questionIndex) => (
          handleStep && question.stepIs !== null ? (
            <span
              onClick={() => {
                if (question.stepIs !== null && handleStep) {
                  handleStep(question.stepIs);
                  router.push(question.route);
                }
              }}
              className='display-block cursor-pointer text-underline hover:text-primary'
              key={questionIndex}
            >
              {question.title}
            </span>
          ) : (
            <Link href={question.route} key={questionIndex} className='display-block text-ink cursor-pointer text-underline hover:text-primary'>
              {question.title}
            </Link>
          )
        ))}
      </>
    ),
    expanded: false,
    headingLevel: 'h2'
  }));

  return <Accordion className='margin-top-2' items={sidebarItems} multiselectable={true} />;
};

export default Sidebar;
