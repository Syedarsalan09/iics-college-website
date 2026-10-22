
import FacultyCard from "../components/cards/FacultyCard";
import SectionHeading from "../components/common/SectionHeading";

const facultyMembers = [
  {
    name: "Faculty profile",
    position: "Academic educator",
    department: "Department to be confirmed",
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Faculty profile",
    position: "Academic educator",
    department: "Department to be confirmed",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Faculty profile",
    position: "Academic educator",
    department: "Department to be confirmed",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Faculty profile",
    position: "Academic educator",
    department: "Department to be confirmed",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80",
  },
];

export default function Faculty() {
  return (
    <>
      <section className="page-banner bg-slate-950 px-5 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
            Our educators
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Meet our faculty
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-slate-300">
            Discover the educators who support academic learning
            and student development.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Faculty directory"
          title="Our academic community"
          description="Faculty names, qualifications, and departments shown here are placeholders for the college's verified directory."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {facultyMembers.map((faculty, index) => (
            <FacultyCard key={index} faculty={faculty} />
          ))}
        </div>
      </section>
    </>
  );
}
