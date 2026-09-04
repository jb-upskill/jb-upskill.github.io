"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useBooking, type Booking } from "@/lib/booking-context";
import { captureEvent } from "@/lib/posthog-provider";

export default function BookSlotPage(props: PageProps<"/tutors/[id]/book">) {
  const { id } = use(props.params);
  const { slot: slotId } = use(props.searchParams);
  const { getTutor, bookSlot } = useBooking();
  const tutor = getTutor(id);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  const slot = tutor?.slots.find((s) => s.id === slotId);

  useEffect(() => {
    if (!tutor || !slot) return;
    captureEvent("booking_started", {
      tutor_id: tutor.id,
      tutor_name: tutor.name,
      slot_time: `${slot.day} ${slot.time}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutor?.id, slot?.id]);

  if (!tutor || typeof slotId !== "string") notFound();

  if (!slot) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-ink">
          That time isn&apos;t available anymore
        </h1>
        <p className="mt-3 text-ink-soft">
          Someone may have just booked it. Take a look at {tutor.name}&apos;s
          other open times.
        </p>
        <Link
          href={`/tutors/${tutor.id}`}
          className="mt-6 inline-block rounded-full bg-accent-1 px-6 py-3 font-semibold text-white"
        >
          Back to {tutor.name}
        </Link>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-2-soft text-3xl">
          🎉
        </div>
        <h1 className="mt-6 text-2xl font-bold text-ink sm:text-3xl">
          You&apos;re booked!
        </h1>
        <p className="mt-3 text-ink-soft">
          {tutor.name} on {confirmed.day} at {confirmed.time}. See you then!
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/bookings"
            className="rounded-full bg-accent-1 px-6 py-3 font-semibold text-white"
          >
            View my bookings
          </Link>
          <Link
            href="/tutors"
            className="rounded-full border border-warm-300 px-6 py-3 font-semibold text-ink hover:bg-warm-100"
          >
            Browse more tutors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Link href={`/tutors/${tutor.id}`} className="text-sm font-medium text-accent-2">
        &larr; Back to {tutor.name}
      </Link>

      <h1 className="mt-6 text-2xl font-bold text-ink sm:text-3xl">
        Confirm your booking
      </h1>

      <div className="mt-6 rounded-card border border-warm-200 bg-warm-100 p-6">
        <div className="flex items-center gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold text-white"
            style={{ backgroundColor: tutor.color }}
          >
            {tutor.initials}
          </div>
          <div>
            <p className="font-semibold text-ink">{tutor.name}</p>
            <p className="text-sm text-ink-soft">{tutor.subjects.join(" · ")}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-warm-200 pt-4 text-sm">
          <span className="text-ink-soft">Time</span>
          <span className="font-medium text-ink">
            {slot.day} &middot; {slot.time}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-ink-soft">Rate</span>
          <span className="font-medium text-ink">${tutor.rate}/hr</span>
        </div>
      </div>

      <button
        onClick={() => {
          const booking = bookSlot(tutor.id, slot.id);
          if (!booking) return;
          captureEvent("booking_completed", {
            tutor_id: tutor.id,
            tutor_name: tutor.name,
            slot_time: `${booking.day} ${booking.time}`,
          });
          setConfirmed(booking);
        }}
        className="mt-8 w-full rounded-full bg-accent-1 px-6 py-3 font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
      >
        Confirm booking
      </button>
    </div>
  );
}
