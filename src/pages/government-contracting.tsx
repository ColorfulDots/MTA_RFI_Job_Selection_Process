import {
  Skeleton,
  SkeletonCircle,
  Link,
  Text,
  Box,
  Button,
  Img,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { randomColor } from '@/helpers/index';
import { lighten, darken, transparentize } from 'polished';
import { Layout } from '@/components/Layout';
import * as React from 'react';
import NextLink from 'next/link';

const Stat = dynamic<any>(
  () => import('@/components/Stat').then((mod) => mod.Stat),
  {
    ssr: false,
    loading: () => (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    ),
  },
);

const DotIcon = dynamic<any>(
  () => import('@/components/DotIcon').then((mod) => mod.DotIcon),
  { ssr: false, loading: () => <SkeletonCircle size="30" /> },
);

const HeroTop = dynamic<any>(
  () => import('@/components/HeroTop').then((mod) => mod.HeroTop),
  {
    ssr: false,
    loading: () => (
      <Stack>
        <Skeleton height="875px" />
      </Stack>
    ),
  },
);

export const GovernmentContractingPage = (props: {
  bg: string;
  color: string;
  blogsData: any;
}) => {
  return (
    <Layout
      title="Government Contracting"
      description="Colorful Dots, LLC is a Service Disabled Veteran Owned Small
      Business (SDVOSB), NY State Certified SDVOB, and Certified HUBZone
      company that works with the Federal &amp; State Government."
      bg={props.bg}
      color={props.color}
    >
      <HeroTop
        maxW="4xl"
        title="Government Contracting"
        tagline="Colorful Dots, LLC is a Service Disabled Veteran Owned Small Business (SDVOSB), NY State Certified SDVOB, and Certified HUBZone company that works with the Federal &amp; State Government"
        actionButton={
          <>
            <NextLink href="/contact" passHref>
              <Button
                as="a"
                w={{ base: 'full', md: 'auto' }}
                //  colorScheme="whiteAlpha"
                color={props.color}
                bg={transparentize(0.2, 'hsl(0, 0%, 100%)')}
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
                  bg: lighten(0.05, props.bg),
                  color: darken(0.05, props.color),
                  boxShadow: 'outline',
                  borderColor: lighten(0.05, props.bg),
                }}
                px="8"
              >
                Contact Us
              </Button>
            </NextLink>

            <NextLink href="/partnerships" passHref>
              <Button
                as="a"
                w={{ base: 'full', md: 'auto' }}
                //  colorScheme="whiteAlpha"
                color={props.color}
                bg={transparentize(0.2, 'hsl(0, 0%, 100%)')}
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
                  bg: lighten(0.05, props.bg),
                  color: darken(0.05, props.color),
                  boxShadow: 'outline',
                  borderColor: lighten(0.05, props.bg),
                }}
                px="8"
              >
                Partnerships
              </Button>
            </NextLink>

            <NextLink
              href="https://colorfuldots.s3.amazonaws.com/Capability-Statement-2022.pdf"
              passHref
            >
              <Button
                as="a"
                w={{ base: 'full', md: 'auto' }}
                //  colorScheme="whiteAlpha"
                color={props.color}
                bg={transparentize(0.2, 'hsl(0, 0%, 100%)')}
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
                  bg: lighten(0.05, props.bg),
                  color: darken(0.05, props.color),
                  boxShadow: 'outline',
                  borderColor: lighten(0.05, props.bg),
                }}
                px="8"
              >
                Capability Statement
              </Button>
            </NextLink>
          </>
        }
      />

      <Stack
        as="section"
        mx="auto"
        px={{ base: '6', md: '8' }}
        py={{ base: '12', md: '20' }}
        spacing="12"
      >
        <Box>
          <SimpleGrid
            mx="auto"
            spacing={{ base: '10', md: '20' }}
            columns={{ base: 1, md: 2, lg: 2, xl: 2, '2xl': 3 }}
          >
            <Stat
              title=""
              value="VETERAN OWNED"
              color={props.color}
              position="relative"
            >
              <DotIcon
                boxSize={10}
                bg={randomColor().toString()}
                position="absolute"
                top={12}
                left={-5}
              />

              <Stack direction={['column', 'row', 'row']} spacing={10}>
                <Img
                  loading="lazy"
                  src="https://colorfuldots.s3.amazonaws.com/cd-assets/images/output-onlinepngtools+1.svg"
                  boxSize={120}
                  objectFit="cover"
                  alt="Colorful Dots, LLC - CVE Certified Service-Disabled Veteran Owned Small Business"
                  title="Colorful Dots, LLC - CVE Certified Service-Disabled Veteran Owned Small Business"
                />
                <Img
                  loading="lazy"
                  src="https://colorfuldots.s3.amazonaws.com/cd-assets/images/257834.svg"
                  boxSize={140}
                  objectFit="cover"
                  alt="Colorful Dots, LLC - New York State Certified Service Disabled Veteran Owned Small Business"
                  title="Colorful Dots, LLC - New York State Certified Service Disabled Veteran Owned Small Business"
                />
                {/* <Img
                 loading="lazy"
                  src="https://colorfuldots.com/_next/image?url=https%3A%2F%2Fcolorfuldots.s3.amazonaws.com%2Fcd-assets%2Fimages%2Fhubzone.png&w=1200&q=75"
                  boxSize={120}
                  objectFit="cover"
                /> */}
              </Stack>
            </Stat>
            <Stat title="" value="SAM" color={props.color} position="relative">
              <DotIcon
                boxSize={10}
                bg={randomColor().toString()}
                position="absolute"
                top={12}
                left={-5}
              />
              <Text fontSize="lg" fontWeight="normal">
                System For Award Management (SAM) &bull; Status: Active
              </Text>
            </Stat>

            <Stat
              title=""
              value="DUNS #"
              color={props.color}
              position="relative"
            >
              <DotIcon
                boxSize={10}
                bg={randomColor().toString()}
                position="absolute"
                top={12}
                left={-5}
              />
              <Text fontSize="lg" fontWeight="normal">
                Dun &amp; Bradstreet (DUNS) &bull; 080009965
              </Text>
            </Stat>

            <Stat
              title=""
              value="CAGE CODE"
              color={props.color}
              position="relative"
            >
              <DotIcon
                boxSize={10}
                bg={randomColor().toString()}
                position="absolute"
                top={12}
                left={-5}
              />
              <Text fontSize="lg" fontWeight="normal">
                Commercial and Government Entity Program (CAGE) &bull; CAGE
                CODE: 82XK6
              </Text>
            </Stat>
            <Stat title="" value="SIC" color={props.color} position="relative">
              <DotIcon
                boxSize={10}
                bg={randomColor().toString()}
                position="absolute"
                top={12}
                left={-5}
              />
              <Text fontSize="lg" fontWeight="normal">
                Standard Industrial Classification (SIC) &bull; SIC: 7371
              </Text>
            </Stat>
            <Stat
              title=""
              value="NAICS CODES"
              color={props.color}
              position="relative"
            >
              <DotIcon
                boxSize={10}
                bg={randomColor().toString()}
                position="absolute"
                top={12}
                left={-5}
              />
              <Text fontSize="lg" fontWeight="normal">
                North American Industry Classification System (NAICS) 541519 -
                other computer related services 541511 - Custom Computer
                Programming Services 511210 - Software Publishers 611420 -
                Computer Training 541613 – Marketing Consulting 541430 – Graphic
                Design 541810 – Advertising
              </Text>
            </Stat>
            <Stat
              title=""
              value="SBA.gov"
              color={props.color}
              position="relative"
            >
              <DotIcon
                boxSize={10}
                bg={randomColor().toString()}
                position="absolute"
                top={12}
                left={-5}
              />
              <Text fontSize="lg" fontWeight="normal">
                Small Business Administration (SBA) Profile
                <Link
                  href="https://web.sba.gov/pro-net/search/dsp_profile.cfm?requesttimeout=60&duns=080009965"
                  isExternal
                >
                  Colorful Dots, LLC &bull; SBA.gov Profile
                </Link>
              </Text>
            </Stat>

            <Stat
              title=""
              value="NYS VENDOR ID              "
              color={props.color}
              position="relative"
            >
              <DotIcon
                boxSize={10}
                bg={randomColor().toString()}
                position="absolute"
                top={12}
                left={-5}
              />
              <Text fontSize="lg" fontWeight="normal">
                New York State Vendor ID: 1100209963
              </Text>
            </Stat>
            <Stat
              title=""
              value="NYS CONTRACTS"
              color={props.color}
              position="relative"
            >
              <DotIcon
                boxSize={10}
                bg={randomColor().toString()}
                position="absolute"
                top={12}
                left={-5}
              />
              <Text fontSize="lg" fontWeight="normal">
                Hourly Based Information Technology Services (HBITS) Group:
                73012 Award: 23158 &bull; New York City Department of
                Information Technology and Telecommunications (DoITT) &bull;
                Information Technology Consulting Services (ITCS) &bull;
                Metropolitan Transportation Authority (MTA) &bull; New York City
                Transit Authority (NYCTA) &bull; New York City (NYC)
                Administration for Children’s Services (ACS) &bull; Financial
                Information Services Agency (FISA) &bull; Health Research, Inc
                (HRI) &bull; Integrated Eligibility System (IES)
              </Text>
            </Stat>
          </SimpleGrid>
        </Box>
      </Stack>
    </Layout>
  );
};

export default GovernmentContractingPage;
