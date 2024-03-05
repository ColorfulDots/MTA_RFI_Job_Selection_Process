import firebase from 'firebase/app';
import { GetStaticProps, GetStaticPaths } from 'next';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Skeleton,
  SkeletonCircle,
  Stack,
} from '@chakra-ui/react';
import { lighten } from 'polished';
import * as React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import parse from 'html-react-parser';
import NextLink from 'next/link';
import { isAdmin, truncateString, randomColor } from '@/helpers/index';
import { Layout } from '@/components/Layout';
import { BreadcrumbJsonLd } from 'next-seo';
import { useUser } from '@/hooks/useUser';

const StartServicesForm = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.StartServicesForm),
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

export interface DetailsProps {
  service: any | undefined;
  bg: string;
  color: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  let services = [];
  const ref = firebase.firestore().collection('services');
  try {
    let allServices = await ref.get();
    for (const doc of allServices.docs) {
      let data = doc.data();
      // console.log(data);
      services.push({ ...data });
    }
  } catch (e) {
    console.log(e);
  }
  const paths = services.map((service) => ({
    params: { slug: service['slug'] },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<DetailsProps> = async (
  context,
): Promise<any> => {
  let service = {};

  try {
    const ref = firebase
      .firestore()
      .collection('services')
      .where('slug', '==', context.params && context.params['slug']);

    const snapshot = await ref.get();
    snapshot.forEach((doc) => {
      // console.log(doc.id, '=>', doc.data());
      const data = doc.data();
      service = { ...data, id: doc.id };
    });
    return {
      props: { service },
      revalidate: 1,
    };
  } catch (e) {
    console.log(e);
  }
};

const ServicesDetailPage: React.FC<DetailsProps> = (props) => {
  const { userData } = useUser();
  const router = useRouter();

  if (router.isFallback) {
    return <div>Fetching fresh data...</div>;
  }

  return (
    <>
      {props.service && (
        <Layout
          title={`${props.service.name}`}
          description={`${truncateString(
            props.service.intro.replace(/<[^>]*>?/gm, ' '),
            150,
          )}`}
          bg={props.bg}
          color={props.color}
        >
          <HeroTop
            maxW="5xl"
            title={props.service.name}
            tagline={props.service.intro}
            breadcrumbs={
              <Breadcrumb mt={4}>
                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/services">
                    Services
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>{props.service.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            }
            actionButton={
              isAdmin(userData && userData) && (
                <Button
                  onClick={() =>
                    router.push(
                      `/dashboard/pages/services/edit/${props.service.id}`,
                    )
                  }
                  mb={{ base: '4', md: '0' }}
                  w={{ base: 'full', md: 'auto' }}
                  colorScheme="whiteAlpha"
                  color={props.color}
                  borderColor={props.bg}
                  borderWidth={0.5}
                  borderStyle="dotted"
                  boxShadow="base"
                  rounded={{ md: 'lg' }}
                  size="lg"
                  fontSize="md"
                  fontWeight="bold"
                  outline="none"
                  _hover={{
                    outline: 'none',
                    bg: lighten(0.05, props.bg),
                    color: props.color,
                    boxShadow: 'outline',
                    borderColor: props.bg,
                  }}
                >
                  Edit Service
                </Button>
              )
            }
          />

          <BreadcrumbJsonLd
            itemListElements={[
              {
                position: 1,
                name: 'Home',
                item: 'https://colorfuldots.com/',
              },
              {
                position: 2,
                name: 'FAQs',
                item: 'https://colorfuldots.com/services',
              },
              {
                position: 3,
                name: props.service.name,
                item: `https://colorfuldots.com/services/${props.service.slug}`,
              },
            ]}
          />
          <SimpleGrid columns={[1, 1, 1, 1, 1, 2]} spacing={10}>
            <Box p={10}>
              <SimpleGrid
                mx="auto"
                my={8}
                spacing={{ base: '14', md: '30', lg: '30', xl: '30' }}
                columns={[1, 1, 1, 1, 1, 2]}
              >
                <Stat
                  title=""
                  value="AVG COST"
                  color={props.color}
                  position="relative"
                >
                  <DotIcon
                    boxSize={10}
                    position="absolute"
                    top={[10, 10, 12, 12, 12]}
                    left={-5}
                    bg={randomColor().toString()}
                  />{' '}
                  <Text fontSize={['2xl', '2xl', '3xl', '4xl']}>
                    {props.service.priceRange}
                  </Text>
                  Per {props.service.avgCostPer?.label}
                </Stat>
                <Stat
                  title=""
                  value="AVG TIMELINE"
                  color={props.color}
                  position="relative"
                >
                  <DotIcon
                    boxSize={10}
                    position="absolute"
                    top={[10, 10, 12, 12, 12]}
                    left={-5}
                    bg={randomColor().toString()}
                  />{' '}
                  <Text fontSize={['2xl', '2xl', '3xl', '4xl']}>
                    {props.service.timeline}
                  </Text>
                  Implementation Timeline
                </Stat>

                <Stat
                  title=""
                  value="OUR SKILL LEVEL"
                  color={props.color}
                  position="relative"
                >
                  <DotIcon
                    boxSize={10}
                    position="absolute"
                    top={[10, 10, 12, 12, 12]}
                    left={-5}
                    bg={randomColor().toString()}
                  />{' '}
                  <Text fontSize={['2xl', '2xl', '3xl', '4xl']}>
                    {props.service.skillLevel.label}
                  </Text>
                  Based on our comfort and knowledge levels
                </Stat>

                <Stat
                  title=""
                  value="GOOD FOR"
                  color={props.color}
                  position="relative"
                >
                  <DotIcon
                    boxSize={10}
                    position="absolute"
                    top={[10, 10, 12, 12, 12]}
                    left={-5}
                    bg={randomColor().toString()}
                  />{' '}
                  <Text fontSize={['2xl', '2xl', '3xl', '4xl']}>
                    {props.service.projectScope}
                  </Text>
                  Company Size
                </Stat>
              </SimpleGrid>

              <Stat
                title=""
                value="Overview"
                color={props.color}
                position="relative"
              >
                <DotIcon
                  boxSize={10}
                  position="absolute"
                  top={[10, 10, 12, 12, 12]}
                  left={-5}
                  bg={randomColor().toString()}
                />{' '}
                <Box
                  fontSize="lg"
                  color={props.color}
                  className="jobDescription"
                >
                  {parse(props.service.description.toString())}
                </Box>
              </Stat>
            </Box>
            <Box p={10}>
              <Box mb={4}>
                <Heading
                  fontSize={['lg', 'xl', '2xl']}
                  fontWeight="extrabold"
                  position="relative"
                >
                  <DotIcon
                    boxSize={10}
                    position="absolute"
                    top={[12, 12, 12, 12, 14]}
                    left={-4}
                    bg={randomColor().toString()}
                  />{' '}
                  Ready to grow your business?
                </Heading>
                <Text>Please tell us more about your project below</Text>
              </Box>

              <StartServicesForm servicesData={props.service} {...props} />
            </Box>
          </SimpleGrid>
        </Layout>
      )}
    </>
  );
};

export default ServicesDetailPage;
