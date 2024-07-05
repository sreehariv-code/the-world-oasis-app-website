enum BookingStatus {
  Unconfirmed = "unconfirmed",
  CheckIn = "check-in",
  CheckOut = "check-out",
}

interface Cabin {
  name: string;
  image: string;
}

export interface BookingProp {
  id: string | number;
  guestId?: number;
  startDate: string;
  endDate: string;
  numNights: number;
  status: BookingStatus;
  created_at: Date;
  cabins: Cabin;
  totalPrice: number;
  numGuests: number;
  observations?: string;
  cabinId: number;
}
