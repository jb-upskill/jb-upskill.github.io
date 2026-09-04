import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <section className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-1">
          ABC Tutoring
        </p>
        <h1 className="mt-2 text-4xl font-bold leading-tight text-ink sm:text-5xl">
          Tutoring that feels like a friend helping out, not a test-prep factory.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-ink-soft">
          ABC Tutoring connects your student with a caring, local tutor for
          one-on-one help in math, reading, science, and more &mdash; no
          franchise scripts, no pressure, just real progress.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/tutors"
            className="rounded-full bg-accent-1 px-6 py-3 font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Find a tutor
          </Link>
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
