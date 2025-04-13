import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string, handling Tailwind CSS conflicts.
 * This utility uses clsx for conditional class joining and tailwind-merge to handle
 * Tailwind CSS class conflicts properly.
 *
 * @param inputs - Class names or conditional class objects
 * @returns A merged string of class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
