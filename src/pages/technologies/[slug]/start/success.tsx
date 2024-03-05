import { Box, Heading, Text, Stack, Button } from '@chakra-ui/react';
import * as React from 'react';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useRouter } from 'next/router';
import { useCollection } from '@nandorojo/swr-firestore';
import Confetti from 'react-confetti';
import { Layout } from '@/components/Layout';

export interface PageProps {
  bg: string;
  color: string;
}
export const TechnologiesStartSuccessPage: React.FC<PageProps> = ({
  bg,
  color,
}) => {
  const router = useRouter();
  const { width, height } = useWindowSize();

  const { data: technologiesData } = useCollection<any>('technologies', {
    where: ['slug', '==', router.query.slug],
    limit: 1,
    listen: false,
  });

  return (
    <>
      {technologiesData && (
        <Layout
          title={'Application Submitted!'}
          description={''}
          bg={bg}
          color={color}
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
            <Box as="section" bg={bg} color={color} pt="7.5rem">
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
                  >
                    LET&apos;S CELEBRATE!
                  </Heading>
                  <Text fontSize="xl" mt="4" maxW="2xl" mx="auto">
                    Thank you for contacting us regarding your project! <br />
                    Our robots tell us we have a shared interest in{' '}
                    <strong>{technologiesData[0]?.title}</strong>!
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
                  <Button
                    onClick={() =>
                      router.push(`/technologies/${technologiesData[0]?.slug}`)
                    }
                    size="lg"
                    color={color}
                    px="8"
                    fontWeight="bold"
                    fontSize="md"
                  >
                    View {technologiesData[0]?.title} Again
                  </Button>
                  <Button
                    onClick={() => router.push('/technologies')}
                    size="lg"
                    color={color}
                    px="8"
                    fontWeight="bold"
                    fontSize="md"
                  >
                    View More Technologies
                  </Button>
                  <Button
                    onClick={() => router.push('/contact')}
                    size="lg"
                    color={color}
                    px="8"
                    fontWeight="bold"
                    fontSize="md"
                  >
                    Contact Us
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

export default TechnologiesStartSuccessPage;
