import ReservationCard from "@/app/_components/ReservationCard";
import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
import { Session, User } from "next-auth";

export const metadata = {
  title: "Reservations",
};

// Extend the User type from next-auth
interface GuestUser extends User {
  guestId?: string | number | null;
}

// Extend the Session type from next-auth
interface GuestSession extends Session {
  user?: GuestUser;
}

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

export default async function Page() {
  const session: GuestSession | null = await auth();

  const guestId = session?.user?.guestId
    ? String(session.user.guestId)
    : undefined;

  const bookings: BookingProp[] = await getBookings(guestId);

  console.log(bookings);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
