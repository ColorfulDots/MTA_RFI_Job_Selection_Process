import {
  Box,
  Button,
  Img,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { randomColor } from '@/helpers/index';
import { lighten, darken, transparentize } from 'polished';
import { Layout } from '@/components/Layout';
import * as React from 'react';

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

export const AboutPage = (props: any) => {
  const router = useRouter();
  return (
    <Layout
      title="About"
      description="Colorful Dots, LLC is a full service software development agency focused on creating custom software products for Fortune 500's, State &amp; Federal Government agencies, and high-growth startups."
      bg={props.bg}
      color={props.color}
      structuredData={`
      {
        "@context": "http://schema.org/",
        "@type": "AboutPage",
          "description": "Colorful Dots, LLC is a full-service software development digital agency focused on
          creating enterprise software products for Fortune 500's, State &
          Federal Government agencies, and early to high-growth stage
          startups. For over 20 years our team, networks, and partners
          have been deeply rooted in the software industry. We’re
          hard-wired to prototype, build, measure, and deliver exceptional
          results to each and every one of our clients.",
          "image": "https://colorfuldots.com/_next/image?url=https%3A%2F%2Fcolorfuldots.s3.amazonaws.com%2Fcd-assets%2Fimages%2Fcolorful-dots-llc-logo-2020.svg&w=320&q=100",
          "name": "Colorful Dots, LLC",
          "url": "https://colorfuldots.com/about"
      }
      `}
    >
      <HeroTop
        maxW="4xl"
        title="About Us"
        tagline="Colorful Dots, LLC is a full-service software development digital agency focused on
        creating enterprise software products for Fortune 500's, State &amp;
        Federal Government agencies, and early to high-growth stage
        startups. For over 20 years our team, networks, and partners
        have been deeply rooted in the software industry. We’re
        hard-wired to prototype, build, measure, and deliver exceptional
        results to each and every one of our clients."
        actionButton={
          <>
            <Button
              onClick={() => router.push('/contact')}
              w={{ base: 'full', md: 'auto' }}
              // colorScheme="whiteAlpha"
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
            </Button>{' '}
            <Button
              onClick={() =>
                router.push(
                  'https://colorfuldots.s3.amazonaws.com/Capability-Statement-2022.pdf',
                )
              }
              w={{ base: 'full', md: 'auto' }}
              // colorScheme="whiteAlpha"
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
            columns={{ base: 1, md: 2, lg: 2, xl: 2, '2xl': 4 }}
          >
            <Stat
              title=""
              value="MISSION"
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
                Our mission is to enable people and organizations in public and
                private sectors to reach their greatest potential through the
                use of our world-class digital products and technology services.
              </Text>
            </Stat>
            <Stat
              title=""
              value="VISION"
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
                Our vision is founded upon our belief that the power of
                technology should not be underestimated; technology has the
                power to improve lives. We push the boundaries of technology
                forward for every client we serve.
              </Text>
            </Stat>
            <Stat
              title=""
              value="CERTIFIED"
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
                   alt="Colorful Dots, LLC - Best Mobile App Development Company in New York City 2020 - 2021"
                /> */}
              </Stack>
              <Text fontSize="lg" fontWeight="normal" mb={6}>
                We&apos;re a Federal &amp; NY State Certified HUBZone / SDVOSB /
                SDVOB Company. We&apos;re military grade and we&apos;re on a
                mission.
              </Text>
            </Stat>
            <Stat
              title=""
              value="TOP RATED"
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
              <Stack direction={['column', 'column', 'row']} spacing={10}>
                <Img
                  loading="lazy"
                  src="https://digital.com/wp-content/uploads/Mobile-App-Developers-in-New-York-City.png?x53026"
                  boxSize="30%"
                  objectFit="cover"
                  alt="Colorful Dots, LLC - Best Mobile App Development Company in New York City 2020 - 2021"
                  title="Colorful Dots, LLC - Best Mobile App Development Company in New York City 2020 - 2021"
                />
                <Img
                  loading="lazy"
                  src="https://colorfuldots.s3.amazonaws.com/cd-assets/images/ny_nyc_mobile-app-development_2020_transparent.svg"
                  boxSize="30%"
                  objectFit="cover"
                  alt="Colorful Dots, LLC - Best Mobile App Development Company 2020"
                  title="Colorful Dots, LLC - Best Mobile App Development Company 2020"
                />
                <Img
                  loading="lazy"
                  src="https://colorfuldots.s3.amazonaws.com/cd-assets/images/ny_nyc_mobile-app-development_2021_transparent.svg"
                  boxSize="30%"
                  objectFit="cover"
                  alt="Colorful Dots, LLC - Best Mobile App Development Company 2021"
                  title="Colorful Dots, LLC - Best Mobile App Development Company 2021"
                />
              </Stack>
            </Stat>

            <Stat
              title=""
              value="EXPERIENCE"
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
                We have 20 years of experience in the technology industry. We
                are passionately committed and remain current with the latest
                technology advancements.
              </Text>
            </Stat>
            <Stat
              title=""
              value="LEADERSHIP"
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
                We have a strong leadership team that has former US military
                experience and has lead high profile technology teams and
                companies for nearly two decades.
              </Text>
            </Stat>
            <Stat
              title=""
              value="PARTNERSHIPS"
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
                We continually establish, maintain, and grow our technology
                partnerships to help us strengthen our capabilities, experience,
                and maximize our results.
              </Text>
            </Stat>
            <Stat
              title=""
              value="COMMUNICATION"
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
                We pride ourselves on customer satisfaction and we encourage our
                clients to contact us 24/7 365 days a week. We communicate
                through the most suitable communication channels of your choice.
              </Text>
            </Stat>

            <Stat
              title=""
              value="AFFORDABILITY"
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
                We practice industry standard pricing down to the penny. We
                offer flexible payment options for clients who need to get to
                the next round of funding. We aim to beat or match any quotes
                you receive from other agencies.
              </Text>
            </Stat>
            <Stat
              title=""
              value="INNOVATION"
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
                We leverage stable and proven technologies to get you up and
                running quickly. We focus and specialize in developing custom
                software tailored to your specific use case and requirements. No
                cookie cutter software here.
              </Text>
            </Stat>
            <Stat
              title=""
              value="DOCUMENTATION"
              color={props.color}
              position="relative"
            >
              <DotIcon
                boxSize={10}
                bg={randomColor().toString()}
                position="absolute"
                top={12}
                left={-5}
              />{' '}
              <Text fontSize="lg" fontWeight="normal">
                We document every function, file, and process throughout our
                software development journey with each and every client we
                serve. Product handoffs to an internal or external development
                team is effortless with us.
              </Text>
            </Stat>
            <Stat
              title=""
              value="PROTECTION"
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
                Our insurance policy meets the standards and requirements set
                forth by Federal and NY State government. We aim to protect our
                professional relationships between our employees, contractors,
                clients, partners, and vendors.
              </Text>
            </Stat>
          </SimpleGrid>
        </Box>
      </Stack>
    </Layout>
  );
};

export default AboutPage;
