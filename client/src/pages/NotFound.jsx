
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-5 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-blue-700">
        404 — Page not found
      </p>

      <h1 className="mt-4 text-4xl font-bold text-slate-900">
        We couldn't find that page.
      </h1>

      <p className="mt-4 text-slate-600">
        The page may have moved or the address may be incorrect.
      </p>

      <Link
        to="/"
        className="mt-7 inline-flex items-center gap-2 rounded-lg bg-blue-800 px-5 py-3 font-semibold text-white hover:bg-blue-900"
      >
        <ArrowLeft size={17} />
        Return home
      </Link>
    </section>
  );
}
