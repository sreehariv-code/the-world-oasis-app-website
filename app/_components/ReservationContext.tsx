"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

// Assuming Range is defined as DateRange in your Settings file
export interface Range {
  from: Date | undefined;
  to: Date | undefined;
}

interface ReservationContextType {
  range: Range | undefined;
  setRange: Dispatch<SetStateAction<Range | undefined>>;
  resetRange: Function;
}

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

const initialState: Range = {
  from: undefined,
  to: undefined,
};

function ReservationProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<Range | undefined>(initialState);

  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider
      value={{
        range,
        setRange,
        resetRange,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation(): ReservationContextType {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
}

export { ReservationProvider, useReservation };
