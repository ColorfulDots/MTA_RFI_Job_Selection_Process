import {
  Box,
  Text,
  SimpleGrid,
  Button,
  Skeleton,
  SkeletonCircle,
  Stack,
} from '@chakra-ui/react';
import * as React from 'react';
import dynamic from 'next/dynamic';
import { randomColor } from '@/helpers/index';
import { lighten, darken, transparentize } from 'polished';
import { Layout } from '@/components/Layout';
import { useRouter } from 'next/router';

const ContactForm = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.ContactForm),
  {
    ssr: false,
    loading: () => (
      <Stack>
        <Skeleton height="800px" />
      </Stack>
    ),
  },
);

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

export const ContactPage = (props: any) => {
  const router = useRouter();
  return (
    <Layout
      title="Contact Us"
      description="Colorful Dots, LLC provides an open line of communication to every customer or
      future customer. Call us toll-free or send us an email."
      bg={props.bg}
      color={props.color}
      structuredData={`{
        "@context": "http://schema.org/",
        "@type": "ContactPage",
          "description": "Colorful Dots, LLC provides an open line of communication to every customer or
          future customer. Call us toll-free or send us an email.",
          "name": "Contact Us",
          "url": "https//colorfuldots.com/contact"
      }`}
    >
      <HeroTop
        maxW="4xl"
        title="Contact Us"
        tagline="We provide an open line of communication to every customer or future customer. Call us toll-free or send us an email."
        actionButton={
          <>
            <Button
              onClick={() => router.push('tel:800-755-6599')}
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
              Call Us Toll-Free
            </Button>{' '}
            <Button
              onClick={() => router.push('/partnerships')}
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
              Partnerships
            </Button>{' '}
            <Button
              onClick={() => router.push('/faqs')}
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
              FAQs
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

      <SimpleGrid
        columns={[1, 1, 1, 2, 2]}
        itemScope
        itemType="https://schema.org/ContactPage"
      >
        <Box p={10}>
          <SimpleGrid columns={[1, 1, 1, 1, 1, 2]} spacing={10}>
            <Stat
              title=""
              value="HEADQUARTERS"
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
                We&apos;re based in Brooklyn, NY -- We have a No Office policy
                --
              </Text>
            </Stat>
            <Stat
              title=""
              value="OFFICE HOURS"
              color={props.color}
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
                Monday - Friday 9AM - 5PM (EST)
              </Text>
            </Stat>
            <Stat
              title=""
              value="PHONE"
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
                Please contact us and follow the guided prompts to reach your
                intended department extension. If you are unable to reach us,
                please leave your contact details and information regarding your
                reason for contacting us and someone will get back to you within
                24 hours
              </Text>

              <Box mt={8} textAlign="right">
                <Button
                  onClick={() => router.push('tel:800-755-6599')}
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
                  Call Us Toll-Free
                </Button>
              </Box>
            </Stat>

            <Stat
              title=""
              value="FAQs"
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
                Find answers to common questions quickly by visiting our
                frequently asked questions page
              </Text>

              <Box mt={8} textAlign="right">
                <Button
                  onClick={() => router.push('/faqs')}
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
                  FAQs
                </Button>
              </Box>
            </Stat>
          </SimpleGrid>
        </Box>
        <Box bg={props.bg} p={10}>
          <ContactForm {...props} />
        </Box>
      </SimpleGrid>
    </Layout>
  );
};

export default ContactPage;
