/// Checks if an array is empty or not
export function isArrayEmpty<T>(array: T[] | null | undefined): boolean{
  if(!array) return true;
  return Array.isArray(array) && array.length === 0;
}