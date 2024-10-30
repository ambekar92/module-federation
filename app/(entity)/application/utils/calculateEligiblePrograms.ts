import { sbaProgramOptions } from '@/app/constants/sba-programs';

export function calculateOwnerEligibility(owner: {
  gender: string;
  veteranStatus: string;
  socialDisadvantages: string[];
}, applicationPrograms: number[]): boolean {
  const disadvantages = [...owner.socialDisadvantages];

  if(disadvantages.includes('Not Claiming Social Disadvantage') && applicationPrograms.length === 1 && applicationPrograms[0] === 1) {
    return false;
  }

  if (owner.gender === 'F' && !disadvantages.includes('female')) {
    disadvantages.push('female');
  }

  if (owner.veteranStatus === 'Veteran' && !disadvantages.includes('veteran')) {
    disadvantages.push('veteran');
  }

  if (owner.veteranStatus === 'Service Disabled Veteran' && !disadvantages.includes('disabledVeteran')) {
    disadvantages.push('disabledVeteran');
  }

  const mappedDisadvantages = disadvantages.flatMap(disadvantage => {
    switch (disadvantage) {
      case 'Black American': return ['race', 'black_american', 'minority'];
      case 'Hispanic American': return ['race', 'hispanic_american', 'minority'];
      case 'Native American': return ['race', 'native_american', 'minority'];
      case 'Asian Pacific American': return ['race', 'asian_pacific_american', 'minority'];
      case 'Race': return ['race', 'minority'];
      case 'Ethnic Origin': return ['ethnic_origin'];
      case 'Gender': return ['gender', 'woman', 'female'];
      case 'Long term residence in an environment isolated from mainstream of American society.': return ['long_term_isolated_residence'];
      default: return disadvantage.toLowerCase();
    }
  });

  if(applicationPrograms.length === 0) {
    return false;
  }

  // if(applicationPrograms.includes(2)) {
  //   return true;
  // }

  return sbaProgramOptions.filter(program => applicationPrograms.includes(program.id)).some(program =>
    program.disadvantages.some(disadvantage => mappedDisadvantages.includes(disadvantage))
  );
}
