import { Box, Center, chakra, VisuallyHidden } from '@chakra-ui/react';
import * as React from 'react';
import { randomColor } from '@/helpers/index';

const Bar = chakra('span', {
  baseStyle: {
    display: 'block',
    pos: 'absolute',
    w: '1.25rem',
    h: '0.125rem',
    rounded: 'full',
    bg: 'currentcolor',
    mx: 'auto',
    insetStart: '0.125rem',
    transition: 'all 0.12s',
  },
});

const ToggleIcon = (props: { active: boolean }) => {
  const { active } = props;
  const color = randomColor();
  return (
    <Box
      className="group"
      data-active={active ? '' : undefined}
      as="span"
      display="block"
      w="1.5rem"
      h="1.5rem"
      pos="relative"
      aria-hidden
      pointerEvents="none"
    >
      <Bar
        color={color}
        top="0.4375rem"
        _groupActive={{ top: '0.6875rem', transform: 'rotate(45deg)' }}
      />
      <Bar
        color={color}
        bottom="0.4375rem"
        _groupActive={{ bottom: '0.6875rem', transform: 'rotate(-45deg)' }}
      />
    </Box>
  );
};

interface ToggleButtonProps {
  isOpen: boolean;
  onClick(): void;
}

export const ToggleButton = (props: ToggleButtonProps) => {
  const { isOpen, onClick } = props;
  return (
    <Center marginStart="-6" px="4" py="4" as="button" onClick={onClick}>
      <ToggleIcon active={isOpen} />
      <VisuallyHidden>Toggle Menu</VisuallyHidden>
    </Center>
  );
};
