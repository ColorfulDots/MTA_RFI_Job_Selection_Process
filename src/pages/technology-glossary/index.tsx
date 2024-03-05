import {
  Box,
  Stack,
  SimpleGrid,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Skeleton,
} from '@chakra-ui/react';
import * as React from 'react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import db from '@/lib/firebase';
import { GetStaticProps } from 'next';
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

const Card = dynamic<any>(
  () => import('@/components/Card').then((mod) => mod.Card),
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

export const TechnologyGlossaryPage = (props: {
  bg: string;
  color: string;
  glossariesData: any;
}) => {
  return (
    <Layout
      title="Technology Glossary"
      description="Below is a growing list of hundreds of common computer programming
      and software development terms and definitions to help our team and
      clients with clear technical communication"
      bg={props.bg}
      color={props.color}
    >
      <HeroTop
        maxW="4xl"
        title="Technology Glossary"
        tagline="Below is a growing list of hundreds of common computer programming
        and software development terms and definitions to help our team and
        clients with clear technical communication"
        breadcrumbs={
          <Breadcrumb mt={4}>
            <BreadcrumbItem>
              <BreadcrumbLink as={NextLink} href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink as={NextLink} href="/labs">
                Labs
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>Technology Glossary</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        }
      />

      <Stack
        as="section"
        mx="auto"
        px={{ base: '6', md: '8' }}
        py={{ base: '0', md: '10' }}
        spacing="12"
      >
        <Box>
          <SimpleGrid
            mx="auto"
            my={4}
            spacing={{ base: '10', md: '20' }}
            columns={{ base: 1, md: 1 }}
          >
            <Stat
              title=""
              value={`${props.glossariesData?.length} Glossary Items`}
              bg={props.bg}
              color={props.color}
            >
              {/* <Text mb={4}>
                We're a full-glossary software development agency focused on
                creating enterprise software products for Fortune 500's, State
                &amp; Federal Government agencies, and early to high-growth
                stage startups. For over 20 years our team, networks, and
                partners have been deeply rooted in the software industry. We’re
                hard-wired to prototype, build, measure, and deliver exceptional
                results to each and every one of our clients.
              </Text> */}
              <SimpleGrid columns={[1, 1, 2, 2, 4, 5]} spacing={10}>
                {props.glossariesData?.map((glossary: any, i: any) => (
                  <Card
                    data={glossary}
                    key={i}
                    bg={props.bg}
                    color={props.color}
                    type="technology-glossary"
                  />
                ))}
              </SimpleGrid>
            </Stat>
          </SimpleGrid>
        </Box>
      </Stack>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const glossaries = await db
    .collection('glossaries')
    .orderBy('term', 'asc')
    .get();

  const glossariesData = glossaries.docs.map((glossary: { data: () => any }) =>
    glossary.data(),
  );
  return {
    props: { glossariesData },
    revalidate: 1,
  };
};

export default TechnologyGlossaryPage;
