
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  GraduationCap,
  Users,
  FlaskConical,
  LibraryBig,
  Monitor,
  CheckCircle2,
} from "lucide-react";

import SectionHeading from "../components/common/SectionHeading";
import Button from "../components/common/Button";
import CourseCard from "../components/cards/CourseCard";
import FacultyCard from "../components/cards/FacultyCard";
import NoticeCard from "../components/cards/NoticeCard";

const courses = [
  {
    title: "Computer Applications",
    category: "Technology",
    duration: "Program duration to be confirmed",
    slug: "computer-applications",
    description:
      "Explore computing, software development, and digital technology.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Business Studies",
    category: "Management",
    duration: "Program duration to be confirmed",
    slug: "business-studies",
    description:
      "Discover business principles, management, and entrepreneurship.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Science and Research",
    category: "Science",
    duration: "Program duration to be confirmed",
    slug: "science-research",
    description:
      "Develop scientific understanding through learning and exploration.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80",
  },
];

const faculty = [
  {
    name: "Faculty Profile",
    position: "Teaching Faculty",
    department: "Department details to be added",
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Faculty Profile",
    position: "Teaching Faculty",
    department: "Department details to be added",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Faculty Profile",
    position: "Teaching Faculty",
    department: "Department details to be added",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80",
  },
];

const notices = [
  {
    date: "College announcement",
    title: "Admission information",
    description:
      "Check the admissions page for application details and eligibility.",
  },
  {
    date: "Academic announcement",
    title: "Academic updates",
    description:
      "Important academic information will be published in this section.",
  },
];

const facilities = [
  {
    title: "Modern Classrooms",
    description: "Learning spaces designed for student engagement.",
    icon: Building2,
  },
  {
    title: "Library",
    description: "A place for reading, research, and independent study.",
    icon: LibraryBig,
  },
  {
    title: "Computer Labs",
    description: "Technology-focused learning and practical experience.",
    icon: Monitor,
  },
  {
    title: "Learning Resources",
    description: "Resources that support academic exploration.",
    icon: FlaskConical,
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-slate-950">
        <div className="absolute inset-0 -z-20">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=85"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/35" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:py-32 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-36">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-blue-100 backdrop-blur">
              <GraduationCap size={16} />
              Welcome to IICS College
            </div>

            <h1 className="mt-7 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
              Your future begins with{" "}
              <span className="text-blue-300">learning.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Discover academic opportunities, build valuable skills,
              and take the next step toward your ambitions.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Button to="/admissions">
                Explore Admissions
              </Button>

              <Button to="/courses" variant="secondary">
                Discover Courses
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-blue-300" />
                Academic opportunities
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-blue-300" />
                Student development
              </span>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="ml-auto max-w-sm rounded-2xl border border-white/20 bg-white/10 p-7 text-white shadow-2xl backdrop-blur-md">
              <span className="text-sm font-semibold text-blue-200">
                Explore IICS
              </span>

              <h2 className="mt-3 text-2xl font-bold">
                Find the path that's right for you.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Learn about our programs, campus facilities, and
                admission opportunities.
              </p>

              <Button
                to="/about"
                variant="secondary"
                className="mt-6"
              >
                Discover our college
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro and highlights */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="About IICS"
              title="Education that opens new possibilities"
              description="Explore an environment where students can develop knowledge, discover their interests, and prepare for their next chapter."
            />

            <p className="mt-5 text-sm leading-7 text-slate-600">
              This introduction will be customized with IICS's official
              history, mission, vision, and academic information.
            </p>

            <Button to="/about" variant="secondary" className="mt-7">
              Learn about IICS
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Academic Programs", icon: BookOpen },
              { label: "Student Community", icon: Users },
              { label: "Campus Facilities", icon: Building2 },
              { label: "Learning Resources", icon: GraduationCap },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-2xl bg-slate-50 p-6 transition hover:bg-blue-50"
                >
                  <Icon className="text-blue-800" size={27} />
                  <p className="mt-5 font-semibold text-slate-800">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Explore academics"
              title="Discover our programs"
              description="Browse areas of study and find a program that matches your interests."
            />

            <Button to="/courses" variant="secondary">
              All courses
            </Button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeading
          eyebrow="Campus experience"
          title="Spaces that support learning"
          description="Explore the facilities and resources that make campus life engaging."
          centered
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((facility) => {
            const Icon = facility.icon;

            return (
              <article
                key={facility.title}
                className="rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  {facility.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {facility.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Faculty */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Meet our educators"
              title="Our faculty"
              description="Meet the people who support teaching, learning, and academic growth."
            />

            <Button to="/faculty" variant="secondary">
              View faculty
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {faculty.map((person, index) => (
              <FacultyCard key={index} faculty={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Notices */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Stay informed"
              title="Latest announcements"
              description="Keep up with college news, academic updates, and important information."
            />

            <Button to="/notices" variant="secondary">
              All notices
            </Button>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {notices.map((notice, index) => (
              <NoticeCard key={index} notice={notice} />
            ))}
          </div>
        </div>
      </section>

      {/* Admissions call to action */}
      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-3xl bg-blue-800 px-8 py-12 text-white sm:px-12 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
              Admissions
            </p>

            <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Take the next step in your education.
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-blue-100">
              Learn about eligibility, the application process, and
              the information you'll need to apply.
            </p>
          </div>

          <Button
            to="/admissions"
            variant="secondary"
            className="shrink-0"
          >
            Admission details
            <ArrowUpRight size={17} />
          </Button>
        </div>
      </section>
    </>
  );
}
