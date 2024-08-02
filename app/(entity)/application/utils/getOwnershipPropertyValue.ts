export function getOwnershipPropertyValue(row: any, prefix: string): string {
  const suffixes = ['partnership', 'llc', 'corporation', 'sole_proprietorship'];
  for (const suffix of suffixes) {
    const key = `${prefix}_${suffix}`;
    if (row[key]) {return row[key];}
  }
  return '';
}
