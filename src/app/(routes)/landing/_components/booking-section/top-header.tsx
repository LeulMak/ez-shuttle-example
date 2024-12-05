import { CircleCheck } from "lucide-react";
import {
  BookingSectionType,
  bookingSectionValues,
} from "~/app/_core/enums/booking-section-type";

export const TopHeader = () => {
  const bookingSectionTypeMapping = bookingSectionValues.map(([key, value]) => (
    <div
      key={key}
      className={`flex flex-row items-center justify-center rounded-t-md px-5 py-3 gap-2 ${value === BookingSectionType.Local ? "bg-white" : "bg-background"}`}
    >
      {value === BookingSectionType.Local ? (
        <CircleCheck size={15} className="text-primary" />
      ) : null}
      <span
        className={`text-center text-[13px] font-semibold ${value === BookingSectionType.Local ? "text-accent" : "text-primaryExt1"}`}
      >
        {value}
      </span>
    </div>
  ));

  return (
    <div className="flex flex-row justify-stretch gap-4">{bookingSectionTypeMapping}</div>
  );
};
