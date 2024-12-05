/// Capitalize the first letter of string
export function capitalize(str: string | undefined) {
  if (!str) return "";

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getHostUrl(){
  const url: string = window.location.host;
  return url;
}
