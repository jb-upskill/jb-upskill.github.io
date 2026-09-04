"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBooking } from "@/lib/booking-context";

const links = [
  { href: "/", label: "Home" },
  { href: "/tutors", label: "Find a tutor" },
  { href: "/bookings", label: "My bookings" },
];

export function NavBar() {
  const pathname = usePathname();
  const { bookings } = useBooking();

  return (
    <header className="border-b border-warm-200 bg-warm-50/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-ink">
          ABC Tutoring
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => {
            const isActive =
              pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                  isActive
                    ? "bg-accent-1 text-white"
                    : "text-ink-soft hover:bg-warm-200"
                }`}
              >
                {link.label}
                {link.href === "/bookings" && bookings.length > 0 && (
                  <span className="ml-1.5 rounded-full bg-white/30 px-1.5 py-0.5 text-xs">
                    {bookings.length}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
