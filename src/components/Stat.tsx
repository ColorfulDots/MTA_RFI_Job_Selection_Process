import { Box, BoxProps, Divider, Flex } from '@chakra-ui/react';
import * as React from 'react';

interface StatProps extends BoxProps {
  title: string;
  value: string;
  accentColor?: string;
  color?: any;
}
export const Stat: React.FC<StatProps> = ({
  color,
  title,
  value,
  children,
  accentColor,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Flex as="dl" direction="column-reverse">
        <Box as="dt" fontWeight="bold">
          {title}
        </Box>
        <Box
          order={1}
          as="dd"
          fontSize={{ base: '3xl', md: '4xl' }}
          fontWeight="extrabold"
          color={accentColor}
        >
          {value}
        </Box>
      </Flex>
      <Divider
        aria-hidden
        my="4"
        borderWidth="1px"
        borderStyle="dashed"
        borderColor={accentColor}
      />

      <Box color={color} fontWeight="medium" mt={10}>
        {children}
      </Box>
    </Box>
  );
};
