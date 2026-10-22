
import {
  Target,
  Eye,
  HeartHandshake,
  BookOpen,
  Users,
  Lightbulb,
  ArrowUpRight,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/common/SectionHeading";

const values = [
  {
    icon: BookOpen,
    title: "Learning",
    description:
      "Encourage curiosity, knowledge, and continuous academic development.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Support creativity, practical thinking, and new ideas.",
  },
  {
    icon: HeartHandshake,
    title: "Integrity",
    description:
      "Promote responsibility, respect, and ethical conduct.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Create an inclusive environment where students can grow together.",
  },
];

export default function About() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 -z-20">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=85"
            alt=""
            className="h-full w-full object-cover opacity-35"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/90 to-blue-950/55" />
        <div className="pointer-events-none absolute -right-24 -top-32 -z-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-32">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-200/25 bg-blue-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
              <GraduationCap size={16} />
              About IICS College
            </p>

            <h1 className="mt-7 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
              Education that opens{" "}
              <span className="text-blue-300">new possibilities.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Learn about IICS College, its educational vision, and the
              opportunities it aims to provide to students.
            </p>

            <Link
              to="/courses"
              className="mt-9 inline-flex items-center gap-2 rounded-lg bg-blue-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-200"
            >
              Explore our courses
              <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div className="absolute -inset-3 rotate-3 rounded-[2rem] bg-gradient-to-br from-blue-400/60 to-cyan-300/10 blur-[1px]" />
            <div className="relative overflow-hidden rounded-[1.7rem] border border-white/20 bg-slate-800 shadow-2xl shadow-black/30">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85"
                alt="College campus building"
                className="h-72 w-full object-cover sm:h-96"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                  Learn · Grow · Lead
                </p>
                <p className="mt-2 text-xl font-bold text-white sm:text-2xl">
                  A community built around learning
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-20 sm:py-24 lg:px-8">
        <div className="absolute -left-40 top-12 h-80 w-80 rounded-full bg-blue-50 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-xl">
              <div className="absolute -bottom-5 -left-5 h-2/3 w-2/3 rounded-3xl bg-blue-100" />
              <img
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=85"
                alt="Students learning together on campus"
                loading="lazy"
                className="relative h-80 w-full rounded-3xl object-cover shadow-xl shadow-blue-950/10 sm:h-[430px]"
              />
              <div className="absolute -right-3 bottom-7 max-w-[220px] rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xl sm:-right-6 sm:p-5">
                <p className="text-sm font-bold text-slate-900">
                  Learning with purpose
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Building knowledge, skills, and confidence.
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Our introduction"
              title="A place to discover what you're capable of"
              description="IICS College aims to provide an environment where students can develop their knowledge, skills, and confidence."
            />

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              This section can be updated with the official college
              history, founding year, affiliation, and achievements.
              We should use verified information before publishing.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Curiosity", "Growth", "Community"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-900"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-50 via-white to-sky-50 px-5 py-20 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our direction"
            title="Guided by purpose. Focused on possibility."
            description="The principles behind our approach to learning and personal growth."
            centered
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-800 to-blue-950 p-8 text-white shadow-xl shadow-blue-950/15 transition duration-300 hover:-translate-y-1 sm:p-10">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 transition group-hover:scale-125" />
              <Target className="relative text-blue-200" size={34} strokeWidth={1.8} />
              <h2 className="relative mt-8 text-2xl font-bold">Our Mission</h2>
              <p className="relative mt-4 max-w-lg leading-7 text-blue-100">
                To support meaningful learning, practical skills, and
                personal growth through accessible educational
                opportunities.
              </p>
            </article>

            <article className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-8 shadow-lg shadow-blue-950/5 transition duration-300 hover:-translate-y-1 sm:p-10">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-100/70 transition group-hover:scale-125" />
              <Eye className="relative text-blue-800" size={34} strokeWidth={1.8} />
              <h2 className="relative mt-8 text-2xl font-bold text-slate-900">
                Our Vision
              </h2>
              <p className="relative mt-4 max-w-lg leading-7 text-slate-600">
                To foster a learning community that prepares students to
                contribute positively to society and their chosen fields.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="What guides us"
          title="Values that shape the journey"
          description="Principles that can guide the college's learning environment and community."
          centered
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = value.icon;
            const iconStyles = [
              "bg-blue-100 text-blue-800",
              "bg-amber-100 text-amber-700",
              "bg-rose-100 text-rose-700",
              "bg-cyan-100 text-cyan-800",
            ];

            return (
              <article
                key={value.title}
                className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/10 sm:p-7"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition group-hover:scale-110 ${iconStyles[index]}`}
                >
                  <Icon size={24} strokeWidth={1.8} />
                </span>

                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {value.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-5 pb-20 lg:px-8">
        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 overflow-hidden rounded-3xl bg-slate-950 px-7 py-10 text-white sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="absolute -right-10 -top-24 h-64 w-64 rounded-full bg-blue-500/20 blur-2xl" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
              Your next chapter
            </p>
            <h2 className="mt-3 max-w-2xl text-2xl font-bold sm:text-3xl">
              Explore where learning can take you.
            </h2>
          </div>
          <Link
            to="/admissions"
            className="relative inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-blue-950 transition hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Start your journey
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
