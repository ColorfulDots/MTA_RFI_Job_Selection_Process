import { Box, Stack, SimpleGrid, Skeleton } from '@chakra-ui/react';
import * as React from 'react';
import dynamic from 'next/dynamic';
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

export const GovernmentAcronymsPage = (props: {
  bg: string;
  color: string;
  acronymsData: any;
}) => {
  return (
    <Layout
      title="Government Acronyms"
      description="Below is a list of Government Acronyms that may help you decipher commonly used terms in government contracting and government organizations"
      bg={props.bg}
      color={props.color}
    >
      <HeroTop
        title="Government Acronyms"
        tagline="Below is a list of Government Acronyms that may help you decipher commonly used terms in government contracting and government organizations"
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
            my={4}
            spacing={{ base: '10', md: '20' }}
            columns={{ base: 1, md: 1 }}
          >
            <Stat
              title=""
              value={`${props.acronymsData?.length} Government Acronyms`}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 2, 2, 4, 5]} spacing={10}>
                {props.acronymsData?.map((governmentAcronyms: any, i: any) => (
                  <Card
                    data={governmentAcronyms}
                    key={i}
                    bg={props.bg}
                    color={props.color}
                    type="government-acronyms"
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
  const acronyms = await db.collection('acronyms').orderBy('term', 'asc').get();

  const acronymsData = acronyms.docs.map(
    (governmentAcronyms: { data: () => any }) => governmentAcronyms.data(),
  );
  return {
    props: { acronymsData },
    revalidate: 1,
  };
};

export default GovernmentAcronymsPage;
