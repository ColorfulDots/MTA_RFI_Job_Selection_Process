import { chakra, HTMLChakraProps, Link } from '@chakra-ui/react';
import * as React from 'react';
import NextLink from 'next/link';
import { getColorContrast } from '@/helpers/index';
import { useRandomColor } from '@/hooks/useRandomColor';

interface NavLinkProps extends HTMLChakraProps<'a'> {
  active?: boolean;
}

const DesktopNavLink = React.forwardRef<NavLinkProps>((props: any, ref) => {
  const { active, color, ...rest } = props;

  return (
    <chakra.a
      as={NextLink}
      ref={ref}
      display="inline-block"
      px="4"
      py="6"
      fontWeight="semibold"
      aria-current={active ? 'page' : undefined}
      color={color}
      transition="all 0.2s"
      {...rest}
      _hover={{ color }}
      _active={{ color }}
      _activeLink={{
        color,
        fontWeight: 'bold',
      }}
    />
  );
});
DesktopNavLink.displayName = 'DesktopNavLink';

export const MobileNavLink = (props: any) => {
  const { active, ...rest } = props;
  const { hex } = useRandomColor();

  const color = getColorContrast(hex);
  return (
    <Link as={NextLink} w="100%" {...rest}>
      <chakra.a
        my={4}
        aria-current={active ? 'page' : undefined}
        display="block"
        textAlign="center"
        fontWeight="bold"
        py={3}
        borderWidth={2}
        borderStyle="dotted"
        borderColor={hex}
        color="gray.800"
        boxShadow="base"
        rounded="md"
        size="lg"
        outline="none"
        _hover={{
          outline: 'none',
          bg: hex,
          color: color,
          boxShadow: 'outline',
          borderColor: hex,
        }}
        {...rest}
      />
    </Link>
  );
};

export const NavLink = {
  Mobile: MobileNavLink,
  Desktop: DesktopNavLink,
};
