
export default function FacultyCard({ faculty }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      <img
        src={faculty.image}
        alt={faculty.name}
        loading="lazy"
        className="h-64 w-full rounded-xl bg-slate-100 object-cover object-top"
      />

      <div className="pt-5">
        <h3 className="text-lg font-bold text-slate-900">
          {faculty.name}
        </h3>

        <p className="mt-1 text-sm font-medium text-blue-800">
          {faculty.position}
        </p>

        <p className="mt-3 text-sm text-slate-500">
          {faculty.department}
        </p>
      </div>
    </article>
  );
}
