import { useEffect, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  RefreshCw,
  Users,
} from "lucide-react";
import { ApiError, apiRequest } from "../lib/api";
import { clearAdminToken } from "../lib/adminAuth";
import Loading from "../components/common/Loading";

const admissionStatuses = ["Pending", "Under Review", "Approved", "Rejected"];
const programNames = {
  "computer-applications": "Computer Applications",
  "business-studies": "Business Studies",
  "science-research": "Science and Research",
  "information-technology": "Information Technology",
  commerce: "Commerce",
  "applied-science": "Applied Science",
  other: "Other / Not sure",
};

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : date.toLocaleString();
}

export default function AdminAdmissions() {
  const [listResult, setListResult] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);
  const [savingIds, setSavingIds] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const loading = listResult?.key !== refreshCount;
  const admissions = loading ? [] : listResult.data;
  const error = loading ? "" : listResult.error;

  useEffect(() => {
    const controller = new AbortController();

    apiRequest(
      "/admissions",
      { signal: controller.signal },
      { authenticated: true }
    )
      .then((result) => {
        if (!Array.isArray(result)) {
          throw new Error("The server returned an invalid admissions list.");
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

  async function changeStatus(admission, status) {
    if (status === admission.status || savingIds.includes(admission._id)) {
      return;
    }

    setSavingIds((current) => [...current, admission._id]);
    setFeedback(null);
    try {
      const updated = await apiRequest(
        `/admissions/${encodeURIComponent(admission._id)}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status }),
        },
        { authenticated: true }
      );

      if (!updated || updated.status !== status) {
        throw new Error("The server did not confirm the status change.");
      }

      setListResult((currentResult) => ({
        ...currentResult,
        data: currentResult.data.map((item) =>
          item._id === admission._id ? { ...item, status: updated.status } : item
        ),
      }));
      setFeedback({
        type: "success",
        message: `Status updated for ${admission.applicationNumber}.`,
      });
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        clearAdminToken();
        window.location.replace("/admin/login");
        return;
      }

      setFeedback({
        type: "error",
        message: requestError.message,
      });
    } finally {
      setSavingIds((current) => current.filter((id) => id !== admission._id));
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
            Administration
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Admission inquiries
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Review applicant details and update each inquiry’s status.
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

      {feedback && (
        <p
          className={`mt-6 rounded-xl border p-4 text-sm ${
            feedback.type === "success"
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
          role="status"
        >
          {feedback.message}
        </p>
      )}

      <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <Loading label="Loading admission inquiries..." />
        ) : error ? (
          <div className="p-8 text-center">
            <AlertCircle className="mx-auto text-red-600" size={30} />
            <h2 className="mt-4 text-lg font-bold text-slate-900">
              Could not load admission inquiries
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
        ) : admissions.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-800">
              <Users size={26} />
            </span>
            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No admission inquiries yet
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              New submissions from the public Admissions form will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <p className="text-sm font-semibold text-slate-800">
                {admissions.length} {admissions.length === 1 ? "inquiry" : "inquiries"}
                {admissions.length === 100 ? " (latest 100)" : ""}
              </p>
              <span className="hidden items-center gap-2 text-xs text-slate-500 sm:inline-flex">
                <CalendarDays size={14} />
                Newest first
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1180px] border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-bold">Applicant</th>
                    <th className="px-4 py-3 font-bold">Contact</th>
                    <th className="px-4 py-3 font-bold">Program</th>
                    <th className="px-4 py-3 font-bold">Education</th>
                    <th className="px-4 py-3 font-bold">Message</th>
                    <th className="px-4 py-3 font-bold">Submitted</th>
                    <th className="px-4 py-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {admissions.map((admission) => (
                    <tr key={admission._id} className="align-top transition hover:bg-blue-50/40">
                      <td className="px-4 py-4">
                        <p className="font-semibold text-slate-900">
                          {admission.fullName}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {admission.applicationNumber}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <a
                          href={`mailto:${admission.email}`}
                          className="font-medium text-blue-800 hover:underline"
                        >
                          {admission.email}
                        </a>
                        <p className="mt-1 text-slate-600">{admission.phone}</p>
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        {programNames[admission.program] || admission.program}
                      </td>
                      <td className="max-w-44 whitespace-normal px-4 py-4 text-slate-700">
                        {admission.education}
                      </td>
                      <td className="max-w-56 whitespace-normal px-4 py-4 text-slate-600">
                        {admission.message || "—"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                        {formatDate(admission.createdAt)}
                      </td>
                      <td className="px-4 py-4">
                        <select
                          aria-label={`Status for ${admission.applicationNumber}`}
                          value={admission.status}
                          onChange={(event) =>
                            changeStatus(admission, event.target.value)
                          }
                          disabled={savingIds.includes(admission._id)}
                          className="min-w-36 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-wait disabled:opacity-60"
                        >
                          {admissionStatuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        {savingIds.includes(admission._id) && (
                          <span className="mt-1 block text-xs text-slate-500">
                            Saving...
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-slate-200 px-5 py-3 text-xs text-slate-500">
              On small screens, scroll horizontally to see all applicant details.
            </p>
          </>
        )}
      </section>
    </div>
  );
}
