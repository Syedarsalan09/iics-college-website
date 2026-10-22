
import {
  BookOpen,
  Users,
  Trophy,
  Music,
  Microscope,
  Coffee,
} from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";

const campusActivities = [
  {
    title: "Clubs and communities",
    description:
      "Connect with peers through student groups and shared interests.",
    icon: Users,
  },
  {
    title: "Sports and recreation",
    description:
      "Explore opportunities for physical activity, teamwork, and recreation.",
    icon: Trophy,
  },
  {
    title: "Cultural activities",
    description:
      "Participate in creative activities, performances, and celebrations.",
    icon: Music,
  },
  {
    title: "Academic resources",
    description:
      "Discover spaces and resources for study and independent learning.",
    icon: BookOpen,
  },
  {
    title: "Practical learning",
    description:
      "Explore hands-on learning opportunities and laboratory environments.",
    icon: Microscope,
  },
  {
    title: "Student spaces",
    description:
      "Find places to meet, relax, and connect with the campus community.",
    icon: Coffee,
  },
];

const photos = [
  {
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=80",
    alt: "Students learning together",
  },
  {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
    alt: "Students spending time together",
  },
  {
    src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80",
    alt: "Students collaborating",
  },
];

export default function CampusLife() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 px-5 py-24 text-white lg:px-8">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
            Beyond the classroom
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold sm:text-6xl">
            Experience campus life.
          </h1>

          <p className="mt-6 max-w-2xl leading-8 text-slate-200">
            Learning also happens through friendships, activities,
            creativity, and shared experiences.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Student experience"
          title="Make your college journey memorable"
          description="Explore the kinds of experiences a college community can offer. Actual IICS facilities and activities should be confirmed."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {campusActivities.map((activity) => {
            const Icon = activity.icon;

            return (
              <article
                key={activity.title}
                className="rounded-2xl border border-slate-200 p-6"
              >
                <Icon className="text-blue-800" size={28} />

                <h2 className="mt-5 text-lg font-bold text-slate-900">
                  {activity.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {activity.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Campus gallery"
            title="Life, learning, and community"
            centered
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {photos.map((photo) => (
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-64 w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
