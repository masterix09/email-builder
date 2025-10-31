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

export const extractBackgroundColor = (content: string): string => {
  // Cerca classi bg-[valore] nelle classi Tailwind
  const bgClassMatch = content.match(/bg-\[([^\]]+)\]/);
  if (bgClassMatch) {
    return bgClassMatch[1];
  }
  
  // Fallback: cerca ancora negli stili CSS inline per compatibilità
  const backgroundColorMatch = content.match(/<div[^>]*style="[^"]*background-color:\s*([^;]+);/);
  const backgroundColor = backgroundColorMatch ? backgroundColorMatch[1].trim() : "#fff";
  return backgroundColor;
};