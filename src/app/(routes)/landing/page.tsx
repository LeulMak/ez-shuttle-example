"use client";

import { useEffect } from "react";
import { api } from "~/trpc/react";
import { Menu } from "./_components/menu";
import { TopBanner } from "./_components/top-banner";
import { ShimmerLoading } from "~/app/_components/shimmer-loading";
import { TopHeader } from "./_components/booking-section/top-header";
import { BookingForm } from "./_components/booking-form/booking-form-wrapper";
import { SITE_URL } from "~/app/_core/constants/string-constants";

export const Landing = () => {

  const {
    data,
    refetch: fetchAppStyles,
    isLoading: appStylesLoading,
  } = api.app.getBackground.useQuery({ url: SITE_URL }, { enabled: false });

  useEffect(() => {
    void fetchAppStyles();
  }, []);

  return (
    <div className="flex h-screen flex-col">
      <TopBanner />
      <Menu />

      <div className="relative flex h-full flex-grow flex-col">
        {appStylesLoading ? (
          <ShimmerLoading />
        ) : (
          <img
            src={data as string}
            alt="EZ Shuttle BG Image"
            className="flex h-full w-screen flex-grow object-cover"
          />
        )}

        <div className="absolute bottom-10 left-10 top-16 flex h-5/6 w-1/3 flex-col bg-transparent">
          <TopHeader />
          <BookingForm />
        </div>
      </div>
    </div>
  );
};
