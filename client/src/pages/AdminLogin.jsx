import { useState } from "react";
import { GraduationCap, LogIn } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ApiError, apiRequest } from "../lib/api";
import { setAdminToken } from "../lib/adminAuth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) {
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const result = await apiRequest(
        "/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        },
        { expectedStatus: 200 }
      );

      if (typeof result?.token !== "string" || !result.token) {
        throw new Error("The server did not return an admin token.");
      }

      setAdminToken(result.token);
      navigate(location.state?.from || "/admin/admissions", { replace: true });
    } catch (requestError) {
      if (requestError instanceof ApiError) {
        setError(requestError.message);
      } else if (requestError instanceof TypeError) {
        setError(
          "Could not connect to the admin service. Check that the backend is running and try again."
        );
      } else {
        setError(requestError.message);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-7 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-blue-200 ring-1 ring-white/20">
            <GraduationCap size={31} />
          </span>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
            IICS College
          </p>
        </div>

        <section className="rounded-3xl border border-white/50 bg-white p-7 shadow-2xl shadow-black/25 sm:p-9">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Admin sign in
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Sign in with your administrator account to manage admission inquiries.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            {error && (
              <p
                className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
                role="alert"
              >
                {error}
              </p>
            )}

            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email address
              </label>
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                required
                maxLength={254}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-800 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogIn size={17} />
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </section>

        <Link
          to="/"
          className="mt-6 block text-center text-sm font-medium text-blue-100 transition hover:text-white"
        >
          Return to public website
        </Link>
      </div>
    </main>
  );
}
