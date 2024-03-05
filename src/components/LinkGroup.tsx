import { Box, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';
import { LinkGroupData } from './footerData';
import NextLink from 'next/link';

interface LinkGroupProps {
  data: LinkGroupData;
}

export const LinkGroup = (props: LinkGroupProps) => {
  const { data } = props;
  const { links, title } = data;

  return (
    <Box>
      <Text
        textTransform="uppercase"
        mb={{ base: '6', md: '10' }}
        fontWeight="bold"
        letterSpacing="wide"
      >
        {title}
      </Text>
      <Stack as="ul" spacing={{ base: 2, md: 4 }} listStyleType="none">
        {links.map((link, idx) => (
          <Box as="li" key={idx} cursor="pointer">
            <NextLink href={link.href}>
              <Text _hover={{ textDecoration: 'underline' }}>{link.label}</Text>
            </NextLink>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
