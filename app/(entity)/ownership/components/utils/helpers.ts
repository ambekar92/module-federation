import { OwnerType } from './types'

export const getTotalOwnershipPercentage = (owners: OwnerType[]): number => {
  return owners.reduce((total, owner) => total + owner.ownershipPercentage, 0)
}
