import { Box, Flex, Stack, Text, Heading } from '@chakra-ui/react';
import * as React from 'react';
import { getColorContrast } from '@/helpers/index';
import parse from 'html-react-parser';
import { useRandomColor } from '@/hooks/useRandomColor';
import { HeroTopProps } from '@/types/index';

export const HeroTop: React.FC<HeroTopProps> = ({
  rootBgColor,
  rootColor,
  breadcrumbs,
  bg,
  maxW,
  icon,
  title,
  tagline,
  badges,
  agencyLink,
  positionDetails,
  actionButton,
}) => {
  const { hex } = useRandomColor();
  const footerColor = getColorContrast(hex);

  return (
    <Box as="section" bg={bg}>
      <Box>
        <Box bg={rootBgColor ? rootBgColor : hex} minH={250}>
          <Box bg="transparent" as="section" minH="140px" position="relative">
            <Box py={[12, 10, 10, 20, 24]} position="relative" zIndex={1}>
              <Box
                maxW={{ base: 'xl', md: '7xl' }}
                mx="auto"
                px={{ base: '6', md: '8' }}
              >
                <Box maxW={maxW || '4xl'}>
                  <Heading
                    as="h1"
                    size="4xl"
                    fontSize={['3xl', '4xl', '5xl', '6xl']}
                    fontWeight="extrabold"
                    color={rootColor ? rootColor : footerColor}
                  >
                    {icon && icon} {title}
                  </Heading>

                  <Box
                    fontSize={{ md: 'xl' }}
                    mt="4"
                    color={rootColor ? rootColor : footerColor}
                  >
                    {breadcrumbs}
                  </Box>

                  <Text
                    fontSize={{ md: '2xl' }}
                    mt="4"
                    maxW="4xl"
                    as="h2"
                    color={rootColor ? rootColor : footerColor}
                  >
                    {parse(tagline)}
                  </Text>
                  <Box mt="4">{badges}</Box>
                  <Box
                    fontSize={{ md: 'xl' }}
                    mt="4"
                    color={rootColor ? rootColor : footerColor}
                  >
                    {agencyLink}
                  </Box>
                  <Box
                    fontSize={{ md: 'xl' }}
                    mt="4"
                    color={rootColor ? rootColor : footerColor}
                  >
                    {positionDetails}
                  </Box>
                  <Stack
                    direction={{ base: 'column', md: 'row' }}
                    mt="10"
                    spacing="4"
                    color={rootColor ? rootColor : footerColor}
                  >
                    {actionButton}
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
        marginTop={['-30px', '-35px', '-45px', '-45px', '-105px']}
        marginBottom={['-60px', '-35px', '-45px', '-45px', '-55px']}
        borderWidth={0}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill={rootBgColor ? rootBgColor : hex}
            fillOpacity="1"
            d="M0,320L34.3,288C68.6,256,137,192,206,170.7C274.3,149,343,171,411,165.3C480,160,549,128,617,128C685.7,128,754,160,823,186.7C891.4,213,960,235,1029,218.7C1097.1,203,1166,149,1234,133.3C1302.9,117,1371,139,1406,149.3L1440,160L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
          ></path>
        </svg>
      </Box>
    </Box>
  );
};
