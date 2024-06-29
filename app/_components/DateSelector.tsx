"use client";

import { isWithinInterval } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { CabinCardProps } from "../_lib/types/CabinCardType";
import { Range, Settings } from "../_lib/types/Settings";
import { useReservation } from "./ReservationContext";

interface DateSelectorProps {
  cabin: CabinCardProps;
  settings: Settings;
  bookedDates?: Array<Date> | [];
}

interface isAlreadyBookedProps {
  range: Range;
  datesArr?: any;
}

function isAlreadyBooked({ range, datesArr }: isAlreadyBookedProps) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date: any) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }: DateSelectorProps) {
  const { range, setRange, resetRange } = useReservation();
  // CHANGE
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;

  // SETTINGS
  const { maxBookingLength, minimumBookingLength } = settings;

  const handleRangeSelect = (range: DateRange | undefined) => {
    setRange(
      range
        ? { from: range.from, to: range.to || undefined }
        : { from: undefined, to: undefined }
    );
  };

  const handleResetRange = () => {
    resetRange();
  };

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={handleRangeSelect}
        selected={range}
        min={minimumBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={handleResetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
