import { Fieldset, Label, RequiredMarker, Select, TextInput } from '@trussworks/react-uswds';
import { QaInputProps } from './types';
import { USA_STATES } from '@/app/constants/usa-states';

export const AddressInput = ({ question, inputId, handleChange, isSubQuestion, selectedAnswers }: QaInputProps) => {
  const currentValue = selectedAnswers[question.name]?.value !== undefined
    ? selectedAnswers[question.name].value
    : question.answer?.value?.answer || {};

  const handleAddressChange = (field: string, value: string) => {
    const newAddress = { ...currentValue, [field]: value };
    handleChange(question, newAddress);
  };

  return (
    <div className={isSubQuestion ? 'padding-left-3' : ''}>
      <Fieldset>
        <Label className='maxw-full text-bold' requiredMarker={question.answer_required_flag} htmlFor={question.name}>
          <span>{question.title}</span>
        </Label>
        <p>
          Required fields are marked with an asterisk (<RequiredMarker />
          ).
        </p>
        <Label htmlFor={`mailing-address-${question.name}`} requiredMarker={question.answer_required_flag}>Street address</Label>
        <TextInput
          id={`mailing-address-${question.name}`}
          name={`mailing-address-${question.name}`}
          type="text"
          value={currentValue.street || ''}
          onChange={(e) => handleAddressChange('street', e.target.value)}
        />

        <Label htmlFor={`mailing-address-2-${question.name}`}>Street address line 2</Label>
        <TextInput
          id={`mailing-address-2-${question.name}`}
          name={`mailing-address-2-${question.name}`}
          type="text"
          value={currentValue.street2 || ''}
          onChange={(e) => handleAddressChange('street2', e.target.value)}
        />

        <Label htmlFor={`mailing-city-${question.name}`} requiredMarker={question.answer_required_flag}>
          City
        </Label>
        <TextInput
          id={`mailing-city-${question.name}`}
          name={`mailing-city-${question.name}`}
          type="text"
          required
          value={currentValue.city || ''}
          onChange={(e) => handleAddressChange('city', e.target.value)}
        />

        <Label htmlFor="state" requiredMarker={question.answer_required_flag}>
          State, territory, or military post
        </Label>

        <Select
          id="state"
          name="state"
          required
          value={currentValue.state || ''}
          onChange={(e) => handleAddressChange('state', e.target.value)}
        >
          {USA_STATES.map((state, index) => (
            <option key={index} value={state.value}>{state.label}</option>
          ))}
        </Select>

        <Label htmlFor="zip" requiredMarker={question.answer_required_flag}>ZIP Code</Label>
        <TextInput
          id="zip"
          name="zip"
          type="text"
          inputSize="medium"
          pattern="[\d]{5}(-[\d]{4})?"
          value={currentValue.zip || ''}
          onChange={(e) => handleAddressChange('zip', e.target.value)}
        />

        <Label htmlFor={`urbanization-${question.name}`}>Urbanization (Puerto Rico only)</Label>
        <TextInput
          id={`urbanization-${question.name}`}
          name={`urbanization-${question.name}`}
          type="text"
          value={currentValue.urbanization || ''}
          onChange={(e) => handleAddressChange('urbanization', e.target.value)}
        />
      </Fieldset>
    </div>
  );
};
