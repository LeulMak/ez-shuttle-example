export const getBasicAuth = (): string => {
  const username: string | undefined = process.env.ADHOC_USERNAME;
  const password: string | undefined = process.env.ADHOC_PASSWORD;

  if(!username || !password) return '';

  const encodedAuth: string = btoa(username + ":" + password);

  return `Basic ${encodedAuth}`;
}