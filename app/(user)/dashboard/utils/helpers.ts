export function daysFromNow(dateNumber: number): number {
  const year = Math.floor(dateNumber / 10000);
  const month = Math.floor((dateNumber % 10000) / 100) - 1; // Months are 0-indexed
  const day = dateNumber % 100;

  const givenDate = new Date(year, month, day);
  const now = new Date();

  givenDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffMs = now.getTime() - givenDate.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return Math.max(0, days);
}

export function formatDateFromNumber(dateNumber: string): string {
  const dateNumberInt = parseInt(dateNumber)
  const year = Math.floor(dateNumberInt / 10000);
  const month = Math.floor((dateNumberInt % 10000) / 100);
  const day = dateNumberInt % 100;

  const paddedMonth = month.toString().padStart(2, '0');
  const paddedDay = day.toString().padStart(2, '0');

  return `${paddedMonth}/${paddedDay}/${year}`;
}

export function calculateApplicationExpirationDate(dateString: string, returnDate?: boolean): number | string {
  const givenDate = new Date(dateString);
  const today = new Date();
  // The difference in ms (Idk why python uses ms)
  const differenceMs = today.getTime() - givenDate.getTime();
  // ms -> days
  const daysDifference = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

  const daysToExpire = 120 - daysDifference;
  if(!returnDate) {return daysToExpire};

  // Creating new date from calculated date
  const resultDate = new Date(today.getTime() + daysToExpire * 24 * 60 * 60 * 1000);

  // cleaning date format
  const cleanDate = resultDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });

  return cleanDate
}

export const humanizeText = (state: string): string => {
  return state
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
