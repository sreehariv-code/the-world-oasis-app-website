"use server";
import { Session, User } from "next-auth";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";

// Extend the User type from next-auth
interface GuestUser extends User {
  guestId?: string | number | null;
}

// Extend the Session type from next-auth
interface GuestSession extends Session {
  user?: GuestUser;
}

//User to Sign in
export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}

//User to sign out
export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}

//To Update Guest information
export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged In");

  // Type guard to check if session is a GuestSession
  const isGuestSession = (session: Session): session is GuestSession => {
    return !!session.user && "guestId" in session.user;
  };

  if (!isGuestSession(session)) {
    throw new Error("Invalid session type");
  }

  const nationalID = formData.get("nationalID");
  const nationalityValue = formData.get("nationality");

  if (typeof nationalID !== "string") {
    throw new Error("Invalid national ID value");
  }
  if (typeof nationalityValue !== "string") {
    throw new Error("Invalid nationality value");
  }

  const [nationality, countryFlag] = nationalityValue.split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please Provide a valid national ID");
  }

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session?.user?.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }

  //This method is used for on demand data revalidation
  revalidatePath("/account/profile");
}

//Delete a reservation for a guest
export async function deleteReservation(
  bookingId: string | number | null | undefined
): Promise<void> {
  const session = (await auth()) as GuestSession;
  if (!session) throw new Error("You must be logged In");

  const guestBookings = await getBookings(session.user?.guestId);

  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You're not allowed to delete this booking ");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }

  //This method is used for on demand data revalidation
  revalidatePath("/account/reservations");
}
