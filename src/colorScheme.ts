import type { ColorHSLA } from '.';
import { perfectCompliment, rotateHue } from './colorGen';

// generate a list of 10 css colors from a base color
// from a base HSLA color, with the base color as the middle color,
// generate 5 darker and 4 lighter colors and rrotate the hue by an amount for each value
export const generateSwatchValues = (
  baseColor: ColorHSLA,
  hueRotateionFactor: number,
  valueFactor: number
): ColorHSLA[] => {
  const values = [];
  const baseColorHue = baseColor.h;
  const baseColorLightness = baseColor.l;
  const baseColorSaturation = baseColor.s;
  for (let i = 0; i < 5; i++) {
    const hue = (baseColorHue + hueRotateionFactor * (i - 2)) % 360;
    const lightness = Math.max(
      0,
      Math.min(100, baseColorLightness + valueFactor * (i - 2))
    );
    const saturation = Math.max(
      0,
      Math.min(100, baseColorSaturation + valueFactor * (i - 2))
    );
    values.push({ h: hue, s: saturation, l: lightness, a: 1 });

    // values on the other side
    const hue2 = (baseColorHue + hueRotateionFactor * (i + 3)) % 360;
    const lightness2 = Math.max(
      0,
      Math.min(100, baseColorLightness + valueFactor * (i + 3))
    );
    const saturation2 = Math.max(
      0,
      Math.min(100, baseColorSaturation + valueFactor * (i + 3))
    );
    values.push({ h: hue2, s: saturation2, l: lightness2, a: 1 });
  }
  return values;
};

export const generateCSSVars = (
  colors: ColorHSLA[],
  prefix: string
): string[] => {
  const cssVars = [];
  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];
    cssVars.push(
      `--${prefix}-${i}: hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a})`
    );
  }
  return cssVars;
};

export const generateComplementarySwatches = (
  baseColor: ColorHSLA,
  saturationVariety: number = 3,
  lightnessVariety: number = 3
): ColorHSLA[] => {
  let swatches = [];

  const complimentBase = perfectCompliment(baseColor);

  const baseSwatches = generateSwatchValues(
    baseColor,
    saturationVariety,
    lightnessVariety
  );
  const complimentSwatches = generateSwatchValues(
    complimentBase,
    saturationVariety,
    lightnessVariety
  );

  swatches = [...baseSwatches, ...complimentSwatches];

  return swatches;
};

export const generateMonochromaticSwatches = (
  baseColor: ColorHSLA,
  saturationVariety: number = 3,
  lightnessVariety: number = 3
): ColorHSLA[] => {
  let swatches = [];

  const baseSwatches = generateSwatchValues(
    baseColor,
    saturationVariety,
    lightnessVariety
  );

  swatches = [...baseSwatches];

  return swatches;
};

export const generateAnalogousSwatches = (
  baseColor: ColorHSLA,
  saturationVariety: number = 3,
  lightnessVariety: number = 3
): ColorHSLA[] => {
  let swatches = [];

  const baseSwatches = generateSwatchValues(
    baseColor,
    saturationVariety,
    lightnessVariety
  );

  const leftColor = rotateHue(baseColor, -30);
  const leftSwatches = generateSwatchValues(
    leftColor,
    saturationVariety,
    lightnessVariety
  );

  const rightColor = rotateHue(baseColor, 30);
  const rightSwatches = generateSwatchValues(
    rightColor,
    saturationVariety,
    lightnessVariety
  );

  swatches = [...baseSwatches, ...leftSwatches, ...rightSwatches];

  return swatches;
};

export const generateTriadicSwatches = (
  baseColor: ColorHSLA,
  saturationVariety: number = 3,
  lightnessVariety: number = 3
): ColorHSLA[] => {
  let swatches = [];

  const baseSwatches = generateSwatchValues(
    baseColor,
    saturationVariety,
    lightnessVariety
  );

  const leftColor = rotateHue(baseColor, -120);
  const leftSwatches = generateSwatchValues(
    leftColor,
    saturationVariety,
    lightnessVariety
  );

  const rightColor = rotateHue(baseColor, 120);
  const rightSwatches = generateSwatchValues(
    rightColor,
    saturationVariety,
    lightnessVariety
  );

  swatches = [...baseSwatches, ...leftSwatches, ...rightSwatches];

  return swatches;
};

export const generateSplitComplementarySwatches = (
  baseColor: ColorHSLA,
  saturationVariety: number = 3,
  lightnessVariety: number = 3
): ColorHSLA[] => {
  let swatches = [];

  const complimentBase = perfectCompliment(baseColor);

  const baseSwatches = generateSwatchValues(
    baseColor,
    saturationVariety,
    lightnessVariety
  );
  const leftColor = rotateHue(baseColor, -150);
  const leftSwatches = generateSwatchValues(
    leftColor,
    saturationVariety,
    lightnessVariety
  );

  const rightColor = rotateHue(baseColor, 150);
  const rightSwatches = generateSwatchValues(
    rightColor,
    saturationVariety,
    lightnessVariety
  );

  swatches = [...baseSwatches, ...leftSwatches, ...rightSwatches];

  return swatches;
};

export const generateTetradicSwatches = (
  baseColor: ColorHSLA,
  saturationVariety: number = 3,
  lightnessVariety: number = 3
): ColorHSLA[] => {
  let swatches = [];

  const baseSwatches = generateSwatchValues(
    baseColor,
    saturationVariety,
    lightnessVariety
  );

  const leftColor = rotateHue(baseColor, -90);
  const leftSwatches = generateSwatchValues(
    leftColor,
    saturationVariety,
    lightnessVariety
  );

  const rightColor = rotateHue(baseColor, 90);
  const rightSwatches = generateSwatchValues(
    rightColor,
    saturationVariety,
    lightnessVariety
  );

  const complimentBase = perfectCompliment(baseColor);
  const complimentSwatches = generateSwatchValues(
    complimentBase,
    saturationVariety,
    lightnessVariety
  );

  swatches = [
    ...baseSwatches,
    ...leftSwatches,
    ...rightSwatches,
    ...complimentSwatches,
  ];

  return swatches;
};
