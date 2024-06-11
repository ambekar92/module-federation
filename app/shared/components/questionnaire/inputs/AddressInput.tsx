import { Fieldset, Label, RequiredMarker, Select, TextInput } from '@trussworks/react-uswds';
import { QaInputProps } from '../utils/types';
import { USA_STATES } from '@/app/constants/usa-states';

export const AddressInput = ({ question, inputId, handleChange, isSubQuestion }: QaInputProps) => (
  <div className={isSubQuestion ? 'padding-left-3' : ''}>
    <Fieldset onChange={() => handleChange}>
      <Label className='maxw-full' requiredMarker={question.answer_required_flag} htmlFor={inputId}>
        <span>{question.title}</span>
      </Label>
      <p>
        Required fields are marked with an asterisk (<RequiredMarker />
        ).
      </p>
      <Label htmlFor={`mailing-address-${inputId}`} requiredMarker={question.answer_required_flag}>Street address</Label>
      <TextInput id={`mailing-address-${inputId}`} name={`mailing-address-${question.name}`} type="text" />

      <Label htmlFor={`mailing-address-2-${inputId}`}>Street address line 2</Label>
      <TextInput id={`mailing-address-2-${inputId}`} name={`mailing-address-2-${question.name}`} type="text" />

      <Label htmlFor={`mailing-city-${inputId}`} requiredMarker={question.answer_required_flag}>
        City
      </Label>
      <TextInput id={`mailing-city-${inputId}`} name={`mailing-city-${question.name}`} type="text" required />

      <Label htmlFor="state" requiredMarker={question.answer_required_flag}>
        State, territory, or military post
      </Label>

      <Select id="state" name="state" className='height-7 radius-lg' required>
        {USA_STATES.map((state, index) => (
          <option key={index} value={state.value}>{state.label}</option>
        ))}
      </Select>

      <Label htmlFor="zip" requiredMarker={question.answer_required_flag}>ZIP Code</Label>
      <TextInput id="zip" name="zip" type="text" inputSize="medium" pattern="[\d]{5}(-[\d]{4})?" />

      <Label htmlFor={`urbanization-${inputId}`}>Urbanization (Puerto Rico only)</Label>
      <TextInput id={`urbanization-${inputId}`} name={`urbanization-${question.name}`} type="text" />
    </Fieldset>
  </div>
);
