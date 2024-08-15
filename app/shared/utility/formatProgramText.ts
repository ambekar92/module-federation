const specialCases: { [key: string]: string } = {
  'eight a': '8(a)',
  'eight_a': '8(a)',
  'hubzone': 'HUBZone',
  'edwosb': 'EDWOSB',
  'ed_wosb': 'EDWOSB',
  'sd vosb': 'SDVOSB',
  'sd_vosb': 'SDVOSB',
  'sdvosb': 'SDVOSB',
  'wosb': 'WOSB',
  'mpp': 'MPP',
  'vosb': 'VOSB',
  'vet_cert': 'VOSB'
};

export function formatProgramText(text: string): string {
  let formattedText = text.toLowerCase();

  Object.entries(specialCases).forEach(([key, value]) => {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    formattedText = formattedText.replace(regex, value);
  });

  return formattedText.split(' ').map(word =>
    Object.values(specialCases).includes(word)
      ? word
      : word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}
