import WeeklyWeather from "@/components/custom/weekly-weather";
import MainDayWeather from "@/components/custom/main-day-weather";
import { Suspense } from "react";

export default async function Home() {

  return (
    <div className="">
      <Suspense fallback={<div className="p-2 flex items-center justify-center ring ring-amber-200 rounded-sm">Loading...</div>}>
        <MainDayWeather />
      </Suspense>
      <Suspense fallback={<div className="p-2 flex items-center justify-center ring ring-amber-200 rounded-sm">Loading...</div>}>
        <WeeklyWeather />
      </Suspense>
    </div>
  );
}
