import { Suspense } from "react";
import { initialTutors } from "@/lib/tutors-data";
import BookSlotClient from "./book-slot-client";

export function generateStaticParams() {
  return initialTutors.map((tutor) => ({ id: tutor.id }));
}

export default async function BookSlotPage(
  props: PageProps<"/tutors/[id]/book">,
) {
  const { id } = await props.params;
  return (
    <Suspense fallback={null}>
      <BookSlotClient id={id} />
    </Suspense>
  );
}
