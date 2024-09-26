export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString();
}

export const makeDatePretty = (isoString: string) => {
  const date = new Date(isoString)
  return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`
}
