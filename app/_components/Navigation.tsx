import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";
import { CustomSession } from "../_lib/types/AuthTypes";

export default async function Navigation() {
  const session: CustomSession | null = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <div className="aspect-square h-8 rounded-full relative overflow-hidden">
                <Image
                  fill
                  className="object-cover "
                  src={session.user.image}
                  alt={session.user.name ?? "Guest"}
                  referrerPolicy="no-referrer"
                />
              </div>
              <span> Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center"
            >
              <span>Guest area</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
