import { Box, Heading, Text, Stack, Button } from '@chakra-ui/react';
import * as React from 'react';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useRouter } from 'next/router';
import Confetti from 'react-confetti';
import { Layout } from '@/components/Layout';

export const PartnershipSuccessPage = (props: any) => {
  const router = useRouter();
  const { width, height } = useWindowSize();

  return (
    <Layout
      title={'Partnership Application Submitted!'}
      description={''}
      bg={props.bg}
      color={props.color}
    >
      <Confetti width={width} height={height} />
      <Stack
        minH="2xl"
        as="section"
        maxW="7xl"
        mx="auto"
        px={{ base: '6', md: '8' }}
        py={{ base: '12', md: '20' }}
        spacing="12"
      >
        <Box as="section" bg={props.bg} color={props.color} pt="7.5rem">
          <Box
            maxW={{ base: 'xl', md: '7xl' }}
            mx="auto"
            px={{ base: '6', md: '8' }}
          >
            <Box textAlign="center">
              <Heading
                as="h1"
                size="3xl"
                fontWeight="extrabold"
                maxW="48rem"
                mx="auto"
                lineHeight="1.2"
                letterSpacing="tight"
                fontSize={['3xl', '4xl', '5xl', '6xl']}
              >
                LET&apos;S CELEBRATE!
              </Heading>
              <Text fontSize="xl" mt="4" maxW="2xl" mx="auto">
                Thank you for applying to our partnership program
              </Text>

              <Text fontSize="xl" mt="4" maxW="2xl" mx="auto">
                We will reach out to you in the next couple of days
              </Text>

              <Text fontSize="xl" mt="4" maxW="2xl" mx="auto">
                We appreciate your interest in working with us!
              </Text>
            </Box>

            <Stack
              justify="center"
              direction={{ base: 'column', md: 'row' }}
              mt="10"
              mb="20"
              spacing="4"
            >
              <Button
                onClick={() => router.push('/faqs')}
                size="lg"
                color={props.color}
                px="8"
                fontWeight="bold"
                fontSize="md"
              >
                FAQs
              </Button>
              <Button
                onClick={() => router.push('/contact')}
                size="lg"
                color={props.color}
                px="8"
                fontWeight="bold"
                fontSize="md"
              >
                Contact Us
              </Button>
              <Button
                onClick={() => router.push('/')}
                size="lg"
                color={props.color}
                px="8"
                fontWeight="bold"
                fontSize="md"
              >
                Home
              </Button>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Layout>
  );
};

export default PartnershipSuccessPage;
