import { Accordion } from '@trussworks/react-uswds';
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion';

interface Question {
  label: string;
  input: {
    name: string;
    type: string;
    // Optionally include other properties if some questions might have them
    maxLength?: number; // for text inputs that might specify a maxLength
  };
  options?: string[]; // for select inputs
  details?: string; // for additional information like in checkboxes
}

interface Section {
  sectionName: string;
  questions: Question[];
}

interface SidebarProps {
  sections: Section[];
  handleStep: (index: number) => void;
}

const Sidebar = ({ sections, handleStep }: SidebarProps) => {
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
