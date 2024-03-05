import {
  Box,
  Text,
  SimpleGrid,
  Stack,
  Button,
  Skeleton,
} from '@chakra-ui/react';
import * as React from 'react';
import { useRouter } from 'next/router';
import { lighten, darken, transparentize } from 'polished';
import { Layout } from '@/components/Layout';
import dynamic from 'next/dynamic';

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

export const LabsPage = (props: any) => {
  const router = useRouter();

  return (
    <Layout
      title="Labs"
      description="Welcome to the Lab! Here you will discover experimental prototypes, upcoming products, technology innovation, design concepts and more"
      bg={props.bg}
      color={props.color}
    >
      <HeroTop
        maxW="4xl"
        title="Labs"
        tagline="Welcome to the Lab! Here you will discover experimental prototypes, upcoming products, technology innovation, design concepts and more. <br/><br />Below are some of our upcoming and completed projects:"
        actionButton={
          <>
            <Button
              onClick={() => router.push('/colors')}
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
              Colors
            </Button>

            <Button
              onClick={() => router.push('/technology-glossary')}
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
              Glossary
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
        <SimpleGrid
          mx="auto"
          spacing={{ base: '10', md: '20' }}
          columns={{ base: 1, md: 2, lg: 2 }}
        >
          <Stat
            title="LABS PROJECT: LAUNCHED"
            value="COLORS"
            color={props.color}
          >
            <Text fontSize="lg">
              Explore 16,777,216 color variations through the RGB spectrum to
              help you accurately choose colors for your brand, product, or
              project. We launched our Colors Project in 2018 and have an
              interesting roadmap of creative features yet to come.
            </Text>
            <Box mt={4} textAlign="right">
              <Button
                onClick={() => router.push('/colors')}
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
                Launch Project
              </Button>
            </Box>
          </Stat>
          <Stat
            title="LABS PROJECT: LAUNCHED"
            value="GLOSSARY"
            color={props.color}
          >
            <Text fontSize="lg">
              We created a very useful technology resource for our clients to
              help define common computer programming terminology. Our intention
              is to help junior developers, product owners, designers and more
              understand and communicate technology &quot;mumbo jumbo&quot; with
              software engineers and developers more effectively.
            </Text>
            <Box mt={4} textAlign="right">
              <Button
                onClick={() => router.push('/technology-glossary')}
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
                Launch Project
              </Button>
            </Box>
          </Stat>

          <Stat
            title="ANTICIPATED LAUNCH: FALL 2023"
            value="VR LEARNING SYSTEM"
            color={props.color}
          >
            <Text fontSize="lg">
              Immersive Virtual Reality Education &amp; Learning System.
              Advanced technology designed to help raise engagement &amp;
              increase knowledge retention for students of all ages.
            </Text>
          </Stat>

          <Stat
            title="ANTICIPATED LAUNCH: SPRING 2023"
            value="ENTERPRISE LMS"
            color={props.color}
          >
            <Text fontSize="lg">
              Designed for the modern classroom, our Enterprise Learning
              Management System is a pioneering world-class system that rapidly
              prepares students and educators for a fast-paced future of
              success.
            </Text>
          </Stat>
        </SimpleGrid>
      </Stack>
    </Layout>
  );
};

export default LabsPage;
