"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { useSessionClient } from "@/core/session";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const { session } = useSessionClient();

  const user = session?.user; // Assuming the session object has a user property
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const loggedOutLinks = [
    { label: "Explore", href: "/explore" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const loggedInLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Events", href: "/events" },
    { label: "Explore", href: "/explore" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const navLinks = user ? loggedInLinks : loggedOutLinks;

  const isActive = (href: string) => pathname === href;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully!");
          router.push("/auth/signin");
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link
            href="/"
            className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            EventHive
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`font-medium transition-colors ${
                      active
                        ? "text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400 pb-1"
                        : "text-foreground/80 hover:text-emerald-600 dark:hover:text-emerald-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link
                  href="/auth/signin"
                  className={`font-medium transition-colors ${
                    isActive("/auth/signin")
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-foreground/80 hover:text-emerald-600 dark:hover:text-emerald-400"
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-medium py-2 px-5 rounded-lg transition-colors shadow-sm hover:shadow-md"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/profile"
                  className={`font-medium transition-colors ${
                    isActive("/profile")
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-foreground/80 hover:text-emerald-600 dark:hover:text-emerald-400"
                  }`}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <FiX className="w-6 h-6 text-foreground" />
            ) : (
              <FiMenu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0"
          }`}
          aria-hidden={!isMenuOpen}
        >
          <ul className="flex flex-col gap-2 pb-4">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block w-full py-2 px-3 rounded-lg font-medium transition-colors ${
                      active
                        ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30"
                        : "text-foreground/80 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-muted/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            {/* Mobile auth actions */}
            {!user ? (
              <>
                <li className="mt-2 pt-2 border-t border-border/40">
                  <Link
                    href="/auth/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block w-full py-2 px-3 rounded-lg text-center font-medium transition-colors ${
                      isActive("/auth/signin")
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-foreground/80 hover:text-emerald-600 dark:hover:text-emerald-400"
                    }`}
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full py-2.5 px-3 rounded-lg text-center bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-medium transition-colors"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="mt-2 pt-2 border-t border-border/40">
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block w-full py-2 px-3 rounded-lg text-center font-medium transition-colors ${
                      isActive("/profile")
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-foreground/80 hover:text-emerald-600 dark:hover:text-emerald-400"
                    }`}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="block w-full py-2.5 px-3 rounded-lg text-center text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
