import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ApiError, apiRequest } from "../../lib/api";
import { clearAdminToken, getAdminToken } from "../../lib/adminAuth";
import Loading from "../common/Loading";

export default function AdminRoute() {
  const location = useLocation();
  const [authState, setAuthState] = useState(() => ({
    status: getAdminToken() ? "checking" : "unauthenticated",
    error: "",
    attempt: 0,
  }));

  useEffect(() => {
    if (!getAdminToken()) {
      return undefined;
    }

    const controller = new AbortController();

    apiRequest("/auth/me", { signal: controller.signal }, { authenticated: true })
      .then(() => {
        setAuthState((current) => ({
          ...current,
          status: "authenticated",
          error: "",
        }));
      })
      .catch((error) => {
        if (controller.signal.aborted) {
          return;
        }

        if (error instanceof ApiError && error.status === 401) {
          clearAdminToken();
          setAuthState((current) => ({
            ...current,
            status: "unauthenticated",
            error: "",
          }));
          return;
        }

        setAuthState((current) => ({
          ...current,
          status: "error",
          error: error.message,
        }));
      });

    return () => controller.abort();
  }, [authState.attempt]);

  if (authState.status === "checking") {
    return <Loading label="Verifying admin session..." />;
  }

  if (authState.status === "unauthenticated") {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (authState.status === "error") {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl items-center px-5">
        <div className="w-full rounded-2xl border border-red-200 bg-white p-7 shadow-lg">
          <h1 className="text-xl font-bold text-slate-900">
            Could not verify your admin session
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600" role="alert">
            {authState.error}
          </p>
          <button
            type="button"
            onClick={() =>
              setAuthState((current) => ({
                ...current,
                status: "checking",
                attempt: current.attempt + 1,
              }))
            }
            className="mt-5 rounded-xl bg-blue-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-900"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return <Outlet />;
}
