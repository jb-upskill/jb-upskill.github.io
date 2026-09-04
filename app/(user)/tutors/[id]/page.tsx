import { initialTutors } from "@/lib/tutors-data";
import TutorDetailClient from "./tutor-detail-client";

export function generateStaticParams() {
  return initialTutors.map((tutor) => ({ id: tutor.id }));
}

export default async function TutorDetailPage(props: PageProps<"/tutors/[id]">) {
  const { id } = await props.params;
  return <TutorDetailClient id={id} />;
}
