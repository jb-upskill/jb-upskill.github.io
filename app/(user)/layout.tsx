import { BookingProvider } from "@/lib/booking-context";
import { NavBar } from "./nav-bar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <BookingProvider>
      <div className="flex min-h-full flex-col">
        <NavBar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-warm-200 px-6 py-8 text-center text-sm text-ink-soft">
          ABC Tutoring &mdash; friendly, one-on-one help, right in your neighborhood.
        </footer>
      </div>
    </BookingProvider>
  );
}
