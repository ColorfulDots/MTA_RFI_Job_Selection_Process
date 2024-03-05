import {
  Skeleton,
  SkeletonCircle,
  Text,
  Box,
  Flex,
  HStack,
  Img,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { SocialLink } from './SocialLink';
import { links, socialLinks } from './footerData';
import { LinkGroup } from './LinkGroup';
// import { SubscribeForm } from './SubscribeForm';
import NextLink from 'next/link';
import { useRandomColor } from '@/hooks/useRandomColor';
import dynamic from 'next/dynamic';
import * as React from 'react';

const Logo = dynamic<any>(
  () => import('@/components/Logo').then((mod) => mod.Logo),
  {
    ssr: false,
    loading: () => (
      <Stack lineHeight={0}>
        <SkeletonCircle size="30" />
      </Stack>
    ),
  },
);

const HeroBottom = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.HeroBottom),
  {
    ssr: false,
    loading: () => (
      <Stack lineHeight={0}>
        <Skeleton height="917px" />
      </Stack>
    ),
  },
);

const AwardSection = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.AwardSection),
  {
    ssr: false,
    loading: () => (
      <Stack lineHeight={0}>
        <Skeleton height="160px" />
      </Stack>
    ),
  },
);

export const Footer = (props: any) => {
  const { hex } = useRandomColor();
  const Heart = (props: any) => (
    <Box
      display="inline-block"
      mx="1"
      color={props.color}
      fontSize="xs"
      role="img"
      aria-label="Love"
      as={FaHeart}
    />
  );
  return (
    <Box as="footer" bg={props.bg}>
      <Box>
        <HeroBottom {...props} />
        <AwardSection />

        <Box
          maxW={{ base: 'xl', md: '7xl' }}
          mx="auto"
          px={{ base: '6', md: '8' }}
          py={{ base: '12', md: '20' }}
        >
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            justify="space-between"
            mb={{ base: '10', lg: '16' }}
            align="flex-start"
            id="top"
          >
            <SimpleGrid
              flex="1"
              w={{ base: 'full', lg: 'auto' }}
              maxW={{ lg: '4xl' }}
              columns={{ base: 2, sm: 2, md: 4, lg: 4 }}
              spacing={{ base: '12', md: '12' }}
              fontSize="sm"
              marginEnd={{ md: '4', lg: '16' }}
            >
              {links.map((group, idx) => (
                <LinkGroup key={idx} data={group} />
              ))}
            </SimpleGrid>
            <Box
              flex="2"
              maxW={{ lg: 'xs' }}
              ml={{ lg: 'auto' }}
              fontSize="sm"
              mt={{ base: '12', lg: 0 }}
            >
              <Stack
                direction={{ base: 'row', md: 'row' }}
                spacing={{ base: '4', md: '12' }}
                mt={{ base: '8', lg: 0 }}
                w={{ base: 'full', lg: 'auto' }}
                justify={{
                  base: 'space-between',
                  sm: 'space-around',
                  lg: 'flex-start',
                }}
                align={{ base: 'center', md: 'center' }}
              >
                <Img
                  title="Colorful Dots, LLC Certified New York State Service Disabled Veteran Owned Business (SDVOB)"
                  loading="lazy"
                  src="https://colorfuldots.s3.amazonaws.com/cd-assets/images/output-onlinepngtools+1.svg"
                  boxSize={['45%', '25%', '25%', '40%']}
                  objectFit="contain"
                  alt="Colorful Dots, LLC Certified New York State Service Disabled Veteran Owned Business (SDVOB)"
                />

                <Img
                  title="Colorful Dots, LLC Certified Service Disabled Veteran Owned Small Business (SDVOSB)"
                  loading="lazy"
                  src="https://colorfuldots.s3.amazonaws.com/cd-assets/images/257834.svg"
                  boxSize={['45%', '25%', '25%', '40%']}
                  objectFit="contain"
                  alt="Colorful Dots, LLC Certified Service Disabled Veteran Owned Small Business (SDVOSB)"
                />
                {/* <Img
                 loading="lazy"
                  src="https://colorfuldots.com/_next/image?url=https%3A%2F%2Fcolorfuldots.s3.amazonaws.com%2Fcd-assets%2Fimages%2Fhubzone.png&w=1200&q=75"
                  boxSize={120}
                  objectFit="cover"
                /> */}
              </Stack>

              {/* <Text
                casing="uppercase"
                mb={{ base: 6, lg: 10 }}
                fontWeight="bold"
                letterSpacing="wide"
              >
                Subscribe to our newsletter!
              </Text>
              <Text lineHeight="tall">
                Receive our resources, curated content, and design inspiration
                delivered straight into your inbox. Be the first to learn the
                news about new features and product updates.
              </Text>
              <SubscribeForm color={props.color} bg={props.bg} /> */}
            </Box>
          </Flex>
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            align={{ base: 'center', lg: 'center' }}
            justify="space-between"
            fontSize="md"
          >
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={{ base: '4', md: '12' }}
              mt={{ base: '8', lg: 0 }}
              w={{ base: 'full', lg: 'auto' }}
              justify={{
                base: 'space-between',
                sm: 'space-around',
                lg: 'flex-start',
              }}
              align={{ base: 'center', md: 'center' }}
            >
              <HStack spacing="4" mt={{ lg: '8' }} listStyleType="none">
                <Logo
                  boxSize={30}
                  href="/"
                  color={props.color}
                  title="Colorful Dots, LLC"
                  bg={hex}
                />

                {socialLinks.map((link, idx) => (
                  <Box as="span" key={idx} fontSize={34}>
                    <SocialLink as={NextLink} href={link.href}>
                      <a title={link.label}>
                        <Box srOnly cursor="pointer" mr={4}>
                          {link.label}
                        </Box>
                        {link.icon}
                      </a>
                    </SocialLink>
                  </Box>
                ))}
              </HStack>
            </Stack>
            <Stack
              textAlign={['center', 'left']}
              align={{ base: 'center', lg: 'center' }}
            >
              <Text mt={4}>
                &copy; 2018 - {new Date().getFullYear()} Colorful Dots, LLC
              </Text>
              <Text mt={3}>
                Made with <Heart /> in Brooklyn, NY
              </Text>
              {/* <Text>
                We're a Federal &amp; NY State Certified HUBZone / SDVOSB /
                SDVOB Veteran Owned Company
              </Text> */}
            </Stack>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
