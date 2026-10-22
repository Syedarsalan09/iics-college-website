
import { Link } from "react-router-dom";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from "lucide-react";

const quickLinks = [
  { label: "About IICS", path: "/about" },
  { label: "Our Courses", path: "/courses" },
  { label: "Admissions", path: "/admissions" },
  { label: "Faculty", path: "/faculty" },
  { label: "Campus Life", path: "/campus-life" },
  { label: "Notices", path: "/notices" },
];

export default function Footer() {
  return (
    <footer className="site-footer bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white">
              <GraduationCap size={26} />
            </span>
            <span className="text-xl font-bold text-white">IICS College</span>
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
            A place to learn, grow, explore new opportunities, and
            prepare for the future.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Quick Links</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="footer-link transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white">Contact Us</h3>

          <div className="mt-5 space-y-4 text-sm leading-6 text-slate-400">
            <p className="flex gap-3">
              <MapPin className="mt-1 shrink-0 text-blue-400" size={18} />
              <span>16, Bharadwaj Ashram Rd, Tagore Town, Prayagraj, Uttar Pradesh 211002</span>
            </p>

            <p className="flex gap-3">
              <Phone className="mt-1 shrink-0 text-blue-400" size={18} />
              <span>8953106476</span>
            </p>

            <p className="flex gap-3">
              <Mail className="mt-1 shrink-0 text-blue-400" size={18} />
              <span>info@iicscollege.edu</span>
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">Start Your Journey</h3>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            Explore our programs and learn about the admission process.
          </p>

          <Link
            to="/admissions"
            className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-300 hover:text-white"
          >
            Admission information
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} IICS College. All rights reserved.</p>
          <p>Designed for learning and opportunity.</p>
        </div>
      </div>
    </footer>
  );
}
