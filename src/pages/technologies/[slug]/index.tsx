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
import { useUser } from '@/hooks/useUser';
import { NextSeo } from 'next-seo';

const StartTechnologiesForm = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.StartTechnologiesForm),
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
  technology: any | undefined;
  bg: string;
  color: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  let technologies = [];
  const ref = firebase.firestore().collection('technologies');
  try {
    let allTechnologies = await ref.get();
    for (const doc of allTechnologies.docs) {
      let data = doc.data();
      // console.log(data);
      technologies.push({ ...data });
    }
  } catch (e) {
    console.log(e);
  }
  const paths = technologies.map((technology) => ({
    params: { slug: technology['slug'] },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<DetailsProps> = async (
  context,
): Promise<any> => {
  let technology = {};

  try {
    const ref = firebase
      .firestore()
      .collection('technologies')
      .where('slug', '==', context.params && context.params['slug']);

    const snapshot = await ref.get();
    snapshot.forEach((doc) => {
      // console.log(doc.id, '=>', doc.data());
      const data = doc.data();
      technology = { ...data, id: doc.id };
    });
    return {
      props: { technology },
      revalidate: 1,
    };
  } catch (e) {
    console.log(e);
  }
};

const TechnologiesDetailPage: React.FC<DetailsProps> = (props) => {
  const { userData } = useUser();
  const router = useRouter();

  if (router.isFallback) {
    return <div>Fetching fresh data...</div>;
  }

  return (
    <>
      {props.technology && (
        <Layout
          title={`${props.technology.title}`}
          description={`${truncateString(
            props.technology.description.toString().replace(/<[^>]*>?/gm, ' '),
            145,
          )}`}
          bg={props.bg}
          color={props.color}
        >
          <NextSeo
            title={`${props.technology.title}`}
            description={`${truncateString(
              props.technology.description
                .toString()
                .replace(/<[^>]*>?/gm, ' '),
              145,
            )}`}
            openGraph={{
              url: `https://colorfuldots.com/technologies/${props.technology.slug}`,
              title: `${props.technology.title}`,
              description: `${truncateString(
                props.technology.description
                  .toString()
                  .replace(/<[^>]*>?/gm, ' '),
                145,
              )}`,
              images: [],
              site_name: 'colorfuldots.com',
            }}
            twitter={{
              handle: '@colorfuldotsHQ',
              site: '@colorfuldotsHQ',
              cardType: 'summary_large_image',
            }}
          />

          <HeroTop
            maxW="5xl"
            title={props.technology.title}
            tagline={props.technology.description}
            icon={
              <Text
                fontSize="9xl"
                mb={8}
                className={`${props.technology.icon}`}
              />
            }
            breadcrumbs={
              <Breadcrumb mt={4}>
                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/technologies">
                    Technologies
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>{props.technology.title}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            }
            actionButton={
              isAdmin(userData && userData) && (
                <Button
                  onClick={() =>
                    router.push(
                      `/dashboard/pages/technologies/edit/${props.technology.id}`,
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
                  Edit Technology
                </Button>
              )
            }
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
                    {props.technology.avgCost}
                  </Text>
                  Per {props.technology.avgCostPer?.label}
                </Stat>
                <Stat
                  title=""
                  value="EXPERIENCE"
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
                    {props.technology.teamExpYears}
                  </Text>{' '}
                  Years
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
                    {props.technology.teamSkillLevel?.label}
                  </Text>
                  Based on our comfort and knowledge levels
                </Stat>

                <Stat
                  title=""
                  value="OUR RATING"
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
                    {props.technology.rating?.label}
                  </Text>
                  Based on our overall developer experience
                </Stat>
              </SimpleGrid>

              {props.technology.upSellMessage && (
                <Stat
                  title=""
                  value="LEARN MORE"
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
                    {parse(props.technology.upSellMessage.toString())}
                  </Box>
                </Stat>
              )}
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
                    top={[20, 12, 12, 12, 14]}
                    left={-4}
                    bg={randomColor().toString()}
                  />{' '}
                  Ready to grow your business?
                </Heading>
                <Text>Please tell us more about your project below</Text>
              </Box>

              <StartTechnologiesForm
                technologiesData={props.technology}
                {...props}
              />
            </Box>
          </SimpleGrid>
        </Layout>
      )}
    </>
  );
};

export default TechnologiesDetailPage;
