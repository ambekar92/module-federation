import React from 'react';

interface InputHelperTextProps {
  hasError: boolean;
  text: string;
}

const InputHelperText: React.FC<InputHelperTextProps> = ({ hasError, text }) => (
  <div className={'margin-top-1 usa-input-helper-text'}>
    <span className={hasError ? 'text-secondary-dark' : ''}>
      {text}
    </span>
  </div>
);

export default InputHelperText

// Usage can be found in app/(entity)/claim-your-business/components/forms/CMBInputs.tsx
