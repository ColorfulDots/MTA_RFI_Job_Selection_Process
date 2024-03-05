import {
  Box,
  Heading,
  Stack,
  SimpleGrid,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';
import * as React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { randomColor, truncateString, upperCase } from '@/helpers/index';
import parse from 'html-react-parser';
import { lighten } from 'polished';
import { Layout } from '@/components/Layout';
import { useCollection } from '@nandorojo/swr-firestore';

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

export const CareersPage = (props: { bg: string; color: string }) => {
  const router = useRouter();
  const { data: agenciesData } = useCollection<any>('agencies', {
    where: ['state.label', '==', upperCase(router.query.state)],
  });
  return (
    <Layout
      title={`${upperCase(router.query.state)} State Government Agencies`}
      description={`Below you will find a list of our ${upperCase(
        router.query.state,
      )} Government Agency Jobs`}
      bg={props.bg}
      color={props.color}
    >
      <HeroTop
        maxW="5xl"
        title={`${upperCase(router.query.state)} State Government Agencies`}
        tagline={`Below is a list of the ${upperCase(
          router.query.state,
        )} State Government Agencies that we are working with. To see open job positions, please click on an agency card below.`}
        breadcrumbs={
          <Breadcrumb mt={4}>
            <BreadcrumbItem>
              <BreadcrumbLink as={NextLink} href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>Agencies</BreadcrumbLink>
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
              value={`${agenciesData?.length} ${upperCase(
                router.query.state,
              )} State Government Agencies`}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 2, 3, 4, 4]} spacing={10}>
                {agenciesData?.map((agency: any, i: any) => (
                  <NextLink
                    href={`/agencies/${router.query.state}/government/${agency.slug}`}
                    key={i}
                  >
                    <Box
                      p={5}
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
                      <Heading as="h2" fontSize={18} mb={2} position="relative">
                        <DotIcon
                          boxSize={10}
                          position="absolute"
                          top={-10}
                          left={-10}
                          bg={randomColor().toString()}
                        />{' '}
                        {agency.agencyName}
                      </Heading>

                      <Box mt={4} fontWeight="normal">
                        {parse(truncateString(agency.intro.toString(), 100))}
                      </Box>
                    </Box>
                  </NextLink>
                ))}
              </SimpleGrid>
            </Stat>
          </SimpleGrid>
        </Box>
      </Stack>
    </Layout>
  );
};

export default CareersPage;
