
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock3, GraduationCap, CheckCircle2 } from "lucide-react";

const courseData = {
  "computer-applications": {
    title: "Computer Applications",
    category: "Technology",
    description:
      "Explore computing concepts, software development, programming, and digital systems.",
    subjects: [
      "Programming fundamentals",
      "Database concepts",
      "Web development",
      "Computer networks",
    ],
  },
  "business-studies": {
    title: "Business Studies",
    category: "Management",
    description:
      "Develop an understanding of business operations, management, and entrepreneurship.",
    subjects: [
      "Business management",
      "Accounting fundamentals",
      "Marketing principles",
      "Entrepreneurship",
    ],
  },
  "science-research": {
    title: "Science and Research",
    category: "Science",
    description:
      "Explore scientific concepts, research methods, and practical learning.",
    subjects: [
      "Scientific methods",
      "Research fundamentals",
      "Laboratory practice",
      "Data interpretation",
    ],
  },
  "information-technology": {
    title: "Information Technology",
    category: "Technology",
    description:
      "Explore information systems, computer networks, and digital infrastructure.",
    subjects: [
      "Information systems",
      "Networking fundamentals",
      "Cybersecurity concepts",
      "Systems administration",
    ],
  },
  commerce: {
    title: "Commerce",
    category: "Management",
    description:
      "Learn about financial activities, accounting, and commercial operations.",
    subjects: [
      "Financial accounting",
      "Business economics",
      "Commercial law",
      "Finance fundamentals",
    ],
  },
  "applied-science": {
    title: "Applied Science",
    category: "Science",
    description:
      "Connect scientific theory with practical applications and problem solving.",
    subjects: [
      "Applied scientific principles",
      "Experimental methods",
      "Technical problem solving",
      "Research practice",
    ],
  },
};

export default function CourseDetails() {
  const { slug } = useParams();
  const course = courseData[slug];

  if (!course) {
    return (
      <section className="mx-auto max-w-4xl px-5 py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Course not found
        </h1>

        <Link
          to="/courses"
          className="mt-6 inline-flex text-blue-800 hover:underline"
        >
          Browse all courses
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="page-banner bg-slate-950 px-5 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to courses
          </Link>

          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-blue-300">
            {course.category}
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">
            {course.title}
          </h1>

          <p className="mt-6 max-w-2xl leading-7 text-slate-300">
            {course.description}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_320px] lg:px-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Program overview
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            This sample overview introduces the program's learning
            areas. Official curriculum, eligibility, and program
            duration should be confirmed with IICS.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            Areas of study
          </h2>

          <ul className="mt-5 space-y-3">
            {course.subjects.map((subject) => (
              <li
                key={subject}
                className="flex items-start gap-3 text-slate-600"
              >
                <CheckCircle2 className="mt-1 shrink-0 text-blue-700" size={18} />
                {subject}
              </li>
            ))}
          </ul>
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <GraduationCap className="text-blue-800" size={30} />

          <h2 className="mt-4 text-xl font-bold text-slate-900">
            Interested in this program?
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Visit admissions to learn about the application process.
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
            <Clock3 size={16} />
            Duration: To be confirmed
          </div>

          <Link
            to="/admissions"
            className="mt-6 block rounded-lg bg-blue-800 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-900"
          >
            Admission information
          </Link>
        </aside>
      </section>
    </>
  );
}
