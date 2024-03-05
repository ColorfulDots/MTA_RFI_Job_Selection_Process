import {
  Box,
  Flex,
  Heading,
  Text,
  Spinner,
  SkeletonCircle,
} from '@chakra-ui/react';
import * as React from 'react';
import { lighten } from 'polished';
import dynamic from 'next/dynamic';
import { randomColor } from '@/helpers/index';

const Logo = dynamic<any>(
  () => import('@/components/Logo').then((mod) => mod.Logo),
  { ssr: false, loading: () => <SkeletonCircle size="30" /> },
);

const ForgotPasswordForm = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.ForgotPasswordForm),
  { ssr: false, loading: () => <Spinner /> },
);

import { Layout } from '@/components/Layout';

export const SignInPage = (props: any) => {
  return (
    <Layout
      title="Forgot Password"
      description="If you're one of our lucky clients, we can help you reset your password."
      bg={props.bg}
      color={props.color}
      hasNavbar={false}
    >
      <Flex minH="100vh" direction={{ base: 'column', md: 'row' }}>
        <Box
          display={{ base: 'none', md: 'block' }}
          maxW={{ base: '20rem', lg: '40rem' }}
          flex="1"
          bg={props.bg}
          color={props.color}
          px="10"
          py="8"
        >
          <Box mb="16">
            <Logo
              boxSize={30}
              href="/"
              color={props.color}
              title="Colorful Dots, LLC"
              bg={randomColor()}
              brand="CD"
            />
          </Box>
          {/* <Flex
            direction="column"
            align="center"
            justify="center"
            h="full"
            textAlign="center"
            mt="-10"
          >
            <Box>
              <Text
                maxW="md"
                mx="auto"
                fontWeight="extrabold"
                fontSize={{ base: '4xl', lg: '5xl' }}
                letterSpacing="tight"
                lineHeight="normal"
              >
                WE MAKE THINGS
              </Text>
              <Text mt="5" maxW="sm" mx="auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididun.
              </Text>
            </Box>
            <HStack
              justify="center"
              as="a"
              href="#"
              minW="2xs"
              py="3"
              fontWeight="semibold"
              px="2"
              mt="5"
              border="2px solid white"
              rounded="lg"
              _hover={{ bg: 'whiteAlpha.200' }}
            >
              <Box>Learn More</Box>
              <HiOutlineExternalLink />
            </HStack>
          </Flex> */}
        </Box>
        <Box
          flex="1"
          px={{ base: '6', md: '10', lg: '16', xl: '28' }}
          py={{ base: '10', md: '64' }}
          bg={props.bg && lighten(0.2, props.bg.toString())}
        >
          <Box maxW="xl">
            <Box>
              <Box display={{ md: 'none' }} mb="16">
                <Logo
                  boxSize={30}
                  href="/"
                  color={props.color}
                  title="Colorful Dots, LLC"
                  bg={randomColor()}
                  brand="CD"
                />
              </Box>
              <Heading
                color={props.color}
                as="h1"
                size="2xl"
                fontWeight="extrabold"
                letterSpacing="tight"
              >
                Client Access
              </Heading>
              <Text
                mt="3"
                fontSize={{ base: 'xl', md: '3xl' }}
                fontWeight="bold"
                color={props.color}
              >
                Forgot Password
              </Text>
            </Box>

            <Box
              minW={{ md: '420px' }}
              mt="10"
              rounded="xl"
              bg={props.bg}
              shadow={{ md: 'lg' }}
              px={{ md: '10' }}
              pt={{ base: '8', md: '12' }}
              pb="8"
            >
              <ForgotPasswordForm
                color={props.color}
                bg={props.bg && lighten(0.2, props.bg.toString())}
              />
            </Box>
          </Box>
        </Box>
      </Flex>
    </Layout>
  );
};

export default SignInPage;
