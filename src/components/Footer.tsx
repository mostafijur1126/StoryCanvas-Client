import { FiVideo, FiMic, FiMusic } from "react-icons/fi";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const categories: FooterLink[] = [
  { label: "Tech Events", href: "/explore?category=tech" },
  { label: "Workshops", href: "/explore?category=workshops" },
  { label: "Business Summits", href: "/explore?category=business" },
  { label: "Cultural Arts", href: "/explore?category=arts" },
];

const platform: FooterLink[] = [
  { label: "For Organizers", href: "/organizers" },
  { label: "Partner Program", href: "/partners" },
  { label: "Ticket Resale", href: "/resale" },
  { label: "Help Center", href: "/help" },
];

const legal: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

const mediaIcons = [
  { icon: FiVideo, label: "Video" },
  { icon: FiMic, label: "Podcast" },
  { icon: FiMusic, label: "Music" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              EventHive
            </h2>
            <p className="text-sm text-foreground/70 max-w-xs leading-relaxed">
              Connecting the world’s most ambitious professionals with
              transformative experiences.
            </p>
            <div className="flex gap-3 pt-2">
              {mediaIcons.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="p-2 rounded-full bg-muted/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-foreground/60 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-foreground/50 mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Column */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-foreground/50 mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              {platform.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-foreground/50 mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {legal.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Row */}
        <div className="mt-10 pt-6 border-t border-border/40 text-center text-xs text-foreground/50">
          <p>
            &copy; {currentYear} EventHive. All rights reserved.
            <span className="block sm:inline sm:ml-2">
              Designed for high‑velocity SaaS.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
