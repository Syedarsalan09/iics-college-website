
import { useMemo, useState } from "react";
import { Search, CalendarDays, Bell } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";

const noticeData = [
  {
    id: 1,
    title: "Admissions information",
    category: "Admissions",
    date: "To be announced",
    description:
      "Check the admissions page for application information and eligibility requirements.",
  },
  {
    id: 2,
    title: "Academic calendar",
    category: "Academic",
    date: "To be announced",
    description:
      "Academic dates and important semester information will be published here.",
  },
  {
    id: 3,
    title: "Campus announcements",
    category: "General",
    date: "To be announced",
    description:
      "Updates about college activities and campus information.",
  },
  {
    id: 4,
    title: "Examination updates",
    category: "Academic",
    date: "To be announced",
    description:
      "Examination schedules and related announcements will appear here.",
  },
];

const categories = ["All", "Admissions", "Academic", "General"];

export default function Notices() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredNotices = useMemo(() => {
    return noticeData.filter((notice) => {
      const matchesCategory =
        category === "All" || notice.category === category;

      const matchesSearch = `${notice.title} ${notice.description}`
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  return (
    <>
      <section className="page-banner bg-slate-950 px-5 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
            News and updates
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            College notices
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-slate-300">
            Stay informed about admissions, academics, examinations,
            and college announcements.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Notice board"
          title="Latest updates"
          description="These are sample entries. Official notices will be added by the college."
        />

        <div className="mt-8 flex max-w-xl items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
          <Search className="text-slate-400" size={19} />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search notices..."
            aria-label="Search notices"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                category === item
                  ? "bg-blue-800 text-white"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {filteredNotices.map((notice) => (
            <article
              key={notice.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-5 sm:flex-row sm:items-start"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
                <Bell size={22} />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
                    {notice.category}
                  </span>

                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <CalendarDays size={14} />
                    {notice.date}
                  </span>
                </div>

                <h2 className="mt-3 text-lg font-bold text-slate-900">
                  {notice.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {notice.description}
                </p>
              </div>
            </article>
          ))}

          {filteredNotices.length === 0 && (
            <div className="rounded-2xl bg-slate-50 p-10 text-center">
              <p className="font-semibold text-slate-800">
                No notices found
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Try a different search or category.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
