import type { ColorRGBA } from "./ColorRGBA";

export type ColorHSLA = {
  h: number;
  s: number;
  l: number;
  a: number;
};

export const rgbaToHsla = (rgba: ColorRGBA): ColorHSLA => {
  const { r, g, b, a } = rgba;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  const h =
    d === 0
      ? 0
      : (max === r
          ? (g - b) / d + (g < b ? 6 : 0)
          : max === g
          ? (b - r) / d + 2
          : (r - g) / d + 4) / 6;
  return { h, s, l, a };
};
