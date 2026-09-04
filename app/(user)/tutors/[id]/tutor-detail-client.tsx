"use client";

import { useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useBooking } from "@/lib/booking-context";
import { captureEvent } from "@/lib/posthog-provider";

export default function TutorDetailClient({ id }: { id: string }) {
  const { getTutor } = useBooking();
  const tutor = getTutor(id);

  useEffect(() => {
    if (!tutor) return;
    captureEvent("tutor_profile_viewed", {
      tutor_id: tutor.id,
      tutor_name: tutor.name,
    });
  }, [tutor]);

  if (!tutor) notFound();

  const openSlots = tutor.slots.filter((s) => !s.booked);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/tutors" className="text-sm font-medium text-accent-2">
        &larr; Back to all tutors
      </Link>

      <div className="mt-6 flex items-start gap-5">
        <div
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white"
          style={{ backgroundColor: tutor.color }}
        >
          {tutor.initials}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ink">{tutor.name}</h1>
          <p className="mt-1 text-ink-soft">{tutor.subjects.join(" · ")}</p>
          <p className="mt-1 font-semibold text-ink">${tutor.rate}/hr</p>
        </div>
      </div>

      <p className="mt-6 text-ink-soft">{tutor.bio}</p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink">Available times</h2>
        {openSlots.length === 0 ? (
          <p className="mt-3 text-ink-soft">
            {tutor.name} is fully booked right now &mdash; check back soon.
          </p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {openSlots.map((slot) => (
              <Link
                key={slot.id}
                href={`/tutors/${tutor.id}/book?slot=${slot.id}`}
                className="rounded-card border border-warm-200 bg-warm-100 px-4 py-3 text-center font-medium text-ink transition-colors hover:border-accent-1 hover:bg-accent-1-soft"
              >
                {slot.day} &middot; {slot.time}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
