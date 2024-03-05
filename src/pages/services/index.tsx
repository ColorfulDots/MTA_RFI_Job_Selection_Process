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

export const ServicesPage = (props: {
  bg: string;
  color: string;
  servicesData: any;
}) => {
  return (
    <Layout
      title="Services"
      description="We provide a wide range of digital services. From graphic &amp; logo design to complex mixed media AR/VR development. "
      bg={props.bg}
      color={props.color}
    >
      <HeroTop
        maxW="2xl"
        title="Services"
        tagline="We provide a wide range of digital services and solutions for small startups to large government enterprises. <br/><br/>Please
        select a service below to learn more..."
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
            columns={{ base: 1, md: 1 }}
          >
            <Stat
              title=""
              value={`${props.servicesData?.length} Technical Services`}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 2, 2, 4, 5]} spacing={10}>
                {props.servicesData?.map((service: any, i: any) => (
                  <Card
                    data={service}
                    key={i}
                    bg={props.bg}
                    color={props.color}
                    type="services"
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
  const services = await db.collection('services').get();

  const servicesData = services.docs.map((service: { data: () => any }) =>
    service.data(),
  );
  return {
    props: { servicesData },
    revalidate: 1,
  };
};

export default ServicesPage;
