
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

export default function NoticeCard({ notice }) {
  return (
    <article className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg">
      <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-blue-50 text-blue-800">
        <CalendarDays size={19} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-500">
          {notice.date}
        </p>

        <h3 className="mt-2 font-semibold leading-6 text-slate-900">
          {notice.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {notice.description}
        </p>

        <Link
          to="/notices"
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-800"
        >
          Read notice
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  );
}
