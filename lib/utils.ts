import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export type Question = {
  id: number;
  text: string;
  options?: string[];
  correctAnswer?: string;
  imageURL?: string;
  type: string;
  intro?: {
    text: string;
    imageURL?: string;
    type: string;
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
