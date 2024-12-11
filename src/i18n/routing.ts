import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { LOCALES } from "@/constants";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: LOCALES,

  // Used when no locale matches
  defaultLocale: "ru",
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);