import Cookies from 'js-cookie';

export function getArrayCookie<T>(key: string): T[] {
  const cookieValue = Cookies.get(key);
  return cookieValue ? JSON.parse(cookieValue) : [];
}

export function setArrayCookie<T>(key: string, value: T[]): void {
  Cookies.set(key, JSON.stringify(value), { expires: 7 }); // Expires in 7 days
}

export function addToArrayCookie<T>(key: string, newItem: T): void {
  const existingArray = getArrayCookie<T>(key);
  if (!existingArray.includes(newItem)) {
    const updatedArray = [...existingArray, newItem];
    setArrayCookie(key, updatedArray);
  }
}
