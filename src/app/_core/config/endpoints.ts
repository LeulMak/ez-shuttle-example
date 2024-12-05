/// Non-parameter endpoints

/// Parameter based endpoints
export const getAutoCompleteLocationEndpoint = (params: string) =>
  `/locationfinder/api/AutoComplete?${params}`;
export const getEZPlaceIdEndpoint = (params: string) =>
  `/locationfinder/api/GooglePlaceIdLookup?${params}`;
export const getQuoteEndpoint = (params: string) =>
  `/quote/api/Quote?${params}`;
