// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import {
  FiHome,
  FiInfo,
  FiMail,
  FiBookOpen,
  FiGrid,
  FiMenu,
  FiPlus,
  FiUser,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import { FaPenFancy } from "react-icons/fa";

// Define routes for both states
const loggedOutRoutes = [
  { name: "Home", href: "/", icon: FiHome },
  { name: "About", href: "/about", icon: FiInfo },
  { name: "Contact", href: "/contact", icon: FiMail },
];

const loggedInRoutes = [
  { name: "Home", href: "/", icon: FiHome },
  { name: "Dashboard", href: "/dashboard", icon: FiGrid },
  { name: "Stories", href: "/stories", icon: FiBookOpen },
  { name: "Write", href: "/write", icon: FiPlus },
  { name: "Profile", href: "/profile", icon: FiUser },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // toggle for demo
  const pathname = usePathname();

  const routes = isLoggedIn ? loggedInRoutes : loggedOutRoutes;

  // Toggle auth state (for demo purposes)
  const handleAuthToggle = () => {
    setIsLoggedIn(!isLoggedIn);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex max-w-full items-center justify-between px-4 py-3 md:px-6">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600">
            <FaPenFancy className="text-base text-white" />
          </div>
          <span className="text-lg font-bold text-stone-800 dark:text-stone-100">
            Story
            <span className="text-amber-600 dark:text-amber-400">Canvas</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {routes.map((route) => {
            const Icon = route.icon;
            const active = pathname === route.href;
            return (
              <Link
                key={route.name}
                href={route.href}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
                }`}
              >
                <Icon className="text-base" />
                {route.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  className="cursor-pointer ring-2 ring-transparent transition hover:ring-amber-400/60"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu" variant="flat">
                <DropdownItem
                  key="profile"
                  startContent={<FiUser className="text-amber-500" />}
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  startContent={<FiSettings className="text-stone-500" />}
                >
                  Settings
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  className="text-rose-600"
                  startContent={<FiLogOut className="text-rose-500" />}
                  onPress={handleAuthToggle}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              as={Link}
              href="/login"
              size="sm"
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm transition hover:shadow-amber-500/30"
              onPress={() => setIsMenuOpen(false)}
            >
              Log In
            </Button>
          )}

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 transition hover:border-stone-300 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 md:hidden"
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FiMenu className="text-xl" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800">
          <div className="flex flex-col gap-1 px-4 py-4">
            {routes.map((route) => {
              const Icon = route.icon;
              const active = pathname === route.href;
              return (
                <Link
                  key={route.name}
                  href={route.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition ${
                    active
                      ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                      : "text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
                  }`}
                >
                  <Icon
                    className={`text-xl ${active ? "text-amber-500" : "text-stone-400"}`}
                  />
                  {route.name}
                </Link>
              );
            })}

            <hr className="my-2 border-stone-200 dark:border-stone-800" />

            {isLoggedIn ? (
              <Button
                fullWidth
                className="mt-2 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:hover:bg-rose-950/50"
                startContent={<FiLogOut className="text-rose-500" />}
                onPress={handleAuthToggle}
              >
                Logout
              </Button>
            ) : (
              <Button
                as={Link}
                href="/login"
                fullWidth
                className="mt-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md"
                onPress={() => setIsMenuOpen(false)}
              >
                Log In
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
