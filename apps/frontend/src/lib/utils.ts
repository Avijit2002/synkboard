import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const COLORS = [
  "#DC6262",
  "#D97706",
  "#059669",
  "#7C3AED"
]

export function usernameToColor(userName:string) {
  //console.log(userName.length)
  return COLORS[userName.length % COLORS.length]
}
