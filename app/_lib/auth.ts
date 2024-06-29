import NextAuth, {
  Account as NextAuthAccount,
  Profile as NextAuthProfile,
  User as NextAuthUser,
  Session,
  DefaultSession,
} from "next-auth";
import Google from "next-auth/providers/google";
import { NextRequest } from "next/server";
import { createGuest, getGuest } from "./data-service";

type GuestUser = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  guestId?: string | null | number;
};

interface GuestSession extends DefaultSession {
  user?: GuestUser;
}

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  // Callbacks
  callbacks: {
    async authorized({
      auth,
    }: {
      request: NextRequest;
      auth: Session | null;
    }): Promise<boolean> {
      return !!auth?.user;
    },
    async signIn({
      user,
    }: {
      user: NextAuthUser;
      account: NextAuthAccount | null;
      profile?: NextAuthProfile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, unknown>;
    }): Promise<boolean> {
      try {
        if (user?.email) {
          const existingUser = await getGuest(user.email);

          //Create a new user if the email is not found
          if (!existingUser)
            await createGuest({
              email: user.email,
              fullName: user?.name,
            });

          return true;
        }
        return false;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    //Getting in the GuestId after Signing In
    async session({
      session, //contains fetched user
    }: {
      session: GuestSession;
    }): Promise<GuestSession> {
      if (session?.user?.email) {
        const guest = await getGuest(session?.user?.email);
        if (guest) {
          session.user.guestId = guest?.id;
        }
      }
      return session;
    },
  },
  // Pages
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  // Route handler functions
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(authConfig);
