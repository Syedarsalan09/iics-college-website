import { GraduationCap, LogOut } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { clearAdminToken } from "../../lib/adminAuth";

export default function AdminLayout() {
  const navigate = useNavigate();

  function signOut() {
    clearAdminToken();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-800 text-white shadow-lg shadow-blue-900/15">
              <GraduationCap size={26} />
            </span>
            <div>
              <p className="font-extrabold tracking-tight text-slate-900">
                IICS College
              </p>
              <p className="text-xs font-medium text-slate-500">
                Admin dashboard
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
