import { useScreen } from '@/hooks/useScreen';

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  const screen = useScreen();

  return {
    width: screen?.width || 0,
    height: screen?.height || 0,
  };
}
