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
  SkeletonCircle,
  Skeleton,
  Stack,
  Spinner,
} from '@chakra-ui/react';
import { lighten } from 'polished';
import * as React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import parse from 'html-react-parser';
import NextLink from 'next/link';
import { isAdmin, randomColor } from '@/helpers/index';
import { Layout } from '@/components/Layout';
import { useUser } from '@/hooks/useUser';

const ContributeFormGlossary = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.ContributeFormGlossary),
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
  glossary: any | undefined;
  bg: string;
  color: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  let glossaries = [];
  const ref = firebase.firestore().collection('glossaries');
  try {
    let allGlossaries = await ref.get();
    for (const doc of allGlossaries.docs) {
      let data = doc.data();
      // console.log(data);
      glossaries.push({ ...data });
    }
  } catch (e) {
    console.log(e);
  }
  const paths = glossaries.map((glossary) => ({
    params: { slug: glossary['slug'] },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<DetailsProps> = async (
  context,
): Promise<any> => {
  let glossary = {};

  try {
    const ref = firebase
      .firestore()
      .collection('glossaries')
      .where('slug', '==', context.params && context.params['slug']);

    const snapshot = await ref.get();
    snapshot.forEach((doc) => {
      // console.log(doc.id, '=>', doc.data());
      const data = doc.data();
      glossary = { ...data, id: doc.id };
    });
    return {
      props: { glossary },
      revalidate: 1,
    };
  } catch (e) {
    console.log(e);
  }
};

const TopBanner = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.TopBanner),
  { ssr: false, loading: () => <Spinner /> },
);

const TechnologyGlossaryDetailPage: React.FC<DetailsProps> = (props) => {
  const { userData } = useUser();
  const router = useRouter();

  if (router.isFallback) {
    return <div>Fetching fresh data...</div>;
  }

  if (props.glossary && props.glossary.visibility === 'Draft') {
    return (
      <TopBanner
        title="Technology Glossary Unavailable"
        message="This technology glossary term is currently unavailable"
      />
    );
  }

  if (props.glossary && props.glossary.visibility === 'Private') {
    return (
      <TopBanner
        title="Technology Glossary Unavailable"
        message="This technology glossary term is currently unavailable"
      />
    );
  }

  return (
    <>
      {props.glossary && (
        <Layout
          title={`${props.glossary.term}`}
          description={`${props.glossary.description}`}
          bg={props.bg}
          color={props.color}
        >
          <HeroTop
            maxW="5xl"
            title={props.glossary.term}
            tagline={props.glossary.description}
            breadcrumbs={
              <Breadcrumb mt={4}>
                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/technology-glossary">
                    Technology Glossary
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>{props.glossary.term}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            }
            actionButton={
              isAdmin(userData && userData) && (
                <Button
                  onClick={() =>
                    router.push(
                      `/dashboard/pages/technology-glossary/edit/${props.glossary.id}`,
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
                  Edit Term
                </Button>
              )
            }
          />
          <SimpleGrid columns={[1, 1, 1, 2, 2]}>
            <Box p={10}>
              <Stat
                title=""
                value="DEFINITION"
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
                  {parse(props.glossary.description.toString())}
                </Box>
              </Stat>
            </Box>
            <Box bg={props.bg} p={10}>
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
                  Contribute
                </Heading>

                <Text>Please help us maintain the accuracy of this term</Text>
              </Box>
              <ContributeFormGlossary
                {...props}
                glossaryId={props.glossary.id}
              />
            </Box>
          </SimpleGrid>
        </Layout>
      )}
    </>
  );
};

export default TechnologyGlossaryDetailPage;
