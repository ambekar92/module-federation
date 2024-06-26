import React from 'react';

interface InputHelperTextProps {
  hasError: boolean;
  text: string;
}

const InputHelperText: React.FC<InputHelperTextProps> = ({ hasError, text }) => (
  <div className={'margin-top-1 usa-input-helper-text'}>
    <span className={hasError ? 'text-secondary' : ''}>
      {text}
    </span>
  </div>
);

export default InputHelperText

// For text inputs pair with
// className={errors[key] ? 'icon' : ''} as seen in app/(entity)/claim-your-business/components/forms/CMBInputs.tsx
