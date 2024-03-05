import { randomColor } from '@/helpers/index';
import { useEffect, useState } from 'react';

interface Color {
  hex: any;
}

export function useRandomColor(): Color {
  const initialColor = randomColor();

  const [hex, setHex] = useState(initialColor);
  useEffect(() => {
    setHex(initialColor);
  }, []);
  return { hex };
}
