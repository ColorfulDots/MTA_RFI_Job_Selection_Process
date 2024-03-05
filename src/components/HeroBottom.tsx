import { Box, Flex, Stack, Text, Button, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import { randomColor, getColorContrast } from '@/helpers/index';
import { lighten, darken } from 'polished';
import { useRouter } from 'next/router';

const footerFill = randomColor();
const footerColor = getColorContrast(footerFill);

export const HeroBottom = () => {
  const router = useRouter();

  const ctas = [
    `We are Purple, \n\You are Pink...`,
    'Are you interested in working with us?',
    'Do you want to make an impact?',
    'Have a big Web3 project?',
    'Need an extra hand?',
    'Is your website slow?',
    'Are your analytics accurate?',
    'Are you a developer?',
    'Are you a designer?',
  ];

  const [cta] = useState(ctas[Math.floor(Math.random() * ctas.length)]);

  return (
    <Box>
      <Box>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          style={{ marginBottom: -1 }}
        >
          <path
            fill={footerFill}
            fillOpacity="1"
            d="M0,128L34.3,154.7C68.6,181,137,235,206,229.3C274.3,224,343,160,411,154.7C480,149,549,203,617,213.3C685.7,224,754,192,823,197.3C891.4,203,960,245,1029,261.3C1097.1,277,1166,267,1234,218.7C1302.9,171,1371,85,1406,42.7L1440,0L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          ></path>
        </svg>
        <Box bg={footerFill} minH={335}>
          <Box bg="transparent" as="section" minH="140px" position="relative">
            <Box py={[12, 10, 10, 20, 24]} position="relative" zIndex={1}>
              <Box
                maxW={{ base: 'xl', md: '7xl' }}
                mx="auto"
                px={{ base: '6', md: '8' }}
              >
                <Box maxW="xl">
                  <Heading
                    as="h3"
                    size="3xl"
                    fontSize={['3xl', '4xl', '5xl', '6xl']}
                    fontWeight="extrabold"
                    color={footerColor}
                  >
                    {cta}
                  </Heading>
                  <Text
                    fontSize={{ md: '2xl' }}
                    mt="4"
                    maxW="lg"
                    color={footerColor}
                  >
                    Let&apos;s connect our Colorful Dots and build something
                    beautiful together!
                  </Text>
                  <Stack
                    direction={{ base: 'column', md: 'row' }}
                    mt="10"
                    spacing="4"
                  >
                    <Button
                      onClick={() => router.push('/contact')}
                      w={{ base: 'full', md: 'auto' }}
                      colorScheme="whiteAlpha"
                      color={footerColor}
                      borderWidth={0.5}
                      borderStyle="dotted"
                      boxShadow="base"
                      rounded={{ xs: 'full', md: 'full' }}
                      size="md"
                      fontSize="md"
                      fontWeight="bold"
                      outline="none"
                      _hover={{
                        outline: 'none',
                        bg: lighten(0.05, footerFill),
                        color: darken(0.05, footerColor),
                        boxShadow: 'outline',
                        borderColor: lighten(0.05, footerFill),
                      }}
                      px="8"
                    >
                      Contact Us
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </Box>
            <Flex
              id="image-wrapper"
              position="absolute"
              insetX="0"
              insetY="0"
              w="full"
              h="full"
              overflow="hidden"
              align="center"
            >
              <Box position="relative" w="full" h="full">
                <Box position="absolute" w="full" h="full" />
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
      <Box
        // marginTop={['0px', '-35px', '-45px', '-45px', '-105px']}
        // marginBottom={['0px', '-35px', '-45px', '-45px', '-105px']}

        marginBottom={['-30px', '-35px', '-45px', '-45px', '-105px']}
        marginTop={['-30px', '-35px', '-45px', '-45px', '-55px']}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill={footerFill}
            fillOpacity="1"
            d="M0,320L34.3,288C68.6,256,137,192,206,170.7C274.3,149,343,171,411,165.3C480,160,549,128,617,128C685.7,128,754,160,823,186.7C891.4,213,960,235,1029,218.7C1097.1,203,1166,149,1234,133.3C1302.9,117,1371,139,1406,149.3L1440,160L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
          ></path>
        </svg>
      </Box>
    </Box>
  );
};
