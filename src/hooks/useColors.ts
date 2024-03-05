import tinycolor from 'tinycolor2';
import { getColorContrast } from '@/helpers/index';
import convert from 'color-convert';
import useSWR from 'swr';

export function useColors(color: string | string[] | undefined) {
  const primaryColor = color;
  const tinyPrimaryColor = tinycolor(`#${primaryColor}`);
  const fgColor = getColorContrast(tinyPrimaryColor.toHexString());
  const cmyk_value = convert.hex.cmyk(tinyPrimaryColor.toString());

  const fetcher = (url: RequestInfo, headers: any): any =>
    fetch(url, headers).then((r) => r.json());

  const { data: colorData } = useSWR(
    primaryColor ? `https://api.color.pizza/v1/${primaryColor}` : null,
    fetcher,
  );

  const ColorName = colorData?.colors?.map((color: { name: string }) => {
    return color.name;
  });

  return {
    colorData,
    primaryColor,
    tinyPrimaryColor,
    fgColor,
    ColorName,
    cmyk_value,
  };
}
