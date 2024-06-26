import { Color } from "@repo/common";

export const rgbToHex = ({r, g, b}:Color) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }