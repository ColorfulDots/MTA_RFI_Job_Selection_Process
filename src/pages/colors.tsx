import {
  Box,
  Stack,
  SimpleGrid,
  Skeleton,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import * as React from 'react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { GetStaticProps } from 'next';
import useSWR from 'swr';
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

export const ColorsPage = (props: {
  bg: string;
  color: string;
  redColors: any;
  orangeColors: any;
  yellowColors: any;
  greenColors: any;
  blueColors: any;
  indigoColors: any;
  violetColors: any;
}) => {
  const fetcher = (url: RequestInfo, headers: any): any =>
    fetch(url, headers).then((r) => r.json());

  const { data: redsData } = useSWR(
    `https://api.color.pizza/v1/names/red`,
    fetcher,
  );

  const { data: orangeData } = useSWR(
    `https://api.color.pizza/v1/names/orange`,
    fetcher,
  );

  const { data: yellowData } = useSWR(
    `https://api.color.pizza/v1/names/yellow`,
    fetcher,
  );

  const { data: greenData } = useSWR(
    `https://api.color.pizza/v1/names/green`,
    fetcher,
  );

  const { data: blueData } = useSWR(
    `https://api.color.pizza/v1/names/blue`,
    fetcher,
  );

  const { data: indigoData } = useSWR(
    `https://api.color.pizza/v1/names/indigo`,
    fetcher,
  );

  const { data: violetData } = useSWR(
    `https://api.color.pizza/v1/names/violet`,
    fetcher,
  );

  return (
    <Layout
      title="Colors"
      description="The human eye can distinguish approximately 10 million unique
      colors. There are 16,777,216 colors in the RGB spectrum. Below is a
      list of ~30,000 colors grouped by primary colors and associated color
      names."
      bg={props.bg}
      color={props.color}
    >
      <HeroTop
        maxW="5xl"
        title="Colors"
        tagline="The human eye can distinguish approximately 10 million unique
        colors. There are 16,777,216 colors in the RGB spectrum. Below is a
        list of ~30,000 colors grouped by primary colors and associated color
        names."
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
              <BreadcrumbLink>Colors</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
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
            my={4}
            spacing={{ base: '10', md: '20' }}
            columns={{ base: 1, md: 1 }}
          >
            <Stat
              title="Colors"
              value={`${redsData?.colors.length} Red`}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 2, 2, 4, 6]} spacing={10}>
                {redsData?.colors
                  ?.sort((a: { luminance: any }, b: { luminance: any }) => {
                    const luminanceA = a.luminance;
                    const luminanceB = b.luminance;
                    return luminanceA - luminanceB;
                  })
                  .slice(400, 412)
                  .map((color: any, i: any) => (
                    <Card
                      data={color}
                      key={i}
                      bg={props.bg}
                      color={props.color}
                      type="color-list"
                    />
                  ))}
              </SimpleGrid>
            </Stat>
          </SimpleGrid>
        </Box>

        <Box>
          <SimpleGrid
            mx="auto"
            my={4}
            spacing={{ base: '10', md: '20' }}
            columns={{ base: 1, md: 1 }}
          >
            <Stat
              title="Colors"
              value={`${orangeData?.colors.length} Orange`}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 2, 2, 4, 6]} spacing={10}>
                {orangeData?.colors
                  ?.sort((a: { luminance: any }, b: { luminance: any }) => {
                    const luminanceA = a.luminance;
                    const luminanceB = b.luminance;
                    return luminanceA - luminanceB;
                  })
                  .slice(100, 112)
                  .map((color: any, i: any) => (
                    <Card
                      data={color}
                      key={i}
                      bg={props.bg}
                      color={props.color}
                      type="color-list"
                    />
                  ))}
              </SimpleGrid>
            </Stat>
          </SimpleGrid>
        </Box>

        <Box>
          <SimpleGrid
            mx="auto"
            my={4}
            spacing={{ base: '10', md: '20' }}
            columns={{ base: 1, md: 1 }}
          >
            <Stat
              title="Colors"
              value={`${yellowData?.colors.length} Yellow`}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 2, 2, 4, 6]} spacing={10}>
                {yellowData?.colors
                  ?.sort((a: { luminance: any }, b: { luminance: any }) => {
                    const luminanceA = a.luminance;
                    const luminanceB = b.luminance;
                    return luminanceA - luminanceB;
                  })
                  .slice(230, 242)
                  .map((color: any, i: any) => (
                    <Card
                      data={color}
                      key={i}
                      bg={props.bg}
                      color={props.color}
                      type="color-list"
                    />
                  ))}
              </SimpleGrid>
            </Stat>
          </SimpleGrid>
        </Box>

        <Box>
          <SimpleGrid
            mx="auto"
            my={4}
            spacing={{ base: '10', md: '20' }}
            columns={{ base: 1, md: 1 }}
          >
            <Stat
              title="Colors"
              value={`${greenData?.colors.length} Green`}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 2, 2, 4, 6]} spacing={10}>
                {greenData?.colors
                  ?.sort((a: { luminance: any }, b: { luminance: any }) => {
                    const luminanceA = a.luminance;
                    const luminanceB = b.luminance;
                    return luminanceA - luminanceB;
                  })
                  .slice(950, 962)
                  .map((color: any, i: any) => (
                    <Card
                      data={color}
                      key={i}
                      bg={props.bg}
                      color={props.color}
                      type="color-list"
                    />
                  ))}
              </SimpleGrid>
            </Stat>
          </SimpleGrid>
        </Box>

        <Box>
          <SimpleGrid
            mx="auto"
            my={4}
            spacing={{ base: '10', md: '20' }}
            columns={{ base: 1, md: 1 }}
          >
            <Stat
              title="Colors"
              value={`${blueData?.colors.length} Blue`}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 2, 2, 4, 6]} spacing={10}>
                {blueData?.colors
                  ?.sort((a: { luminance: any }, b: { luminance: any }) => {
                    const luminanceA = a.luminance;
                    const luminanceB = b.luminance;
                    return luminanceA - luminanceB;
                  })
                  .slice(800, 812)
                  .map((color: any, i: any) => (
                    <Card
                      data={color}
                      key={i}
                      bg={props.bg}
                      color={props.color}
                      type="color-list"
                    />
                  ))}
              </SimpleGrid>
            </Stat>
          </SimpleGrid>
        </Box>

        <Box>
          <SimpleGrid
            mx="auto"
            my={4}
            spacing={{ base: '10', md: '20' }}
            columns={{ base: 1, md: 1 }}
          >
            <Stat
              title="Colors"
              value={`${indigoData?.colors.length} Indigo`}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 2, 2, 4, 6]} spacing={10}>
                {indigoData?.colors
                  ?.sort((a: { luminance: any }, b: { luminance: any }) => {
                    const luminanceA = a.luminance;
                    const luminanceB = b.luminance;
                    return luminanceA - luminanceB;
                  })
                  .slice(0, 12)
                  .map((color: any, i: any) => (
                    <Card
                      data={color}
                      key={i}
                      bg={props.bg}
                      color={props.color}
                      type="color-list"
                    />
                  ))}
              </SimpleGrid>
            </Stat>
          </SimpleGrid>
        </Box>

        <Box>
          <SimpleGrid
            mx="auto"
            my={4}
            spacing={{ base: '10', md: '20' }}
            columns={{ base: 1, md: 1 }}
          >
            <Stat
              title="Colors"
              value={`${violetData?.colors.length} Violet`}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 2, 2, 4, 6]} spacing={10}>
                {violetData?.colors
                  ?.sort((a: { luminance: any }, b: { luminance: any }) => {
                    const luminanceA = a.luminance;
                    const luminanceB = b.luminance;
                    return luminanceA - luminanceB;
                  })
                  .slice(0, 12)
                  .map((color: any, i: any) => (
                    <Card
                      data={color}
                      key={i}
                      bg={props.bg}
                      color={props.color}
                      type="color-list"
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
  const fetcher = (url: RequestInfo): any => fetch(url).then((r) => r.json());

  const redColors = await fetcher('https://api.color.pizza/v1/names/red');
  const orangeColors = await fetcher('https://api.color.pizza/v1/names/orange');
  const yellowColors = await fetcher('https://api.color.pizza/v1/names/yellow');
  const greenColors = await fetcher('https://api.color.pizza/v1/names/green');
  const blueColors = await fetcher('https://api.color.pizza/v1/names/blue');
  const indigoColors = await fetcher('https://api.color.pizza/v1/names/indigo');
  const violetColors = await fetcher('https://api.color.pizza/v1/names/violet');

  const responses = await Promise.all([
    redColors,
    orangeColors,
    yellowColors,
    greenColors,
    blueColors,
    indigoColors,
    violetColors,
  ]);

  return {
    props: {
      redColors: responses[0],
      orangeColors: responses[1],
      yellowColors: responses[2],
      greenColors: responses[3],
      blueColors: responses[4],
      indigoColors: responses[5],
      violetColors: responses[6],
    },
    revalidate: 1,
  };
};

export default ColorsPage;
