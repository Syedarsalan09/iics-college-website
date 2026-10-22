
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Button({
  children,
  to,
  variant = "primary",
  className = "",
}) {
  const styles = {
    primary: "bg-blue-800 text-white shadow-lg shadow-blue-900/15 hover:-translate-y-0.5 hover:bg-blue-900",
    secondary: "button-secondary border border-slate-300 bg-white text-slate-800 hover:-translate-y-0.5 hover:bg-slate-50",
  };

  const classes = `inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${styles[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
        <ArrowRight size={17} />
      </Link>
    );
  }

  return (
    <button type="button" className={classes}>
      {children}
      <ArrowRight size={17} />
    </button>
  );
}
