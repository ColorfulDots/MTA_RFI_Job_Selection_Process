import { Icon, HTMLChakraProps } from '@chakra-ui/react';
import * as React from 'react';
import NextLink from 'next/link';
import { useRandomColor } from '@/hooks/useRandomColor';

export const Logo = (
  props: HTMLChakraProps<'svg'> & {
    href: string;
    color: string;
    title: string;
    brand?: string;
    bg: string;
  },
) => {
  const { title, bg, brand, ...rest } = props;
  const { hex } = useRandomColor();

  return (
    <NextLink href={props.href}>
      <a title={title}>
        <Icon
          {...rest}
          viewBox="0 0 200 200"
          bg="transparent"
          cursor="pointer"
          borderWidth={2}
          borderColor={`${hex.toString()}`}
          rounded={100}
        >
          <path
            fill={hex.toString()}
            d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
          />
        </Icon>{' '}
        <span className="brand">{brand}</span>{' '}
      </a>
    </NextLink>
  );
};
