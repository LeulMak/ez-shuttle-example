import { ArrowDownRight, ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { api } from "~/trpc/react";
import type { Place } from "~/app/_core/models/place/place";
import { AddressType } from "~/app/_core/enums/address-type";

type BookingInfoFormProps = {
  pickupAddress: Place | null;
  setPickupAddress: Dispatch<SetStateAction<Place | null>>;
  dropoffAddress: Place | null;
  setDropoffAddress: Dispatch<SetStateAction<Place | null>>;
  pickupDate: string | null;
  setPickupDate: Dispatch<SetStateAction<string>>;
  pickupTime: string | null;
  setPickupTime: Dispatch<SetStateAction<string>>;
  includeBabySeat: boolean | null;
  setIncludeBabySeat: Dispatch<SetStateAction<boolean>>;
  includeTrailer: boolean | null;
  setIncludeTrailer: Dispatch<SetStateAction<boolean>>;
};

export const BookingInfoForm = (props: BookingInfoFormProps) => {
  const {
    setPickupAddress,
    setDropoffAddress,
    pickupDate,
    setPickupDate,
    pickupTime,
    setPickupTime,
    includeBabySeat,
    setIncludeBabySeat,
    includeTrailer,
    setIncludeTrailer,
  } = props;

  const [pickupAddressTerm, setPickupAddressTerm] = useState<string | null>("");
  const [isPickupAddressTyping, setIsPickupAddressTyping] =
    useState<boolean>(false);

  const [dropoffAddressTerm, setDropoffAddressTerm] = useState<string | null>(
    "",
  );
  const [isDropoffAddressTyping, setIsDropoffAddressTyping] =
    useState<boolean>(false);

  const {
    data: pickupAutocompleteData,
    isLoading: isPickupAutocompleteLoading,
    refetch: fetchPickupAutocompleteAddress,
  } = api.place.getAutoCompleteLocation.useQuery(
    { term: pickupAddressTerm ?? "", isLocal: true },
    { enabled: false },
  );

  const {
    data: dropOffAutocompleteData,
    isLoading: isDropOffAutocompleteLoading,
    refetch: fetchDropOffAutocompleteAddress,
  } = api.place.getAutoCompleteLocation.useQuery(
    { term: dropoffAddressTerm ?? "", isLocal: true },
    { enabled: false },
  );

  const handleAddressOnChange = async (
    e: ChangeEvent<HTMLInputElement>,
    type: AddressType,
  ) => {
    const address: string | null = e.target.value;
    if (type === AddressType.PickupAddress) {
      await handlePickupAddressChange(address);
    } else {
      await handleDropoffAddressChange(address);
    }
  };

  const handlePickupAddressChange = async (address: string | null) => {
    if (!address) {
      setIsPickupAddressTyping(false);
      setPickupAddressTerm(address);
      return;
    }

    if (address.length <= 3) {
      setIsPickupAddressTyping(false);
      setPickupAddressTerm(address);
      return;
    }

    setPickupAddressTerm(address);
    setIsPickupAddressTyping(true);
    await fetchPickupAutocompleteAddress();
  };

  const handleDropoffAddressChange = async (address: string | null) => {
    if (!address) {
      setIsDropoffAddressTyping(false);
      setDropoffAddressTerm(address);
      return;
    }

    if (address.length <= 3) {
      setIsDropoffAddressTyping(false);
      setDropoffAddressTerm(address);
      return;
    }

    setIsDropoffAddressTyping(true);
    setDropoffAddressTerm(address);
    await fetchDropOffAutocompleteAddress();
  };

  const handlePickupAddressTap = (place: Place) => {
    setPickupAddress(place);
    setPickupAddressTerm(place.displayName ?? "");
    setIsPickupAddressTyping(false);
  };

  const handleDropOffAddressTap = (place: Place) => {
    setDropoffAddress(place);
    setDropoffAddressTerm(place.displayName ?? "");
    setIsDropoffAddressTyping(false);
  };

  return (
    <div className="flex flex-col px-5 py-5">
      <div>
        <p className="text-[14px] font-semibold text-accent">Ride details</p>
        <div className="relative mb-3 mt-3">
          <Input
            placeholder="Pickup address"
            className="rounded-t-md font-semibold text-accent"
            isAutoComplete={true}
            value={pickupAddressTerm ?? ""}
            onChange={async (e) => {
              await handleAddressOnChange(e, AddressType.PickupAddress);
            }}
            isAutoCompleteStarts={isPickupAddressTyping}
            isAutoCompleteLoading={isPickupAutocompleteLoading}
            data={pickupAutocompleteData}
            onPlaceTap={(place) => handlePickupAddressTap(place)}
            inputLeftElement=<ArrowUpRight strokeWidth={1.5} />
          />
          <Input
            placeholder="Dropoff address"
            className="mt-2 rounded-b-md font-semibold text-accent"
            isAutoComplete={true}
            value={dropoffAddressTerm ?? ""}
            onChange={async (e) => {
              await handleAddressOnChange(e, AddressType.DropoffAddress);
            }}
            isAutoCompleteStarts={isDropoffAddressTyping}
            isAutoCompleteLoading={isDropOffAutocompleteLoading}
            data={dropOffAutocompleteData}
            onPlaceTap={(place) => handleDropOffAddressTap(place)}
            inputLeftElement=<ArrowDownRight />
          />
        </div>
      </div>
      <hr />
      <div className="mt-3">
        <p className="text-[14px] font-semibold text-accent">Date & Time</p>
        <div className="mt-2 flex w-full flex-row justify-between gap-3">
          <Input
            placeholder="Date"
            className="mt-2 w-full rounded-md rounded-b-md font-semibold text-accent"
            type="date"
            value={pickupDate ?? ""}
            onChange={(e) => setPickupDate(e.target.value)}
            inputLeftElement=<Calendar strokeWidth={1.5} />
          />
          <Input
            placeholder="Time"
            className="mt-2 w-full rounded-md rounded-b-md font-semibold text-accent"
            type="time"
            value={pickupTime ?? ""}
            onChange={(e) => setPickupTime(e.target.value)}
            inputLeftElement=<Clock strokeWidth={1.5} />
          />
        </div>
        <div className="mb-3 mt-2 flex w-full flex-row items-center justify-between rounded-md bg-whiteExt1 p-[12px]">
          <p className="text-[12px] font-semibold text-accent">
            Add return trip
          </p>
          <Switch />
        </div>
        <hr />
        <div className="mt-3">
          <p className="text-[14px] font-semibold text-accent">
            Additional Request
          </p>
          <div className="mb-2 mt-2 flex flex-row gap-3">
            <div className="flex w-full flex-row items-center gap-2 rounded-md bg-whiteExt1 p-[12px]">
              <Checkbox
                value={includeBabySeat?.toString() ?? "false"}
                onChange={(_) => setIncludeBabySeat(!includeBabySeat)}
              />
              <p className="text-[12px] font-light">Add baby seat</p>
            </div>
            <div className="flex w-full flex-row items-center gap-2 rounded-md bg-whiteExt1 p-[12px]">
              <Checkbox
                value={includeTrailer?.toString() ?? "false"}
                onChange={(_) => setIncludeTrailer(!includeTrailer)}
              />
              <p className="text-[12px] font-light">Trailer</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-3">
          <p className="text-[14px] font-semibold text-accent">
            Special Instruction
          </p>
          <div className="mb-2 mt-2">
            <Textarea />
          </div>
        </div>
      </div>
    </div>
  );
};
