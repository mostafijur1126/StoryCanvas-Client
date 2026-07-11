import { BsFillPaletteFill } from "react-icons/bs";
import { FiCpu, FiBriefcase, FiActivity } from "react-icons/fi";

interface Interest {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  href?: string; // optional link to category page
}

const defaultInterests: Interest[] = [
  {
    id: "tech",
    name: "Tech",
    description: "AI, Dev, & Cloud",
    icon: <FiCpu className="w-6 h-6" />,
    href: "/explore?category=tech",
  },
  {
    id: "business",
    name: "Business",
    description: "VC, SaaS & IPOs",
    icon: <FiBriefcase className="w-6 h-6" />,
    href: "/explore?category=business",
  },
  {
    id: "arts",
    name: "Arts",
    description: "Digital & Visual",
    icon: <BsFillPaletteFill className="w-6 h-6" />,
    href: "/explore?category=arts",
  },
  {
    id: "sports",
    name: "Sports",
    description: "eSports & Fitness",
    icon: <FiActivity className="w-6 h-6" />,
    href: "/explore?category=sports",
  },
];

interface BrowseInterestsProps {
  interests?: Interest[];
  title?: string;
  className?: string;
}

export default function BrowseInterests({
  interests = defaultInterests,
  title = "Browse by Interest",
  className = "",
}: BrowseInterestsProps) {
  return (
    <section className={`py-16 md:py-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          {title}
        </h2>

        {/* Interest Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {interests.map((interest) => (
            <a
              key={interest.id}
              href={interest.href || "#"}
              className="group block p-6 bg-background/60 backdrop-blur-sm border border-border/60 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 dark:hover:border-emerald-700"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                {/* Icon */}
                <div className="p-3 rounded-full bg-emerald-100/60 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-200/80 dark:group-hover:bg-emerald-800/50 transition-colors">
                  {interest.icon}
                </div>

                {/* Name */}
                <h3 className="text-xl font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {interest.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-foreground/60">
                  {interest.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
