import { Box, Heading, Text, Stack, Button } from '@chakra-ui/react';
import * as React from 'react';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useRouter } from 'next/router';
import { useCollection } from '@nandorojo/swr-firestore';
import Confetti from 'react-confetti';
import { Layout } from '@/components/Layout';

export const GovernmentAcronymsSuccessPage = (props: any) => {
  const router = useRouter();
  const { width, height } = useWindowSize();

  const { data: acronymsData } = useCollection<any>('acronyms', {
    where: ['slug', '==', router.query.slug],
    limit: 1,
    listen: false,
  });

  return (
    <>
      {acronymsData && (
        <Layout
          title={'Contribution Submitted!'}
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
                    You&apos;ve successfully contributed to the government
                    acronym: <strong>{acronymsData[0]?.term}</strong>
                  </Text>

                  <Text fontSize="xl" mt="4" maxW="2xl" mx="auto">
                    We appreciate your contributions to help make our website
                    more accurate.
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
                    colorScheme="whiteAlpha"
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
                    colorScheme="whiteAlpha"
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
                    colorScheme="whiteAlpha"
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
      )}
    </>
  );
};

export default GovernmentAcronymsSuccessPage;
