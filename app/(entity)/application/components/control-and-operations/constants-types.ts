import { Operator } from './schema';

export const defaultValues: Operator = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  position: '',
  principalType: null as unknown as PrincipalType,
  licenseHolder: null as unknown as any,
  middleName: ''
}

export enum PrincipalType {
    Partner = 'Partner',
    Member = 'Member',
    Officer = 'Officer',
    Board_Member = 'Board Member',
    Board_Director = 'Board Director',
    Other = 'Other',
}

export enum Prefix {
    Mr = 'Mr',
    Mrs = 'Mrs',
    Ms = 'Ms',
}

export enum Suffix {
    Jr = 'Jr',
    Sr = 'Sr',
    I = 'I',
    II = 'II',
    III = 'III',

}

export enum YesNo {
    Yes = 'Yes',
    No = 'No',
}
