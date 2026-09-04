"use client";

import Link from "next/link";
import { useBooking } from "@/lib/booking-context";

export default function BookingsPage() {
  const { bookings } = useBooking();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">My bookings</h1>
      <p className="mt-3 text-ink-soft">
        Sessions you&apos;ve booked on this device.
      </p>

      {bookings.length === 0 ? (
        <div className="mt-10 rounded-card border border-dashed border-warm-300 p-10 text-center">
          <p className="text-ink-soft">You haven&apos;t booked a session yet.</p>
          <Link
            href="/tutors"
            className="mt-5 inline-block rounded-full bg-accent-1 px-6 py-3 font-semibold text-white"
          >
            Find a tutor
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {[...bookings].reverse().map((booking) => (
            <li
              key={booking.id}
              className="flex items-center justify-between rounded-card border border-warm-200 bg-warm-100 p-5"
            >
              <div>
                <p className="font-semibold text-ink">{booking.tutorName}</p>
                <p className="text-sm text-ink-soft">
                  {booking.day} &middot; {booking.time}
                </p>
              </div>
              <Link
                href={`/tutors/${booking.tutorId}`}
                className="text-sm font-medium text-accent-2"
              >
                View tutor
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
