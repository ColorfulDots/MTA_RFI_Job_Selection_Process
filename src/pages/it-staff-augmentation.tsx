import {
  Box,
  Text,
  Stack,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  Button,
} from '@chakra-ui/react';
import * as React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { randomColor } from '@/helpers/index';
import { lighten, darken, transparentize } from 'polished';
import { Layout } from '@/components/Layout';

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
export const ITStaffAugmentation = (props: {
  bg: string;
  color: string;
  blogsData: any;
}) => {
  const router = useRouter();

  return (
    <Layout
      title="IT Staff Augmentation"
      description="We're supporting several NYS Government contracts with a HUGE demand in technical resources. Collectively, with our partners, we're continually evolving our pipeline and strategy towards sourcing and hiring the absolute best candidates possible."
      bg={props.bg}
      color={props.color}
    >
      <HeroTop
        maxW="4xl"
        title="IT Staff Augmentation"
        tagline="We're supporting several NYS Government contracts with a HUGE demand in technical resources. Collectively, with our partners, we're continually evolving our pipeline and strategy towards sourcing and hiring the absolute best candidates possible."
        actionButton={
          <>
            <Button
              onClick={() => router.push('/contact')}
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
            </Button>{' '}
            <Button
              onClick={() => router.push('/partnerships')}
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
            </Button>{' '}
            <Button
              onClick={() =>
                router.push(
                  'https://colorfuldots.s3.amazonaws.com/Capability-Statement-2022.pdf',
                )
              }
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
            </Button>{' '}
            <Button
              onClick={() => router.push('/careers')}
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
              Careers
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
            columns={{ base: 1, md: 2, lg: 2, xl: 2, '2xl': 2 }}
          >
            <Stat
              title=""
              value="Staffing Agencies"
              color={props.color}
              mb={4}
              position="relative"
            >
              <DotIcon
                position="absolute"
                top={12}
                left={-5}
                boxSize={10}
                bg={`${randomColor()}`}
              />
              <Text fontSize="lg" fontWeight="normal">
                Technical Staffing Firms, we welcome you to join our team to
                help your business flourish and to more importantly, put your
                candidates to work in New York State and beyond. For
                consideration, please complete the Staffing Partnership
              </Text>
              <Box mt={8} textAlign="right">
                <Button
                  onClick={() => router.push('/partnerships')}
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
                  Partnership Application
                </Button>
              </Box>
            </Stat>

            <Stat
              title=""
              value="Diversity &amp; Inclusion"
              color={props.color}
              mb={4}
              position="relative"
            >
              <DotIcon
                position="absolute"
                top={12}
                left={-5}
                boxSize={10}
                bg={`${randomColor()}`}
              />
              <Text fontSize="lg" fontWeight="normal">
                At Colorful Dots, LLC, maintaining a diverse and inclusive
                workplace is of utmost importance. Diversity is part of our
                culture and core values, and is included in our recruiting,
                hiring, training, transfer and promotion processes.
              </Text>
              <Text fontSize="lg" fontWeight="normal" mt={4}>
                We understand and are committed to integrating diversity and
                inclusion in all our business practices, as our employees are
                our most important asset and provide the high levels of quality
                service that our customers expect.
              </Text>
            </Stat>

            <Stat
              title=""
              value="Equal Opportunity"
              color={props.color}
              mb={4}
              position="relative"
            >
              <DotIcon
                position="absolute"
                top={12}
                left={-5}
                boxSize={10}
                bg={`${randomColor()}`}
              />
              <Text fontSize="lg" fontWeight="normal">
                Our policies and procedures promote equal opportunity for all
                employees and applicant candidates without regard to race,
                color, religion, national origin, sex, age, physical or mental
                disability, pregnancy, sexual orientation, gender identity,
                genetic information, or veteran status.
              </Text>
              <Text fontSize="lg" fontWeight="normal" mt={4}>
                In addition, our policies and procedures prohibit discrimination
                and harassment based on race, color, religion, national origin,
                sex, age, physical or mental disability, pregnancy, sexual
                orientation, gender identity, genetic information, or veteran
                status. Colorful Dots, LLC has a zero tolerance policy for any
                act of discrimination and harassment concerning an employee,
                applicant candidate, or any individual who reports an incident
                of discrimination or harassment.
              </Text>
            </Stat>

            <Stat
              title=""
              value="Veterans"
              color={props.color}
              mb={4}
              position="relative"
            >
              <DotIcon
                position="absolute"
                top={12}
                left={-5}
                boxSize={10}
                bg={`${randomColor()}`}
              />
              <Text fontSize="lg" fontWeight="normal">
                Colorful Dots, LLC is a veteran owned and operated organization
                that is committed to hiring transitioning U.S. military members,
                military spouses, and honorably-discharged U.S. veterans.
              </Text>

              <Text fontSize="lg" fontWeight="normal" mt={4}>
                We offer on-the-job training (OJT), personalized career
                coaching, expert mentoring, and dedicate our resources to
                establish a clear pathway towards success for our nation&apos;s
                veterans and military members seeking career growth in the
                technology industry.
              </Text>

              <Text fontSize="lg" fontWeight="normal" mt={4}>
                In an effort to provide sustainable employment to our veterans
                and military personnel, we are dedicated to give back to the
                U.S. Department of Veterans Affairs through our diversity &amp;
                inclusion employment program.
              </Text>
              <Text fontSize="lg" fontWeight="normal" mt={4}>
                The U.S. Department of Veterans Affairs has helped our company
                grow through the Vocational Rehabilitation and Employment
                (VR&amp;E) program under Chapter 31, 38 CFR 21.257 -
                Self-employment track.
              </Text>
            </Stat>
          </SimpleGrid>
        </Box>
      </Stack>
    </Layout>
  );
};

export default ITStaffAugmentation;
