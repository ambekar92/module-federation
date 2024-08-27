import { ShouldIApplyFormType } from '../schema';

export function determineCompleteness(form: 'ownership' | 'match' | 'readiness' | 'eligibility' | 'results', values: ShouldIApplyFormType):boolean {
  switch(form) {
    case 'ownership':
      return !!values.ownership?.USCitizen && !!values.ownership.gender && !!values.ownership.ownOver50Percent && !!values.ownership.socialDisadvantage && !!values.ownership.veteran;

    case 'readiness':
      return !!values.readiness?.coverCost && !!values.readiness?.coverCost && !!values.readiness?.coverCost && !!values.readiness?.coverCost;
    case 'eligibility':
      return !!values.eligibility?.businessLocation && !!values.eligibility.businessRegisteredInSAM && !!values.eligibility.employeesResideInHubZone && !!values.eligibility.ownBusinessInUS && !!values.eligibility.ownBusinessInUS && !!values.eligibility.provideAnnualFinancialStatement && !!values.eligibility.suspended && !!values.eligibility.underFinancialLimits;
    case 'results':
      return !!values.readiness?.coverCost && !!values.readiness.electronicPayments && !!values.readiness.isGeneratingRevenue && !!values.readiness.recordOfQualityGoods;
    case 'match':
      return !!values.match?.naics_code;
    default:
      return false;
  }
}
