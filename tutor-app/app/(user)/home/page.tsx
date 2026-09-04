import Link from "next/link";
import { initialTutors } from "@/lib/tutors-data";

export default function HomePage() {
  const subjectCount = new Set(initialTutors.flatMap((t) => t.subjects)).size;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="mb-3 inline-block rounded-full bg-accent-2-soft px-4 py-1.5 text-sm font-medium text-accent-2">
            Run by Dana, a neighbor you can trust
          </p>
          <h1 className="text-4xl font-bold leading-tight text-ink sm:text-5xl">
            Tutoring that feels like a friend helping out, not a test-prep factory.
          </h1>
          <p className="mt-5 text-lg text-ink-soft">
            ABC Tutoring connects your student with a caring, local tutor for
            one-on-one help in math, reading, science, and more &mdash; no
            franchise scripts, no pressure, just real progress.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/tutors"
              className="rounded-full bg-accent-1 px-6 py-3 font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
            >
              Find a tutor
            </Link>
            <a
              href="#how-it-works"
              className="rounded-full border border-warm-300 px-6 py-3 font-semibold text-ink transition-colors hover:bg-warm-100"
            >
              How it works
            </a>
          </div>
        </div>
        <div className="rounded-card bg-warm-100 p-8">
          <div className="grid grid-cols-2 gap-4 text-center">
            <Stat label="Caring tutors" value={`${initialTutors.length}`} />
            <Stat label="Subjects covered" value={`${subjectCount}+`} />
            <Stat label="Booking" value="Instant" />
            <Stat label="Vibe" value="Warm" />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mt-24">
        <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">
          How it works
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <Step
            number="1"
            title="Browse tutors"
            description="See who's available, what they teach, and get a feel for their style before you commit to anything."
            colorClass="bg-accent-1"
          />
          <Step
            number="2"
            title="Pick a time"
            description="Choose an open slot that works for your schedule &mdash; no back-and-forth emails required."
            colorClass="bg-accent-2"
          />
          <Step
            number="3"
            title="Get help"
            description="Meet with your tutor and start making progress. Rebook anytime as your student keeps growing."
            colorClass="bg-accent-3"
          />
        </div>
      </section>

      <section className="mt-24 rounded-card bg-warm-100 p-10 text-center">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">
          Ready to find the right fit?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-ink-soft">
          Every tutor on ABC Tutoring is someone Dana knows and trusts. Take a
          look and book a time that works for your family.
        </p>
        <Link
          href="/tutors"
          className="mt-6 inline-block rounded-full bg-accent-1 px-6 py-3 font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
        >
          Browse tutors
        </Link>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-2xl font-bold text-accent-1">{value}</div>
      <div className="text-sm text-ink-soft">{label}</div>
    </div>
  );
}

function Step({
  number,
  title,
  description,
  colorClass,
}: {
  number: string;
  title: string;
  description: string;
  colorClass: string;
}) {
  return (
    <div className="rounded-card border border-warm-200 bg-warm-50 p-6">
      <div
        className={`mb-4 flex h-9 w-9 items-center justify-center rounded-full ${colorClass} font-bold text-white`}
      >
        {number}
      </div>
      <h3 className="font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink-soft">{description}</p>
    </div>
  );
}
