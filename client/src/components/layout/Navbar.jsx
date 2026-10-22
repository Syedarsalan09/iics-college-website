
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  GraduationCap,
  Menu,
  X,
  ArrowUpRight,
  Moon,
  Sun,
} from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Courses", path: "/courses" },
  { label: "Faculty", path: "/faculty" },
  { label: "Campus Life", path: "/campus-life" },
  { label: "Notices", path: "/notices" },
];

function ThemeButton({ theme, onToggleTheme }) {
  const isDark = theme === "dark";
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={onToggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="theme-toggle"
    >
      <Icon size={18} />
      <span className="hidden xl:inline">{isDark ? "Light" : "Dark"} mode</span>
    </button>
  );
}

export default function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <span className="brand-mark flex h-11 w-11 items-center justify-center rounded-xl bg-blue-800 text-white">
            <GraduationCap size={27} />
          </span>

          <span>
            <span className="block text-lg font-extrabold tracking-tight text-slate-900">
              IICS
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              College
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link text-sm font-medium transition ${
                  isActive
                    ? "text-blue-800"
                    : "text-slate-600 hover:text-blue-800"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <ThemeButton theme={theme} onToggleTheme={onToggleTheme} />

          <Link
            to="/admin/login"
            className="rounded-xl border border-blue-200 px-4 py-2.5 text-sm font-semibold text-blue-800 transition hover:border-blue-300 hover:bg-blue-50"
          >
            Admin Login
          </Link>

          <Link
            to="/admissions"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-800 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-0.5 hover:bg-blue-900"
          >
            Apply Now
            <ArrowUpRight size={16} />
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeButton theme={theme} onToggleTheme={onToggleTheme} />
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="menu-toggle"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="mobile-nav border-t border-slate-100 bg-white px-5 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `mobile-nav-link rounded-lg px-3 py-3 text-sm font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-800"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <Link
              to="/admin/login"
              onClick={closeMenu}
              className="mobile-nav-link rounded-lg px-3 py-3 text-sm font-semibold text-blue-800 hover:bg-blue-50"
            >
              Admin Login
            </Link>

            <Link
              to="/admissions"
              onClick={closeMenu}
              className="mt-2 rounded-xl bg-blue-800 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Apply for Admission
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
