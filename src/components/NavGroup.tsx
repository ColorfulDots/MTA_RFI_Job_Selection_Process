import { Box, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';

export const NavGroup = (props: {
  label: string;
  color: string;
  children: React.ReactNode;
}) => {
  const { label, color, children } = props;
  return (
    <Box>
      <Text
        px="3"
        fontSize="xs"
        fontWeight="semibold"
        textTransform="uppercase"
        letterSpacing="widest"
        color={color}
        mb="3"
      >
        {label}
      </Text>
      <Stack spacing="1">{children}</Stack>
    </Box>
  );
};
