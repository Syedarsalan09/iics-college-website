import { useEffect, useState } from "react";
import { AlertCircle, CalendarDays, Mail, RefreshCw } from "lucide-react";
import { ApiError, apiRequest } from "../lib/api";
import { clearAdminToken } from "../lib/adminAuth";
import Loading from "../components/common/Loading";

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : date.toLocaleString();
}

export default function AdminContactMessages() {
  const [listResult, setListResult] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);
  const loading = listResult?.key !== refreshCount;
  const messages = loading ? [] : listResult.data;
  const error = loading ? "" : listResult.error;

  useEffect(() => {
    const controller = new AbortController();

    apiRequest(
      "/contact",
      { signal: controller.signal },
      { authenticated: true }
    )
      .then((result) => {
        if (!Array.isArray(result)) {
          throw new Error("The server returned an invalid contact message list.");
        }
        setListResult({ key: refreshCount, data: result, error: "" });
      })
      .catch((requestError) => {
        if (controller.signal.aborted) {
          return;
        }

        if (requestError instanceof ApiError && requestError.status === 401) {
          clearAdminToken();
          window.location.replace("/admin/login");
          return;
        }

        setListResult({
          key: refreshCount,
          data: [],
          error: requestError.message,
        });
      });

    return () => controller.abort();
  }, [refreshCount]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
            Administration
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Contact messages
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Review messages submitted through the public Contact page.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setRefreshCount((count) => count + 1)}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800 disabled:cursor-wait disabled:opacity-60"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <Loading label="Loading contact messages..." />
        ) : error ? (
          <div className="p-8 text-center">
            <AlertCircle className="mx-auto text-red-600" size={30} />
            <h2 className="mt-4 text-lg font-bold text-slate-900">
              Could not load contact messages
            </h2>
            <p className="mt-2 text-sm text-slate-600" role="alert">
              {error}
            </p>
            <button
              type="button"
              onClick={() => setRefreshCount((count) => count + 1)}
              className="mt-5 rounded-xl bg-blue-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-900"
            >
              Try again
            </button>
          </div>
        ) : messages.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-800">
              <Mail size={26} />
            </span>
            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No contact messages yet
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              New submissions from the public Contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <p className="text-sm font-semibold text-slate-800">
                {messages.length}{" "}
                {messages.length === 1 ? "message" : "messages"}
                {messages.length === 100 ? " (latest 100)" : ""}
              </p>
              <span className="hidden items-center gap-2 text-xs text-slate-500 sm:inline-flex">
                <CalendarDays size={14} />
                Newest first
              </span>
            </div>
            {messages.map((message) => (
              <article key={message._id} className="px-5 py-5 sm:px-6">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <h2 className="font-semibold text-slate-900">
                      {message.subject}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      {message.name}
                    </p>
                  </div>
                  <time
                    dateTime={message.createdAt}
                    className="text-xs text-slate-500"
                  >
                    {formatDate(message.createdAt)}
                  </time>
                </div>
                <a
                  href={`mailto:${message.email}`}
                  className="mt-2 inline-block text-sm font-medium text-blue-800 hover:underline"
                >
                  {message.email}
                </a>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                  {message.message}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
