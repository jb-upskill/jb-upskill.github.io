"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { initialTutors, type Tutor } from "./tutors-data";

export type Booking = {
  id: string;
  tutorId: string;
  tutorName: string;
  slotId: string;
  day: string;
  time: string;
  bookedAt: string;
};

type BookingState = {
  tutors: Tutor[];
  bookings: Booking[];
};

const STORAGE_KEY = "abc-tutoring-state";

type BookingContextValue = {
  tutors: Tutor[];
  bookings: Booking[];
  getTutor: (tutorId: string) => Tutor | undefined;
  bookSlot: (tutorId: string, slotId: string) => Booking | null;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BookingState>({
    tutors: initialTutors,
    bookings: [],
  });

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as BookingState;
      if (parsed.tutors && parsed.bookings) {
        // One-time hydration from localStorage once the real client state is known.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState(parsed);
      }
    } catch {
      // ignore malformed saved state
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const getTutor = useCallback(
    (tutorId: string) => state.tutors.find((t) => t.id === tutorId),
    [state.tutors]
  );

  const bookSlot = useCallback((tutorId: string, slotId: string) => {
    let booking: Booking | null = null;
    setState((prev) => {
      const tutor = prev.tutors.find((t) => t.id === tutorId);
      const slot = tutor?.slots.find((s) => s.id === slotId);
      if (!tutor || !slot || slot.booked) return prev;

      booking = {
        id: `${slotId}-${Date.now()}`,
        tutorId: tutor.id,
        tutorName: tutor.name,
        slotId: slot.id,
        day: slot.day,
        time: slot.time,
        bookedAt: new Date().toISOString(),
      };

      return {
        tutors: prev.tutors.map((t) =>
          t.id !== tutorId
            ? t
            : {
                ...t,
                slots: t.slots.map((s) =>
                  s.id === slotId ? { ...s, booked: true } : s
                ),
              }
        ),
        bookings: [...prev.bookings, booking],
      };
    });
    return booking;
  }, []);

  const value = useMemo(
    () => ({ tutors: state.tutors, bookings: state.bookings, getTutor, bookSlot }),
    [state.tutors, state.bookings, getTutor, bookSlot]
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
}
