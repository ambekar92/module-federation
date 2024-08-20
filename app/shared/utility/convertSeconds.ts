export function convertSeconds(seconds: number): string {
  const secondsPerMinute = 60;
  const secondsPerHour = 3600;
  const secondsPerDay = 86400;
  const secondsPerWeek = 604800;

  const weeks = Math.floor(seconds / secondsPerWeek);
  seconds %= secondsPerWeek;

  const days = Math.floor(seconds / secondsPerDay);
  seconds %= secondsPerDay;

  const hours = Math.floor(seconds / secondsPerHour);
  seconds %= secondsPerHour;

  const minutes = Math.floor(seconds / secondsPerMinute);
  seconds %= secondsPerMinute;

  let result = '';
  if (weeks > 0) {result += `${weeks} week${weeks > 1 ? 's' : ''} `;}
  if (days > 0) {result += `${days} day${days > 1 ? 's' : ''} `;}
  if (hours > 0) {result += `${hours} hour${hours > 1 ? 's' : ''} `;}
  if (minutes > 0) {result += `${minutes} minute${minutes > 1 ? 's' : ''} `;}
  if (seconds > 0) {result += `${seconds} second${seconds > 1 ? 's' : ''}`;}

  return result.trim();
}

export function calculateTimeDifference(openedDate: string, closedDate: string): string {
  const opened = new Date(openedDate);
  const closed = new Date(closedDate);
  const differenceInSeconds = Math.floor((closed.getTime() - opened.getTime()) / 1000);
  return convertSeconds(differenceInSeconds);
}
