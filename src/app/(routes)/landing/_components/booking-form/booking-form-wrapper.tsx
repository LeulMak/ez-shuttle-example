import { BookingInfoForm } from "~/app/_components/forms/booking-info-form";
import { Button } from "~/app/_components/ui/button";
import type { Quote } from "~/app/_core/models/quote/quote";
import { type FormEvent, useEffect, useState } from "react";
import type { Place } from "~/app/_core/models/place/place";
import { api } from "~/trpc/react";
import { BookingSteps } from "~/app/_core/enums/booking-steps";
import toast from "react-hot-toast";
import { getValidVehicleTypeId } from "~/app/_core/services/place-service";
import { VehicleChoice } from "./vehicle-choice";
import { Vehicle } from "~/app/_core/models/vehicles/vehicles";

export const BookingForm = () => {
  const [bookingStep, setBookingStep] = useState<BookingSteps>(
    BookingSteps.Info,
  );

  const [pickupAddress, setPickupAddress] = useState<Place | null>(null);
  const [dropoffAddress, setDropoffAddress] = useState<Place | null>(null);
  const [pickupDate, setPickupDate] = useState<string>("");
  const [pickupTime, setPickupTime] = useState<string>("");
  const [includeBabySeat, setIncludeBabySeat] = useState<boolean>(false);
  const [includeTrailer, setIncludeTrailer] = useState<boolean>(false);

  const {
    data: pickupEzPlaceId,
    isLoading: pickupEzPlaceIdLoading,
    refetch: getPickUpEzPlaceId,
  } = api.place.getEZPlaceId.useQuery(
    { googlePlaceId: pickupAddress?.googlePlaceId ?? "" },
    { enabled: false },
  );

  const {
    data: dropoffEzPlaceId,
    isLoading: dropoffEzPlaceIdLoading,
    refetch: getDropoffEzPlaceId,
  } = api.place.getEZPlaceId.useQuery(
    { googlePlaceId: dropoffAddress?.googlePlaceId ?? "" },
    { enabled: false },
  );

  const pickUpDateTime = new Date(`${pickupDate}T${pickupTime}`);

  const quoteRequest: Quote = {
    pickupPlaceId: pickupEzPlaceId ?? "",
    dropOffPlaceId: dropoffEzPlaceId ?? "",
    day: pickUpDateTime.getDay().toString(),
    month: pickUpDateTime.getMonth().toString(),
    year: pickUpDateTime.getFullYear().toString(),
    hour: pickUpDateTime.getHours().toString(),
    minute: pickUpDateTime.getMinutes().toString(),
    vehicleTypeIdCsvList: getValidVehicleTypeId(1, false),
    includeBabySeat: includeBabySeat.toString(),
    includeTrailer: includeTrailer.toString(),
    isInternational: "false",
  };

  const {
    data: vehicles,
    isLoading: getQuoteLoading,
    refetch: getQuote,
    isSuccess,
  } = api.quote.getQuote.useQuery(
    {
      quoteRequest,
    },
    { enabled: false },
  );

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await Promise.all([getPickUpEzPlaceId(), getDropoffEzPlaceId()]);
      void getQuote();
    } catch (_) {
      toast.error("Unable to get quote at the moment. Please try again");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setBookingStep(BookingSteps.Vehicle);
    }
  }, [isSuccess]);

  return (
    <form
      className="flex flex-grow flex-col rounded-b-md bg-white"
      onSubmit={handleOnSubmit}
    >
      <div className="flex h-1.5 flex-grow flex-col overflow-y-scroll">
        {bookingStep === BookingSteps.Info ? (
          <BookingInfoForm
            pickupAddress={pickupAddress}
            setPickupAddress={setPickupAddress}
            dropoffAddress={dropoffAddress}
            setDropoffAddress={setDropoffAddress}
            pickupDate={pickupDate}
            setPickupDate={setPickupDate}
            pickupTime={pickupTime}
            setPickupTime={setPickupTime}
            includeBabySeat={includeBabySeat}
            setIncludeBabySeat={setIncludeBabySeat}
            includeTrailer={includeTrailer}
            setIncludeTrailer={setIncludeTrailer}
          />
        ) : bookingStep === BookingSteps.Vehicle ? (
          <VehicleChoice quoteVehicles={vehicles ?? []} />
        ) : null}
      </div>
      <div className="h-[80px] p-[16px] shadow-sm">
        {bookingStep === BookingSteps.Info ? (
          <Button
            isLoading={
              getQuoteLoading ||
              dropoffEzPlaceIdLoading ||
              pickupEzPlaceIdLoading
            }
          >
            Get Instant Quote
          </Button>
        ) : bookingStep === BookingSteps.Vehicle ? (
          <Button>Confirm</Button>
        ) : null}
      </div>
    </form>
  );
};
