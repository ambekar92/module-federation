'use client'
import StepsIndicator from '@/app/shared/components/forms/StepsIndicator';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Accordion, Button, ButtonGroup, Label, Radio } from '@trussworks/react-uswds';
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion';
import { useState } from 'react';
import CustomHeader from '../app/shared/components/forms/CustomHeader';
import QAWrapper from '../app/shared/components/forms/QAWrapper';

const QAFormExample = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    'Personal information',
    'Household status',
    'Supporting documents',
    'Signature',
    'Review and submit'
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const testItems: AccordionItemProps[] = [
    {
      id: 'item1',
      title: 'Accordion Item 1',
      content: <div>This is content for Item 1</div>,
      expanded: false,
      headingLevel: 'h2'
    },
    {
      id: 'item2',
      title: 'Accordion Item 2',
      content: <div>This is content for Item 2</div>,
      expanded: false,
      headingLevel: 'h2'
    },
    {
      id: 'item3',
      title: 'Accordion Item 3',
      content: <div>This is content for Item 3</div>,
      expanded: false,
      headingLevel: 'h2'
    },
    {
      id: 'item4',
      title: 'Accordion Item 4',
      content: <div>This is content for Item 4</div>,
      expanded: false,
      headingLevel: 'h2'
    }
  ]
  const sidebarContent = <Accordion className='margin-top-2' items={testItems} multiselectable={true} />;

  // Can setup the content to change based on step as well.
  const mainContent = (
    <>
      <h2>Section Name {currentStep + 1}</h2>
      <div>
        <Label htmlFor='input-radio-1'><span className='text-bold'>Question 1</span></Label>
        <Radio id="input-radio-yes" name="input-radio-1" label="Yes" />
        <Radio id="input-radio-no" name="input-radio-1" label="No" />
      </div>

      <div>
        <Label htmlFor='input-radio-2'><span className='text-bold'>Question 2</span></Label>
        <Radio id="input-radio-yes-2" name="input-radio-2" label="Yes" />
        <Radio id="input-radio-no-2" name="input-radio-2" label="No" />
      </div>

      <div>
        <Label htmlFor='input-radio-3'><span className='text-bold'>Question 3</span></Label>
        <Radio id="input-radio-yes-3" name="input-radio-3" label="Yes" />
        <Radio id="input-radio-no-3" name="input-radio-3" label="No" />
      </div>

      <div>
        <Label htmlFor='input-radio-1'><span className='text-bold'>Question 4</span></Label>
        <Radio id="input-radio-yes-4" name="input-radio-1" label="Yes" />
        <Radio id="input-radio-no-4" name="input-radio-1" label="No" />
      </div>
    </>
  )
  return (
    <section>
      <CustomHeader title='Application'>
        <ButtonGroup>
          <Button className='padding-1 display-flex flex-align-center' outline type='button'>
            <SaveIcon fontSize='medium' className='margin-right-05' /> Save
          </Button>
          <Button className='padding-1 display-flex flex-align-center' outline type='button'>
            <CloseIcon fontSize='medium' /> Close
          </Button>
        </ButtonGroup>
      </CustomHeader>

      <StepsIndicator
        currentStep={currentStep}
        steps={steps}
        headingLevel="h4"
      />

      <QAWrapper sidebar={sidebarContent}  mainContent={mainContent} />

      <ButtonGroup className='display-flex flex-justify flex-fill border-top padding-y-2'>
        <Button type='button' onClick={handlePrevious} disabled={currentStep === 0}>
          Previous
        </Button>
        <Button type='button' onClick={handleNext} disabled={currentStep === steps.length - 1}>
          Next
        </Button>
      </ButtonGroup>
    </section>
  )
}
export default QAFormExample;
