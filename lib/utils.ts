import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const extractText = (htmlContent: string): string => {
  // Estrae il testo pulito rimuovendo tutti i tag HTML
  const textMatch = htmlContent.match(/<p[^>]*>(.*?)<\/p>/);
  let text = textMatch ? textMatch[1] : "Testo";
  
  // Rimuove tutti i tag HTML dal testo
  text = text.replace(/<[^>]*>/g, '');
  
  return text;
};