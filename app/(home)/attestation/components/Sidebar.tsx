import { Accordion } from '@trussworks/react-uswds';
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion';

interface SidebarProps {
  sections: { sectionName: string; questions: { label: string }[] }[];
  // eslint-disable-next-line no-unused-vars
  handleStep: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sections, handleStep }) => {
  const sidebarItems: AccordionItemProps[] = sections.map((section, index) => ({
    id: `item${index + 1}`,
    title: section.sectionName,
    content: (
      <>
        {section.questions.map((question, questionIndex) => (
          <span onClick={() => handleStep(index)} className='display-block cursor-pointer text-underline hover:text-primary' key={questionIndex}>
            {question.label}
          </span>
        ))}
      </>
    ),
    expanded: false,
    headingLevel: 'h2'
  }));

  return <Accordion className='margin-top-2' items={sidebarItems} multiselectable={true} />;
};

export default Sidebar;
