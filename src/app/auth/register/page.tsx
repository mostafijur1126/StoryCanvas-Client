"use client";

import { useState } from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FiZap, FiGlobe, FiEye, FiEyeOff } from "react-icons/fi";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // ---------- API INTEGRATION ----------
    // Replace with your actual registration endpoint:
    // const res = await fetch('/api/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, imageUrl, password }),
    // });
    // if (res.ok) { router.push('/signin'); }
    console.log("Register attempt:", { name, email, imageUrl, password });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    alert("Registration successful! (demo)");
    // Reset form or redirect
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Right: Branding Panel (same as sign-in) */}
      <div className="hidden lg:flex flex-col justify-center px-12 py-16 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 dark:from-emerald-950/20 dark:via-background dark:to-emerald-950/10">
        <div className="max-w-md mx-auto">
          {/* Brand */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
              EventHive
            </h2>
          </div>

          {/* Welcome */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-foreground">
              Join the community
            </h3>
            <p className="text-foreground/60 mt-2 leading-relaxed">
              Experience the world's most innovative platform for finding,
              creating, and sharing unforgettable events.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-emerald-100/60 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                <FiZap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">High Velocity</h4>
                <p className="text-sm text-foreground/60">
                  Discover events in seconds with our optimized SaaS engine.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-emerald-100/60 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                <FiGlobe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">
                  Global Network
                </h4>
                <p className="text-sm text-foreground/60">
                  Connect with creators from over 120 countries worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Left: Register Form */}
      <div className="flex items-center justify-center px-6 py-12 sm:px-8 lg:px-12 bg-background">
        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Create account
            </h1>
            <p className="text-foreground/60 mt-1">
              Join the community and start exploring.
            </p>
          </div>

          {/* Social Sign Up - Google only */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-border/60 rounded-lg hover:bg-muted/50 transition-colors text-foreground/80 font-medium"
          >
            <FaGoogle className="w-5 h-5" />
            Google
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/40" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-background text-foreground/40">
                Or continue with
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground/70 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Rivera"
                required
                className="w-full px-4 py-3 bg-background border border-border/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition text-foreground placeholder:text-foreground/40"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground/70 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
                className="w-full px-4 py-3 bg-background border border-border/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition text-foreground placeholder:text-foreground/40"
              />
            </div>

            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-foreground/70 mb-1"
              >
                Profile Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-4 py-3 bg-background border border-border/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition text-foreground placeholder:text-foreground/40"
              />
              <p className="mt-1 text-xs text-foreground/40">
                Optional – used for your profile avatar.
              </p>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground/70 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  minLength={8}
                  className="w-full px-4 py-3 pr-12 bg-background border border-border/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition text-foreground placeholder:text-foreground/40"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/60 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating account..." : "Register"}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-foreground/60">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
