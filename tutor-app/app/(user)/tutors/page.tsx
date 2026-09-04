"use client";

import Link from "next/link";
import { useBooking } from "@/lib/booking-context";
import { captureEvent } from "@/lib/posthog-provider";

export default function TutorsPage() {
  const { tutors } = useBooking();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">
          Meet our tutors
        </h1>
        <p className="mt-3 text-ink-soft">
          Every tutor here is someone Dana knows personally. Pick one and book
          a time that works for you.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {tutors.map((tutor) => {
          const openSlots = tutor.slots.filter((s) => !s.booked).length;
          return (
            <Link
              key={tutor.id}
              href={`/tutors/${tutor.id}`}
              onClick={() =>
                captureEvent("tutor_card_clicked", {
                  tutor_id: tutor.id,
                  tutor_name: tutor.name,
                })
              }
              className="group rounded-card border border-warm-200 bg-warm-100 p-6 transition-transform hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white"
                  style={{ backgroundColor: tutor.color }}
                >
                  {tutor.initials}
                </div>
                <div className="min-w-0">
                  <h2 className="font-semibold text-ink group-hover:text-accent-1">
                    {tutor.name}
                  </h2>
                  <p className="mt-1 text-sm text-ink-soft">
                    {tutor.subjects.join(" · ")}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-ink-soft">{tutor.bio}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="font-semibold text-ink">${tutor.rate}/hr</span>
                <span
                  className={
                    openSlots > 0
                      ? "font-medium text-accent-2"
                      : "font-medium text-ink-soft"
                  }
                >
                  {openSlots > 0
                    ? `${openSlots} slot${openSlots === 1 ? "" : "s"} open`
                    : "Fully booked"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
