
import { useMemo, useState } from "react";
import { Search, BookOpen } from "lucide-react";
import CourseCard from "../components/cards/CourseCard";
import SectionHeading from "../components/common/SectionHeading";

const courses = [
  {
    title: "Computer Applications",
    category: "Technology",
    duration: "To be confirmed",
    slug: "computer-applications",
    description: "Explore programming, software, and digital technology.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Business Studies",
    category: "Management",
    duration: "To be confirmed",
    slug: "business-studies",
    description: "Learn about business, management, and entrepreneurship.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Science and Research",
    category: "Science",
    duration: "To be confirmed",
    slug: "science-research",
    description: "Build scientific knowledge through study and exploration.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Information Technology",
    category: "Technology",
    duration: "To be confirmed",
    slug: "information-technology",
    description: "Discover networks, information systems, and computing.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Commerce",
    category: "Management",
    duration: "To be confirmed",
    slug: "commerce",
    description: "Explore accounting, finance, and commercial principles.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Applied Science",
    category: "Science",
    duration: "To be confirmed",
    slug: "applied-science",
    description: "Connect scientific concepts with practical applications.",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80",
  },
];

const categories = ["All", "Technology", "Management", "Science"];

export default function Courses() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        category === "All" || course.category === category;

      const matchesSearch = `${course.title} ${course.description}`
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  return (
    <>
      <section className="page-banner bg-slate-950 px-5 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
            Academics
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Explore our programs
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-slate-300">
            Browse areas of study and discover opportunities to
            develop your interests and skills.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Course catalogue"
          title="Find your area of study"
          description="Search and filter the sample program catalogue."
        />

        <div className="mt-8 flex max-w-xl items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
          <Search className="shrink-0 text-slate-400" size={20} />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search programs..."
            aria-label="Search courses"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                category === item
                  ? "bg-blue-800 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="mt-7 text-sm text-slate-500">
          {filteredCourses.length} program
          {filteredCourses.length !== 1 ? "s" : ""} displayed
        </p>

        {filteredCourses.length > 0 ? (
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl bg-slate-50 px-6 py-12 text-center">
            <BookOpen className="mx-auto text-slate-400" size={32} />
            <h2 className="mt-4 font-semibold text-slate-900">
              No matching programs
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Try another search or category.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
