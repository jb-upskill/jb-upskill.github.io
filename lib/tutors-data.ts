export type Slot = {
  id: string;
  day: string;
  time: string;
  booked: boolean;
};

export const DAY_ORDER = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function timeToMinutes(time: string): number {
  const match = time.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (!match) return 0;
  const [, hourStr, minuteStr, meridiem] = match;
  let hour = parseInt(hourStr, 10) % 12;
  if (meridiem.toUpperCase() === "PM") hour += 12;
  return hour * 60 + parseInt(minuteStr, 10);
}

export type Tutor = {
  id: string;
  name: string;
  subjects: string[];
  bio: string;
  rate: number;
  initials: string;
  color: string;
  slots: Slot[];
};

export const initialTutors: Tutor[] = [
  {
    id: "maria-santos",
    name: "Maria Santos",
    subjects: ["Algebra", "Geometry", "SAT Math"],
    bio: "Maria has spent the last six years helping middle and high schoolers stop dreading math class. She likes to find the one example that makes a concept click, then builds from there.",
    rate: 35,
    initials: "MS",
    color: "var(--color-accent-1)",
    slots: [
      { id: "maria-mon-4", day: "Monday", time: "4:00 PM", booked: false },
      { id: "maria-mon-5", day: "Monday", time: "5:00 PM", booked: false },
      { id: "maria-wed-4", day: "Wednesday", time: "4:00 PM", booked: false },
      { id: "maria-sat-10", day: "Saturday", time: "10:00 AM", booked: false },
    ],
  },
  {
    id: "james-okafor",
    name: "James Okafor",
    subjects: ["Reading", "Writing", "ACT English"],
    bio: "A former middle school English teacher, James specializes in turning reluctant readers into confident writers. Sessions are relaxed, encouraging, and always end with something to feel good about.",
    rate: 30,
    initials: "JO",
    color: "var(--color-accent-2)",
    slots: [
      { id: "james-tue-3", day: "Tuesday", time: "3:30 PM", booked: false },
      { id: "james-thu-3", day: "Thursday", time: "3:30 PM", booked: false },
      { id: "james-thu-5", day: "Thursday", time: "5:00 PM", booked: false },
    ],
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    subjects: ["Biology", "Chemistry", "Study Skills"],
    bio: "Priya is a biology grad student who loves helping students build the study habits that make science feel manageable — not just for the next test, but for the whole semester.",
    rate: 32,
    initials: "PN",
    color: "var(--color-accent-3)",
    slots: [
      { id: "priya-mon-6", day: "Monday", time: "6:00 PM", booked: false },
      { id: "priya-wed-6", day: "Wednesday", time: "6:00 PM", booked: false },
      { id: "priya-fri-4", day: "Friday", time: "4:00 PM", booked: false },
      { id: "priya-sat-11", day: "Saturday", time: "11:00 AM", booked: false },
    ],
  },
  {
    id: "daniel-cho",
    name: "Daniel Cho",
    subjects: ["Elementary Math", "Elementary Reading"],
    bio: "Daniel works mostly with younger kids (grades 2-5), using games and hands-on examples to build confidence early. Parents say sessions feel more like playtime than tutoring.",
    rate: 28,
    initials: "DC",
    color: "var(--color-accent-1)",
    slots: [
      { id: "daniel-tue-4", day: "Tuesday", time: "4:00 PM", booked: false },
      { id: "daniel-fri-3", day: "Friday", time: "3:00 PM", booked: false },
    ],
  },
];
