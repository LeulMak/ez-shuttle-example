import { AUTO_COMPLETE_PARAM_TYPES } from "../constants/string-constants";
import type { AutoCompleteParams, EZPlaceParams } from "../models/place/place";
import { Quote } from "../models/quote/quote";

export function getAutoCompleteParams(term: string, isLocal: boolean): string {
  const queryParams: AutoCompleteParams = {
    querytext: term,
    partnerKey: "adhoc_app",
    SessionId: Date.now().toString(),
    types: AUTO_COMPLETE_PARAM_TYPES,
  };

  if (isLocal) {
    queryParams.restrictCountry = "ZA";
  }

  return new URLSearchParams(queryParams).toString();
}

export function getEZPlaceParams(googlePlaceId: string): string {
  const queryParams: EZPlaceParams = {
    googlePlaceID: googlePlaceId,
    sessionId: Date.now().toString(),
  };

  return new URLSearchParams(queryParams).toString();
}

export function getQuoteQueryParams(quote: Quote): string {
  return new URLSearchParams(quote).toString();
}

export function getValidVehicleTypeId(
  selectedGuests: number,
  isInternational: boolean,
): string {
  if (!isInternational) {
    if (selectedGuests <= 3) {
      return "1,2,3,4";
    } else if (selectedGuests <= 9) {
      return "3,4";
    } else if (selectedGuests <= 13) {
      return "4";
    }
  }

  /// As we are currently working only for local
  return "5";
}
