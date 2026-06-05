import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export type MatchItem = {
  term: string;
  definition: string;
};

export type Question = {
  id: number;
  text: string;
  SpecialQuestion?: boolean;
  options?: string[];
  correctAnswer?: string;
  imageURL?: string;
  type: "multiple" | "info" | "match";
  matchItems?: MatchItem[];
  intro?: {
    text: string;
    imageURL?: string;
    type: string;
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
