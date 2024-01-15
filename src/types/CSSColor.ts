import { rgbaToHsla, type ColorHSLA } from './ColorHSLA';
import type { ColorRGBA } from './ColorRGBA';

// regex's must support all types of css color values
// hex - #000000, #000, #00000000
const hexRegex = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
// rgb - rgb(0,0,0), rgba(0,0,0,0)
// could be either rgb or rgba
const rgbRegex = /^rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(,(\d{1,3}))?\)$/i;
// hsl - hsl(0,0%,0%), hsla(0,0%,0%,0)
// could be either hsl or hsla
const hslRegex = /^hsla?\((\d{1,3}),(\d{1,3})%,(\d{1,3})%(,(\d{1,3}))?\)$/i;

export type CSSColor = string;

export type AtomicColor = ColorHSLA | ColorRGBA;

export const cssColorToAtomicColor = (cssColor: CSSColor): ColorHSLA => {
  if (hexRegex.test(cssColor)) {
    const hex = cssColor.slice(1);
    const hexLength = hex.length;
    const r = hexLength === 3 ? hex[0] + hex[0] : hex.slice(0, 2);
    const g = hexLength === 3 ? hex[1] + hex[1] : hex.slice(2, 4);
    const b = hexLength === 3 ? hex[2] + hex[2] : hex.slice(4, 6);
    const a = hexLength === 3 ? 'FF' : hex.slice(6, 8);
    const rgba = {
      r: parseInt(r, 16),
      g: parseInt(g, 16),
      b: parseInt(b, 16),
      a: parseInt(a, 16) / 255,
    };
    return rgbaToHsla(rgba);
  }

  if (rgbRegex.test(cssColor)) {
    const rgbaRaw = cssColor.match(rgbRegex);
    const r = rgbaRaw?.[1] ?? '0';
    const g = rgbaRaw?.[2] ?? '0';
    const b = rgbaRaw?.[3] ?? '0';
    const a = rgbaRaw?.[5] ?? '1';
    const rgba = {
      r: parseInt(r),
      g: parseInt(g),
      b: parseInt(b),
      a: a ? parseInt(a) / 255 : 1,
    };
    return rgbaToHsla(rgba);
  }

  if (hslRegex.test(cssColor)) {
    const hslaRaw = cssColor.match(hslRegex);
    const h = hslaRaw?.[1] ?? '0';
    const s = hslaRaw?.[2] ?? '0';
    const l = hslaRaw?.[3] ?? '0';
    const a = hslaRaw?.[5] ?? '1';
    const hsla = {
      h: parseInt(h),
      s: parseInt(s),
      l: parseInt(l),
      a: a ? parseInt(a) : 1,
    };
    return hsla;
  }

  throw new Error('Invalid CSS Color');
};

export const atomicColorToCSSString = (color: AtomicColor): string => {
  if ('r' in color) {
    const { r, g, b, a } = color;
    return `rgba(${r},${g},${b},${a})`;
  }

  if ('h' in color) {
    const { h, s, l, a } = color;
    return `hsla(${h},${s}%,${l}%,${a})`;
  }

  throw new Error('Invalid Atomic Color');
};
