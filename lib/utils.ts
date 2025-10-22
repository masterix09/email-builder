import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const extractText = (htmlContent: string): string => {
  const match = htmlContent.match(/<p[^>]*>(.*?)<\/p>/);
  return match ? match[1] : "Testo";
};