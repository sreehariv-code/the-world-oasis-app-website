"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../_lib/actions";

interface BookingProp {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  guestId: number;
  cabinId: number;
  cabins: {
    name: string;
    image: string;
  }[];
}

export default function ReservationList({
  //Optimistic hook can only be used in client component. We're using this hook to update the list instaneously without waiting for the server updation
  bookings,
}: {
  bookings: BookingProp[];
}) {
  //const [state, setter fn] = useOptimistic(actual state, update fn)
  // The update function has to parameters, 'current state' and 'optimistic value' to get the next state
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: string) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking: any) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          //Prop drilling occurs...
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
