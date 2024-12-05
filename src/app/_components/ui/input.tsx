import * as React from "react";
import type { Place } from "~/app/_core/models/place/place";
import { isArrayEmpty } from "~/lib/utils/array-utils";
import { cn } from "~/lib/utils/cn";
import { Spinner } from "../spinner";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  inputClassName?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  inputRightElement?: React.ReactNode;
  inputLeftElement?: React.ReactNode;
  isAutoComplete?: boolean;
  isAutoCompleteStarts?: boolean;
  isAutoCompleteLoading?: boolean;
  data?: Place[];
  onPlaceTap?: (data: Place) => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputClassName,
      type,
      inputRightElement,
      inputLeftElement,
      isAutoComplete,
      isAutoCompleteLoading,
      isAutoCompleteStarts,
      onPlaceTap,
      data,
      ...props
    },
    ref,
  ) => {
    const placeAutoCompleteMapping =
      isAutoComplete && isAutoCompleteStarts ? (
        isAutoCompleteLoading ? (
          <div className="flex w-full flex-row items-center justify-center">
            <Spinner />
          </div>
        ) : !isArrayEmpty<Place>(data) ? (
          data!.slice(0, 5).map((place) => (
            <div
              key={place.googlePlaceId}
              className="cursor-pointer px-2 py-3 hover:bg-whiteExt1"
              onClick={() => onPlaceTap?.(place)}
            >
              <p className="text-sm font-light text-black">
                {place.displayName}
              </p>
            </div>
          ))
        ) : (
          <div className="text-sm font-light text-black">No Place Found</div>
        )
      ) : null;

    return (
      <div className="relative flex flex-col w-full">
        <div
          className={cn(
            "bg-whiteExt1 group-focus flex h-[48px] flex-row items-stretch gap-2 px-2 py-1",
            className,
          )}
        >
          {inputLeftElement && (
            <div className="flex items-center justify-center px-1">
              {inputLeftElement}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "bg-whiteExt1 flex-1 text-[12px] focus:outline-none",
              inputClassName,
            )}
            ref={ref}
            {...props}
          />
          {inputRightElement && (
            <div className="flex items-center justify-center px-1">
              {inputRightElement}
            </div>
          )}
        </div>

        {isAutoComplete && isAutoCompleteStarts ? (
          <div className="absolute left-0 right-0 top-[48px] z-40 mt-3 flex flex-grow flex-col rounded-md bg-white shadow-md px-2 py-2">
            {placeAutoCompleteMapping}
          </div>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
