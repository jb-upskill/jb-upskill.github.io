"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useBooking } from "@/lib/booking-context";
import { captureEvent } from "@/lib/posthog-provider";
import { DAY_ORDER, timeToMinutes } from "@/lib/tutors-data";

export default function TutorsPage() {
  const { tutors } = useBooking();

  const days = useMemo(() => {
    const present = new Set(tutors.flatMap((t) => t.slots.map((s) => s.day)));
    return DAY_ORDER.filter((d) => present.has(d));
  }, [tutors]);

  const times = useMemo(() => {
    const present = new Set(tutors.flatMap((t) => t.slots.map((s) => s.time)));
    return [...present].sort((a, b) => timeToMinutes(a) - timeToMinutes(b));
  }, [tutors]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-6 flex flex-wrap justify-center gap-3">
        {tutors.map((tutor) => (
          <Link
            key={tutor.id}
            href={`/tutors/${tutor.id}`}
            onClick={() =>
              captureEvent("tutor_card_clicked", {
                tutor_id: tutor.id,
                tutor_name: tutor.name,
              })
            }
            className="flex items-center gap-2 rounded-full border border-warm-200 bg-warm-100 py-1.5 pl-1.5 pr-4"
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: tutor.color }}
            >
              {tutor.initials}
            </span>
            <span className="text-sm font-medium text-ink">{tutor.name}</span>
            <span className="hidden text-xs text-ink-soft sm:inline">
              &middot; {tutor.subjects.join(", ")}
            </span>
          </Link>
        ))}
      </div>

      <div className="overflow-x-auto rounded-card border border-warm-200 bg-warm-100">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-24 border-b border-warm-200 p-3 text-left font-medium text-ink-soft">
                Time
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="border-b border-l border-warm-200 p-3 text-center font-medium text-ink-soft"
                >
                  {day.slice(0, 3)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time}>
                <th className="border-b border-warm-200 p-3 text-left align-top font-medium text-ink-soft">
                  {time}
                </th>
                {days.map((day) => {
                  const openTutors = tutors.filter((tutor) =>
                    tutor.slots.some(
                      (s) => s.day === day && s.time === time && !s.booked
                    )
                  );
                  return (
                    <td
                      key={day}
                      className="border-b border-l border-warm-200 p-2 align-top"
                    >
                      <div className="flex flex-col gap-1.5">
                        {openTutors.map((tutor) => {
                          const slot = tutor.slots.find(
                            (s) => s.day === day && s.time === time && !s.booked
                          )!;
                          return (
                            <Link
                              key={tutor.id}
                              href={`/tutors/${tutor.id}/book?slot=${slot.id}`}
                              onClick={() =>
                                captureEvent("tutor_card_clicked", {
                                  tutor_id: tutor.id,
                                  tutor_name: tutor.name,
                                })
                              }
                              className="flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium text-white"
                              style={{ backgroundColor: tutor.color }}
                            >
                              <span className="truncate">{tutor.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
