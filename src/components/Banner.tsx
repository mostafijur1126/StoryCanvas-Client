// components/Banner.tsx
"use client";

import { Button } from "@heroui/react";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { FaPenFancy } from "react-icons/fa";

interface BannerProps {
  title?: string;
  subtitle?: string;
  primaryText?: string;
  secondaryText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  backgroundImage?: string;
  badge?: string;
}

export default function Banner({
  title = "Share Your Stories with the World",
  subtitle = "StoryCanvas is the creative space where writers, bloggers, and storytellers bring their ideas to life. Join our community and start publishing today.",
  primaryText = "Get Started",
  secondaryText = "Watch Demo",
  onPrimaryClick = () => {},
  onSecondaryClick = () => {},
  backgroundImage,
  badge = "✨ New",
}: BannerProps) {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-950 dark:to-stone-900">
      {/* Optional background image with overlay */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center md:py-28 lg:py-32">
        {/* Badge */}
        {badge && (
          <span className="mb-6 inline-flex items-center rounded-full bg-amber-100/80 px-4 py-1.5 text-sm font-medium text-amber-800 backdrop-blur-sm dark:bg-amber-900/40 dark:text-amber-300">
            {badge}
          </span>
        )}

        {/* Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-xl shadow-amber-500/25">
          <FaPenFancy className="text-3xl text-white" />
        </div>

        {/* Title */}
        <h1 className="mb-4 max-w-3xl text-4xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 sm:text-5xl md:text-6xl">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="mb-8 max-w-2xl text-base text-stone-600 dark:text-stone-400 sm:text-lg md:text-xl">
          {subtitle}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            as="button"
            onPress={onPrimaryClick}
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25 transition-all duration-300 hover:scale-105 hover:shadow-amber-500/40"
            startContent={<FiArrowRight className="text-lg" />}
          >
            {primaryText}
          </Button>

          <Button
            as="button"
            onPress={onSecondaryClick}
            size="lg"
            variant="bordered"
            className="border-stone-300 text-stone-700 transition-all hover:border-amber-500 hover:bg-amber-50 dark:border-stone-700 dark:text-stone-300 dark:hover:border-amber-500 dark:hover:bg-amber-950/30"
            startContent={<FiPlay className="text-lg" />}
          >
            {secondaryText}
          </Button>
        </div>

        {/* Optional decorative elements */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl dark:bg-amber-500/10" />
          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-stone-300/20 blur-3xl dark:bg-stone-500/10" />
        </div>
      </div>
    </section>
  );
}
