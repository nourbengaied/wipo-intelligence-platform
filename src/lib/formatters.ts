/**
 * Utility functions for the application
 */

/**
 * Convert a URL slug to a properly capitalized display name
 * @param slug - The URL slug (e.g., "united-arab-emirates")
 * @returns Capitalized name (e.g., "United Arab Emirates")
 */
export const slugToTitle = (slug: string): string => {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
