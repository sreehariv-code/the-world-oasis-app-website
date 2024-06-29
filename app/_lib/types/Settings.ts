export interface Settings {
  id: number;
  created_at: string;
  minimumBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

export interface Range {
  from: Date | undefined;
  to: Date | undefined;
}
