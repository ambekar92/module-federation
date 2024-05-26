export const data = [
  {
    question__question_ordinal: 1,
    question__title: '1. Please rate your overall experience today.',
    question__question_type__name: 'radio-horizontal',
    question__name: 'overallExperience',
    question__answer_choice: {
      options: [
        { label: 'Poor', value: 'Poor' },
        { label: 'Fair', value: 'Fair' },
        { label: 'Average', value: 'Average' },
        { label: 'Good', value: 'Good' },
        { label: 'Excellent', value: 'Excellent' },
      ],
    },
    question__answer_required_flag: false,
    pageDisplayed: 1,
  },
  {
    question__question_ordinal: 2,
    question__title:
      '2. How likely is it that you would recommend the SBA to a friend or colleague?',
    question__question_type__name: 'radio-horizontal',
    question__name: 'recommendSBA',
    question__answer_choice: {
      options: [
        { label: 'Not at all', value: 'Probably Not' },
        { label: 'Probably Not', value: 'Probably Not' },
        { label: 'Somewhat', value: 'Somewhat' },
        { label: 'Probably', value: 'Probably' },
        { label: 'Extremely', value: 'Extremely' },
      ],
    },
    question__answer_required_flag: false,
    pageDisplayed: 2,
  },
  {
    question__question_ordinal: 3,
    question__title:
      '3. Thinking of your overall experience today, How would you rate the following:',
    question__question_type__name: 'table',
    question__name: 'rateExperienceTable',
    question__answer_choice: {
      table: {
        header: [
          'Strongly Disagree',
          'Disagree',
          'Neutral',
          'Agree',
          'Strongly Agree',
        ],
        body: [
          {
            question:
              'I trust the SBA to fulfill our country\'s commitment to small businesses.',
            question__name: 'sbaCommitment',
          },
          {
            question: 'My need was addressed.',
            question__name: 'needAddressed',
          },
          {
            question: 'It was easy to complete what I needed to do.',
            question__name: 'easyToComplete',
          },
          {
            question:
              'It took a reasonable amount of time to complete what I needed to do.',
            question__name: 'reasonableToComplete',
          },
          {
            question:
              'I understand what was being asked of me throughout the whole process.',
            question__name: 'understandTheAsk',
          },
        ],
      },
    },
    question__answer_required_flag: false,
    pageDisplayed: 2,
  },
  {
    question__question_ordinal: 4,
    question__title:
      '4. Which of the following best describes your stage in the certification process?',
    question__question_type__name: 'radio',
    question__name: 'stageCertification',
    question__answer_choice: {
      options: [
        {
          label: 'I just submitted an application to become certified',
          value: 1,
        },
        {
          label:
            'I just received an application from SBA asking for more information',
          value: 2,
        },
        {
          label:
            'I just received a decision on my application (approval/decline)',
          value: 3,
        },
        { label: 'I just received an annual review application', value: 4 },
        { label: 'Other (please specify)', value: 5 },
      ],
    },
    question__answer_required_flag: false,
    pageDisplayed: 3,
  },
  {
    question__question_ordinal: 5,
    question__title:
      '5. Thinking about the new UCP system that you used today, please rate your agreement with the following:',
    question__question_type__name: 'table',
    question__name: 'rateNewUCPTable',
    question__answer_choice: {
      table: {
        header: [
          'Strongly Disagree',
          'Disagree',
          'Neutral',
          'Agree',
          'Strongly Agree',
          'N/A',
        ],
        body: [
          {
            question:
              'The system has the functions and capabilities I expect it to have.',
            question__name: 'systemExpectations',
          },
          {
            question: 'It was easy to learn to use this system.',
            question__name: 'easyToLearn',
          },
          {
            question:
              'The organization of information on the system screens was clear.',
            question__name: 'clearScreenOrganization',
          },
          {
            question:
              'The system gave clear error messages that clearly told me how to fix the problem.',
            question__name: 'clearErrorMessages',
          },
          {
            question:
              'The information (such as online help, on-screen messages and the Knowledge Base) provided with this system was clear.',
            question__name: 'clearInformation',
          },
          {
            question:
              'It was easy to find the information I needed on the certification system.',
            question__name: 'easyToFind',
          },
        ],
      },
    },
    question__answer_required_flag: false,
    pageDisplayed: 4,
  },
  {
    question__question_ordinal: 6,
    question__title: '6. What can we do to improve your experience?',
    question__question_type__name: 'textarea',
    question__name: 'improveExperience',
    question__answer_required_flag: false,
    pageDisplayed: 5,
  },
  {
    question__question_ordinal: 7,
    question__title:
      '7. We would like to gather some demographic information to help us ensure we are providing a great customer experience for all of our customers. This information is voluntary and you may choose not to answer any question. Would you be willing to provide your demographic information?',
    question__question_type__name: 'radio',
    question__name: 'demographicInfo',
    question__answer_choice: {
      options: [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
      ],
    },
    question__answer_required_flag: false,
    pageDisplayed: 6,
  },
  {
    question__question_ordinal: 8,
    question__title: '8. What is your age?',
    question__question_type__name: 'radio',
    question__name: 'age',
    question__answer_choice: {
      options: [
        { label: 'Under 25', value: 'Under 25' },
        { label: '25-34', value: '25-34' },
        { label: '35-44', value: '35-44' },
        { label: '45-54', value: '45-54' },
        { label: '65+', value: '65+' },
        { label: 'Prefer not to answer', value: 'Prefer not to answer' },
      ],
    },
    question__answer_required_flag: false,
    pageDisplayed: 7,
  },
  {
    question__question_ordinal: 9,
    question__title: '9. What is your gender?',
    question__question_type__name: 'radio',
    question__name: 'gender',
    question__answer_choice: {
      options: [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Non-binary', value: 'Non-binary' },
        { label: 'Prefer not to answer', value: 'Prefer not to answer' },
        {
          label: 'Prefer to self describe (please specify)',
          value: 'Prefer to self describe',
        },
      ],
    },
    question__answer_required_flag: false,
    pageDisplayed: 7,
  },
  {
    question__question_ordinal: 10,
    question__title:
      '10. What is your veteran or military status? (You may select one or more options)',
    question__question_type__name: 'checkbox',
    question__name: 'militaryStatus',
    question__answer_choice: {
      options: [
        {
          label: 'Active Duty, Reserve Guard, or Military Member',
          value: 'Active Duty, Reserve Guard, or Military Member',
        },
        { label: 'Veteran', value: 'Veteran' },
        {
          label:
            'Spouse of Veteran, or Active Duty, Reserve Guard, or Military Member',
          value:
            'Spouse of Veteran, or Active Duty, Reserve Guard, or Military Member',
        },
        {
          label: 'Service-Disabled Veteran',
          value: 'Service-Disabled Veteran',
        },
        {
          label:
            'I am not a Veteran of the U.S. military nor an Active Duty, Reserve Guard, or Military Member',
          value:
            'I am not a Veteran of the U.S. military nor an Active Duty, Reserve Guard, or Military Member',
        },
        {
          label: 'Prefer not to answer',
          value: 'Prefer not to answer',
        },
      ],
    },
    question__answer_required_flag: false,
    pageDisplayed: 7,
  },
  {
    question__question_ordinal: 11,
    question__title:
      '11. What is your race? (You may select one or more options)',
    question__question_type__name: 'checkbox',
    question__name: 'race',
    question__answer_choice: {
      options: [
        {
          label: 'American Indian or Alaskan Native',
          value: 'American Indian or Alaskan Native',
        },
        { label: 'Asian', value: 'Asian' },
        {
          label: 'Black or African American',
          value: 'Black or African American',
        },
        {
          label: 'Native Hawaiian or Pacific Islander',
          value: 'Native Hawaiian or Pacific Islander',
        },
        {
          label: 'White',
          value: 'White',
        },
        {
          label: 'Other (please specify)',
          value: 'Other',
        },
      ],
    },
    question__answer_required_flag: false,
    pageDisplayed: 7,
  },
  {
    question__question_ordinal: 12,
    question__title: '12. Are you of Hispanic or Latino descent.',
    question__question_type__name: 'radio',
    question__name: 'latino',
    question__answer_choice: {
      options: [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
        { label: 'Prefer not to answer', value: 'Prefer not to answer' },
      ],
    },
    question__answer_required_flag: false,
    pageDisplayed: 7,
  },
  {
    question__question_ordinal: 13,
    question__title: '13. Do you identify as an individual with a disability?',
    question__question_type__name: 'radio',
    question__name: 'disability',
    question__answer_choice: {
      options: [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
        { label: 'Prefer not to answer', value: 'Prefer not to answer' },
      ],
    },
    question__answer_required_flag: false,
    pageDisplayed: 7,
  },
  {
    question__question_ordinal: 14,
    question__title:
      '14. In what zip code is your business located? (Optional)',
    question__question_type__name: 'text',
    question__name: 'zip',
    question__answer_required_flag: false,
    pageDisplayed: 7,
  },
]
