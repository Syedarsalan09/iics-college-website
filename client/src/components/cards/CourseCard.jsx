
import { ArrowUpRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60">
      <div className="relative h-48 overflow-hidden bg-blue-50">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-blue-800 shadow-sm backdrop-blur">
          {course.category}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900">
          {course.title}
        </h3>

        <p className="mt-3 min-h-14 text-sm leading-6 text-slate-600">
          {course.description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Clock3 size={15} />
            {course.duration}
          </span>

          <Link
            to={`/courses/${course.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-800 hover:text-blue-950"
          >
            Explore
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
