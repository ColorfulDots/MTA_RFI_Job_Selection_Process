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

export const AgenciesPage = (props: {
  bg: string;
  color: string;
  agenciesData: any;
}) => {
  return (
    <Layout
      title="Government Agencies"
      description="Below is a list of the Government Agencies Colorful Dots, LLC is hiring part-time and full-time job positions for under our Information Technology Staff Augmentation Contracts"
      bg={props.bg}
      color={props.color}
    >
      <HeroTop
        title="Government Agencies"
        tagline="Below is a list of the Government Agencies that we are hiring part-time and full-time job positions for under our Information Technology Staff Augmentation Contracts"
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
              value={`${props.agenciesData?.length} Government Agencies`}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 2, 3, 4, 4]} spacing={10}>
                {props.agenciesData?.map((agency: any, i: any) => (
                  <Card
                    data={agency}
                    key={i}
                    bg={props.bg}
                    color={props.color}
                    type="agencies"
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
  const agencies = await db
    .collection('agencies')
    .orderBy('createdAt', 'desc')
    .get();

  const agenciesData = agencies.docs.map((agency: { data: () => any }) =>
    agency.data(),
  );
  return {
    props: { agenciesData },
    revalidate: 1,
  };
};

export default AgenciesPage;
