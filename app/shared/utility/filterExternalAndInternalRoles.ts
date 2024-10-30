import { Role } from '../types/role';

export const filterExternalAndInternalRoles = (roles: string[]): Role[] => {
  return roles.filter((role) => role !== Role.INTERNAL && role !== Role.EXTERNAL) as Role[];
}
