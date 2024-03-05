import {
  Box,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Center,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';
import * as React from 'react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { randomColor } from '@/helpers/index';
import db from '@/lib/firebase';
import { GetStaticProps } from 'next';
import { SiSvelte } from 'react-icons/si';
import { lighten } from 'polished';
import { Layout } from '@/components/Layout';

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

export const TechnologiesPage = (props: {
  bg: string;
  color: string;
  technologiesData: any;
}) => {
  return (
    <Layout
      title="Technologies"
      description=""
      bg={props.bg}
      color={props.color}
    >
      <HeroTop
        maxW="4xl"
        title="Technologies"
        tagline="Complex problems can be solved with simple solutions. Our team
        contributes and consumes large quantities of Open Source technologies. <br /><br /> Below is list of some of our most commonly used software..."
      />
      <Stack
        as="section"
        mx="auto"
        px={{ base: '6', md: '8' }}
        py={{ base: '12', md: '20' }}
        spacing="12"
      >
        <Box>
          <SimpleGrid columns={[1, 1, 2, 3, 4, 5]} spacing={10}>
            {props.technologiesData?.map(
              (
                technology: {
                  slug: any;
                  icon: string | undefined;
                  title:
                    | string
                    | number
                    | boolean
                    | {}
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | React.ReactNodeArray
                    | React.ReactPortal
                    | null
                    | undefined;
                },
                i: React.Key | null | undefined,
              ) => (
                <NextLink href={`/technologies/${technology.slug}`} key={i}>
                  <Box
                    p={5}
                    mb={4}
                    color={props.color}
                    borderColor={props.bg}
                    borderWidth={0.5}
                    borderStyle="dotted"
                    boxShadow="base"
                    rounded={{ md: 'lg' }}
                    // size="lg"
                    fontSize="md"
                    fontWeight="bold"
                    outline="none"
                    _hover={{
                      outline: 'none',
                      bg: lighten(0.05, props.bg),
                      color: props.color,
                      boxShadow: 'md',
                      borderColor: props.bg,
                    }}
                    cursor="pointer"
                    // boxShadow={`inherit inherit inherit inherit ${props.color}`}
                  >
                    <Center color={props.color}>
                      {technology.icon === 'svelte' ? (
                        <Box mb={8}>
                          <SiSvelte size={128} />
                        </Box>
                      ) : (
                        <Text
                          fontSize="9xl"
                          mb={8}
                          className={technology.icon}
                        />
                      )}
                    </Center>

                    <Heading as="h2" fontSize={18} mb={2} position="relative">
                      <>
                        <DotIcon
                          boxSize={10}
                          position="absolute"
                          top={-48}
                          left={-10}
                          bg={randomColor().toString()}
                        />{' '}
                        {technology.title}
                      </>
                    </Heading>
                  </Box>
                </NextLink>
              ),
            )}
          </SimpleGrid>
        </Box>
      </Stack>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const technologies = await db
    .collection('technologies')
    .orderBy('title', 'asc')
    .get();

  const technologiesData = technologies.docs.map(
    (technology: { data: () => any }) => technology.data(),
  );
  return {
    props: { technologiesData },
    revalidate: 1,
  };
};

export default TechnologiesPage;
