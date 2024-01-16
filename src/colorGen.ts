import type { ColorHSLA } from '.';

export const rotateHue = (color: ColorHSLA, degrees: number): ColorHSLA => {
  return {
    ...color,
    h: (color.h + degrees) % 360,
  };
};

export const saturate = (color: ColorHSLA, percent: number): ColorHSLA => {
  return {
    ...color,
    s: Math.min(100, color.s + percent),
  };
};

export const lighten = (color: ColorHSLA, percent: number): ColorHSLA => {
  return {
    ...color,
    l: Math.min(100, color.l + percent),
  };
};

export const darken = (color: ColorHSLA, percent: number): ColorHSLA => {
  return {
    ...color,
    l: Math.max(0, color.l - percent),
  };
};

export const desaturate = (color: ColorHSLA, percent: number): ColorHSLA => {
  return {
    ...color,
    s: Math.max(0, color.s - percent),
  };
};

export const perfectCompliment = (color: ColorHSLA): ColorHSLA => {
  return {
    ...color,
    h: (color.h + 180) % 360,
  };
};

export const invert = (color: ColorHSLA): ColorHSLA => {
  return {
    ...color,
    h: (color.h + 180) % 360,
    s: Math.max(0, 100 - color.s),
    l: Math.max(0, 100 - color.l),
  };
};
