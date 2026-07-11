import { FiUser, FiCode, FiPenTool, FiBriefcase } from "react-icons/fi";

interface TeamMember {
  name: string;
  role: string;
  icon: React.ReactNode;
}

const teamMembers: TeamMember[] = [
  {
    name: "Sarah Chen",
    role: "Co-Founder & CEO",
    icon: <FiUser className="w-6 h-6" />,
  },
  { name: "Marcus Thorne", role: "CTO", icon: <FiCode className="w-6 h-6" /> },
  {
    name: "Elena Rodriguez",
    role: "Head of Design",
    icon: <FiPenTool className="w-6 h-6" />,
  },
  {
    name: "Alex Chen",
    role: "Product Strategy",
    icon: <FiBriefcase className="w-6 h-6" />,
  },
  {
    name: "James Wilson",
    role: "Product Strategy",
    icon: <FiBriefcase className="w-6 h-6" />,
  },
];

export default function AboutTeam() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          Meet the Hive
        </h2>
        <p className="text-center text-foreground/60 max-w-2xl mx-auto mb-12">
          A diverse group of designers, engineers, and community builders
          dedicated to the art of gathering.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-background/60 backdrop-blur-sm border border-border/60 rounded-xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 dark:hover:border-emerald-700"
            >
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-emerald-100/60 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                  {member.icon}
                </div>
              </div>
              <h3 className="text-base font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="text-sm text-foreground/60">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
