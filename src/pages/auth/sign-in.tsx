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
import { Layout } from '@/components/Layout';
import { randomColor } from '@/helpers/index';

const Logo = dynamic<any>(
  () => import('@/components/Logo').then((mod) => mod.Logo),
  { ssr: false, loading: () => <SkeletonCircle size="30" /> },
);

const SigninForm = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.SigninForm),
  { ssr: false, loading: () => <Spinner /> },
);

export const SignInPage = (props: any) => {
  return (
    <Layout
      title="Sign In"
      description="If you're one of our lucky clients, please sign in!"
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
                Sign in to continue
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
              <SigninForm
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
