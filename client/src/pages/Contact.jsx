
import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <>
      <section className="page-banner bg-slate-950 px-5 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
            Get in touch
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Contact IICS College
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-slate-300">
            Contact the college for information about programs,
            admissions, and campus services.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading
            eyebrow="Contact information"
            title="We'd like to hear from you"
            description="Replace these placeholders with the college's official contact details."
          />

          <div className="mt-8 space-y-5">
            <div className="flex gap-4 rounded-xl border border-slate-200 p-5">
              <MapPin className="shrink-0 text-blue-800" size={22} />
              <div>
                <h2 className="font-semibold text-slate-900">
                  College address
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Official address to be added.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl border border-slate-200 p-5">
              <Phone className="shrink-0 text-blue-800" size={22} />
              <div>
                <h2 className="font-semibold text-slate-900">
                  Phone
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Official phone number to be added.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl border border-slate-200 p-5">
              <Mail className="shrink-0 text-blue-800" size={22} />
              <div>
                <h2 className="font-semibold text-slate-900">
                  Email
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Official email address to be added.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
  <iframe
    title="IICS College location on Google Maps"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14081.275696516042!2d81.85988418880429!3d25.451548075510015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399acaa651c6f665%3A0xfe27d8682e68212f!2sIICS%20COLLEGE%20%7C%20BCA%20%7C%20MCA%20%7C%20PGDCA%20%7C%20O%20%26%20A%20Level%20%7C%20BBA%20%7C%20MBA!5e0!3m2!1sen!2sin!4v1792651888774!5m2!1sen!2sin"
    width="100%"
    height="300"
    style={{ border: 0 }}
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>
        </div>

        <div className="h-fit rounded-2xl border border-slate-200 p-6 sm:p-8">
          {sent ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="mx-auto text-green-600" size={44} />

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                Message form validated
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                This demonstration has not sent or stored your message.
                We'll connect it to the backend next.
              </p>

              <button
                type="button"
                onClick={() => {
                  setForm(initialForm);
                  setSent(false);
                }}
                className="mt-6 rounded-lg bg-blue-800 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-900"
              >
                Write another message
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-slate-900">
                Send us a message
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Complete the form below.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Your name *
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    autoComplete="name"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email address *
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Subject *
                  </label>

                  <input
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    maxLength={150}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Message *
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    maxLength={2000}
                    rows={5}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    placeholder="Write your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 py-3 font-semibold text-white hover:bg-blue-900"
                >
                  Submit message
                  <Send size={17} />
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  );
}
