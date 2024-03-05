import { Box, Stack, Text, BoxProps, Heading, Center } from '@chakra-ui/react';
import * as React from 'react';
import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { HiX } from 'react-icons/hi';
import { Logo } from '@/components/Logo';
import { randomColor } from '../helpers';

export const CloseButton = (props: IconButtonProps) => (
  <IconButton fontSize="1.5em" variant="ghost" icon={<HiX />} {...props} />
);

export const CallToActionLink = (props: BoxProps) => (
  <Box
    as="a"
    href="#"
    py="1"
    px="4"
    bg="white"
    color="blue.600"
    fontWeight="semibold"
    rounded="base"
    whiteSpace="nowrap"
    {...props}
  />
);

export const TopBanner = (props: any) => {
  return (
    <Box as="section">
      <Box
        bgGradient="linear(to-t, blue.500, purple.500)"
        color="white"
        py="10"
        px={{ base: '3', md: '6', lg: '8' }}
        h="100vh"
      >
        <Center>
          <Stack
            direction={{ base: 'column', sm: 'column' }}
            justifyContent="center"
            alignItems="center"
            spacing={{ base: '3', md: '6' }}
            width="full"
          >
            <Logo
              boxSize={30}
              href="/"
              color={props.color}
              title="Colorful Dots, LLC"
              bg={randomColor()}
              brand="COLORFUL DOTS"
            />
            <Heading>
              <strong>{props.title}</strong>
            </Heading>
            <Text>{props.message}</Text>
            {/* <CallToActionLink
              textAlign="center"
              width={{ base: 'full', sm: 'auto' }}
            >
              Check it out
            </CallToActionLink> */}
          </Stack>
          {/* <CloseButton
            alignSelf={{ base: 'self-start', sm: 'initial' }}
            aria-label="Close banner"
          /> */}
        </Center>
      </Box>
    </Box>
  );
};
