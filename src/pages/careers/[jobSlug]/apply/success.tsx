import { Box, Heading, Text, Stack, LightMode, Button } from '@chakra-ui/react';
import * as React from 'react';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useRouter } from 'next/router';
import { useCollection } from '@nandorojo/swr-firestore';
import Confetti from 'react-confetti';
import { Layout } from '@/components/Layout';

export const CareersApplicationSuccessPage = (props: any) => {
  const router = useRouter();
  const { width, height } = useWindowSize();

  const { data: careersData } = useCollection<any>('careers', {
    where: ['jobSlug', '==', router.query.jobSlug],
    limit: 1,
    listen: false,
  });

  return (
    <>
      {careersData && (
        <Layout
          title="Application Submitted!"
          description=""
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
                    You&apos;ve successfully applied to the
                    <strong>{careersData[0]?.jobHours?.label}</strong> &quot;
                    <strong>{careersData[0]?.jobShortTitle}</strong>&quot;
                    position with{' '}
                    <strong>{careersData[0]?.jobAgency?.label}</strong> in{' '}
                    <strong>
                      {careersData[0]?.jobCity},
                      {careersData[0]?.jobState?.label}{' '}
                      {careersData[0]?.jobZipCode}
                    </strong>
                  </Text>

                  <Text fontSize="xl" mt="4" maxW="2xl" mx="auto">
                    You should be hearing from us within the next 24 hours!
                  </Text>
                </Box>

                <Stack
                  justify="center"
                  direction={{ base: 'column', md: 'row' }}
                  mt="10"
                  mb="20"
                  spacing="4"
                >
                  <LightMode>
                    <Button
                      onClick={() =>
                        router.push(`/careers/${careersData[0]?.jobSlug}`)
                      }
                      size="lg"
                      colorScheme="whiteAlpha"
                      color={props.color}
                      px="8"
                      fontWeight="bold"
                      fontSize="md"
                    >
                      View Job Again
                    </Button>
                    <Button
                      onClick={() => router.push('/careers')}
                      size="lg"
                      colorScheme="whiteAlpha"
                      color={props.color}
                      px="8"
                      fontWeight="bold"
                      fontSize="md"
                    >
                      View More Careers
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
                  </LightMode>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Layout>
      )}
    </>
  );
};

export default CareersApplicationSuccessPage;
