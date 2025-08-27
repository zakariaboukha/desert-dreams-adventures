import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns the appropriate text color class based on the value
 * @param value - The numeric value or string containing a numeric value with a sign
 * @returns A Tailwind CSS class for text color
 */
export function getValueColor(value: number | string): string {
  // If value is a string that starts with a + or has a positive number
  if (typeof value === "string") {
    if (value.trim().startsWith("-")) {
      return "text-red-500";
    } else if (value.trim().startsWith("+")) {
      return "text-green-500";
    }
    // Try to parse the string as a number
    const numValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    return !isNaN(numValue) && numValue < 0
      ? "text-red-500"
      : numValue > 0
        ? "text-green-500"
        : "";
  }

  // If value is a number
  return value < 0 ? "text-red-500" : value > 0 ? "text-green-500" : "";
}

/**
 * Creates a URL-friendly slug from a title
 * @param title - The title to convert to a slug
 * @returns A URL-friendly slug
 */
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/-+/g, '-')          // Replace multiple hyphens with single hyphen
    .trim();
}
