
import { useRef, useState } from "react";
import { CheckCircle2, ClipboardList, GraduationCap } from "lucide-react";
import { apiRequest } from "../lib/api";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  program: "",
  education: "",
  message: "",
};

export default function Admissions() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const submittingRef = useRef(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (submittingRef.current) {
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setError("");

    try {
      const result = await apiRequest(
        "/admissions",
        {
          method: "POST",
          body: JSON.stringify(form),
        },
        { expectedStatus: 201 }
      );

      if (
        !result ||
        typeof result.applicationNumber !== "string" ||
        !result.applicationNumber
      ) {
        throw new Error("The server did not return an application number.");
      }

      setApplicationNumber(result.applicationNumber);
      setForm(initialForm);
      setSubmitted(true);
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? "Could not connect to the admissions service. Check your connection and try again."
          : requestError.message
      );
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="page-banner bg-slate-950 px-5 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
            Join IICS
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">
            Begin your admission journey.
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-slate-300">
            Learn about the application process and submit your
            preliminary interest in a program.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <ClipboardList className="text-blue-800" size={34} />

          <h2 className="mt-5 text-2xl font-bold text-slate-900">
            Application information
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Use the form to provide your contact information and
            preferred program. The official application requirements,
            deadlines, and eligibility criteria should be confirmed
            by the college.
          </p>

          <div className="mt-8 rounded-2xl bg-blue-50 p-6">
            <GraduationCap className="text-blue-800" size={28} />

            <h3 className="mt-4 font-bold text-slate-900">
              Need help?
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Contact the college admissions office for official
              information about programs and application requirements.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {submitted ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="mx-auto text-green-600" size={46} />

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                Inquiry submitted
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Your admission inquiry was received successfully. Your
                application number is{" "}
                <strong>{applicationNumber}</strong>.
              </p>

              <button
                type="button"
                onClick={() => {
                  setForm(initialForm);
                  setSubmitted(false);
                  setApplicationNumber("");
                  setError("");
                }}
                className="mt-6 rounded-lg bg-blue-800 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-900"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-slate-900">
                Admission inquiry
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Fields marked with * are required.
              </p>

              <form
                onSubmit={handleSubmit}
                aria-busy={submitting}
                className="mt-7 space-y-5"
              >
                {error && (
                  <p
                    className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
                    role="alert"
                  >
                    {error}
                  </p>
                )}
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full name *
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    autoComplete="name"
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      maxLength={254}
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Phone *
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      pattern="[0-9+() -]{7,20}"
                      autoComplete="tel"
                      placeholder="Phone number"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="program"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Interested program *
                  </label>

                  <select
                    id="program"
                    name="program"
                    value={form.program}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select a program</option>
                    <option value="computer-applications">
                      Computer Applications
                    </option>
                    <option value="business-studies">
                      Business Studies
                    </option>
                    <option value="science-research">
                      Science and Research
                    </option>
                    <option value="information-technology">
                      Information Technology
                    </option>
                    <option value="commerce">Commerce</option>
                    <option value="applied-science">Applied Science</option>
                    <option value="other">Other / Not sure</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="education"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Previous education *
                  </label>

                  <input
                    id="education"
                    name="education"
                    value={form.education}
                    onChange={handleChange}
                    required
                    maxLength={150}
                    placeholder="Your most recent qualification"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Additional message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    maxLength={1000}
                    placeholder="Questions or information you would like to share"
                    className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-lg bg-blue-800 px-5 py-3 font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Submitting inquiry..." : "Submit inquiry"}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  );
}
