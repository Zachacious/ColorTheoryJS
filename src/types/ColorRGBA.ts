import type { ColorHSLA } from "./ColorHSLA";

export type ColorRGBA = {
  r: number;
  g: number;
  b: number;
  a: number;
};

const hueToRgb = (p: number, q: number, t: number): number => {
  let tCalc = t;
  if (tCalc < 0) tCalc += 1;
  if (tCalc > 1) tCalc -= 1;
  if (tCalc < 1 / 6) return p + (q - p) * 6 * tCalc;
  if (tCalc < 1 / 2) return q;
  if (tCalc < 2 / 3) return p + (q - p) * (2 / 3 - tCalc) * 6;
  return p;
};

export const hslaToRgba = (hsla: ColorHSLA): ColorRGBA => {
  const { h, s, l, a } = hsla;
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hueToRgb(p, q, h + 1 / 3);
  const g = hueToRgb(p, q, h);
  const b = hueToRgb(p, q, h - 1 / 3);
  return { r, g, b, a };
};
