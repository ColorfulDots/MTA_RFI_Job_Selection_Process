import { Icon, Tooltip, Link } from '@chakra-ui/react';
import { darken } from 'polished';
import NextLink from 'next/link';
import * as React from 'react';

export interface DotIconProps {
  ref: string;
  noLink: boolean;
  bg: string;
  rounded: number;
}

export const DotIcon: React.FC<DotIconProps> = ({
  ref,
  noLink,
  bg,
  rounded,
  ...rest
}) => {
  return (
    <Tooltip
      label={`${noLink ? '' : 'Explore this color...'}`}
      placement="bottom"
      ref={ref}
    >
      <Icon
        m={1}
        viewBox="0 0 200 200"
        bg="transparent"
        cursor={`${noLink ? 'default' : 'pointer'}`}
        borderWidth={2}
        borderColor={darken(0.1, bg)}
        rounded={100 | rounded}
        {...rest}
      >
        {noLink ? (
          <path
            fill={bg}
            d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
          />
        ) : (
          <Link as={NextLink} href={`/color/${bg?.substring(1)}`}>
            <path
              fill={bg}
              d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
            />
          </Link>
        )}
      </Icon>
    </Tooltip>
  );
};
