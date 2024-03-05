import tinycolor from 'tinycolor2';

export function DisplayAnalogousColors(color: any) {
  const colors = tinycolor(`#${color}`).analogous(3, 6);

  const results = colors.map((t) => {
    return t.toHexString();
  });
  return results;
}

export function DisplayMonochromaticColors(color: any) {
  const colors = tinycolor(`#${color}`).monochromatic(9);

  const results = colors.map((t) => {
    return t.toHexString();
  });
  return results;
}

export function DisplaySplitComplimentColors(color: any) {
  const colors = tinycolor(`#${color}`).splitcomplement();

  const results = colors.map((t) => {
    return t.toHexString();
  });
  return results;
}

export function DisplayTriadColors(color: any) {
  const colors = tinycolor(`#${color}`).triad();

  const results = colors.map((t) => {
    return t.toHexString();
  });
  return results;
}

export function DisplayTetradColors(color: any) {
  const colors = tinycolor(`#${color}`).tetrad();

  const results = colors.map((t) => {
    return t.toHexString();
  });
  return results;
}

export function DisplayComplimentColors(color: any) {
  const results = tinycolor(`#${color}`).complement().toHexString();
  return results;
}

export function DisplaySpinColors(color: any, deg: number) {
  // 180
  // -90
  // 90
  const results = tinycolor(`#${color}`).spin(deg).toHexString();
  return results;
}

export function DisplayLightenColors(color: any, value: number) {
  return tinycolor(`#${color}`).lighten(value);
}

export function DisplayDarkenColors(color: any, value: number) {
  return tinycolor(`#${color}`).darken(value);
}

export function DisplayDesaturateColors(color: any, value: number) {
  return tinycolor(`#${color}`).desaturate(value);
}

export function DisplaySaturateColors(color: any, value: number) {
  return tinycolor(`#${color}`).saturate(value);
}
