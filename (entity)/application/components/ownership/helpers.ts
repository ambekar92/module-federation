import { SocialDisadvantageOption } from "./shared/types";


export const socialDisadvantages: SocialDisadvantageOption[] = [
  { label: 'Not Claiming Social Disadvantage', value: 'not_claiming' },
  { label: 'Black American', value: 'black_american' },
  { label: 'Hispanic American', value: 'hispanic_american' },
  { label: 'Native American', value: 'native_american' },
  { label: 'Asian Pacific American', value: 'asian_pacific_american' },
  { label: 'Race', value: 'race' },
  { label: 'Religion', value: 'religion' },
  { label: 'Ethnic Origin', value: 'ethnic_origin' },
  { label: 'Gender', value: 'gender' },
  { label: 'Sexual Orientation', value: 'sexual_orientation' },
  { label: 'Identifiable Disability', value: 'identifiable_disability' },
  {
		 label: 'Long term residence in an environment isolated from mainstream of American society',
		 value: 'long_term_isolated_residence'
  }
]

export const capitalizeAndSplit = (text: string) => {
  if(text === 'service_disabled_veteran') {
    return 'Service-Disabled Veteran'
  }
  return text.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
};

export const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = phoneNumber.replace(/\D/g, '').slice(0, 10); // Restrict to 10 digits
  const length = cleaned.length;

  if (length < 4) {
    return cleaned;
  } else if (length < 7) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  } else {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
};

export const formatSSN = (ssn: string) => {
  if (!ssn) return ssn;
  const cleaned = ssn.replace(/\D/g, ''); // Remove all non-digits
  const length = cleaned.length;

  if (length < 4) {
    return cleaned;
  } else if (length < 6) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  } else if (length <= 9) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5)}`;
  } else {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5, 9)}`;
  }
};
