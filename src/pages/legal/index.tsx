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

export const LegalPage = (props: {
  bg: string;
  color: string;
  legalsData: any;
}) => {
  return (
    <Layout
      title="Legal"
      description="We're upfront and transparent as possible with our Privacy Policy,
      Terms of Use Policy, and other legal agreements between our users,
      clients, and partners."
      bg={props.bg}
      color={props.color}
    >
      <HeroTop
        maxW="2xl"
        title="Legal"
        tagline="We're upfront and transparent as possible with our Privacy Policy,
        Terms of Use Policy, and other legal agreements between our users,
        clients, and partners. <br /><br />Please find our legal documents below..."
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
              value={`${props.legalsData?.length} Legal Documents`}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 2, 2, 4, 5]} spacing={10}>
                {props.legalsData?.map((legal: any, i: any) => (
                  <Card
                    data={legal}
                    key={i}
                    bg={props.bg}
                    color={props.color}
                    type="legal"
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
  const legals = await db
    .collection('legals')
    .orderBy('createdAt', 'desc')
    .get();

  const legalsData = legals.docs.map((legal: { data: () => any }) =>
    legal.data(),
  );
  return {
    props: { legalsData },
    revalidate: 1,
  };
};

export default LegalPage;
