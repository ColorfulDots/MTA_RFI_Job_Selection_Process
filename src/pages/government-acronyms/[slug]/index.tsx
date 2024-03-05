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
  Stack,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';
import { lighten, darken } from 'polished';
import * as React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import parse from 'html-react-parser';
import NextLink from 'next/link';
import { isAdmin, randomColor } from '@/helpers/index';
import { Layout } from '@/components/Layout';
import { useUser } from '@/hooks/useUser';

const ContributeForm = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.ContributeForm),
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
  acronym: any | undefined;
  bg: string;
  color: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  let acronyms = [];
  const ref = firebase.firestore().collection('acronyms');
  try {
    let allAcronyms = await ref.get();
    for (const doc of allAcronyms.docs) {
      let data = doc.data();
      // console.log(data);
      acronyms.push({ ...data });
    }
  } catch (e) {
    console.log(e);
  }
  const paths = acronyms.map((acronym) => ({
    params: { slug: acronym['slug'] },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<DetailsProps> = async (
  context,
): Promise<any> => {
  let acronym = {};

  try {
    const ref = firebase
      .firestore()
      .collection('acronyms')
      .where('slug', '==', context.params && context.params['slug']);

    const snapshot = await ref.get();
    snapshot.forEach((doc) => {
      // console.log(doc.id, '=>', doc.data());
      const data = doc.data();
      acronym = { ...data, id: doc.id };
    });
    return {
      props: { acronym },
      revalidate: 1,
    };
  } catch (e) {
    console.log(e);
  }
};

const GovernmentAcronymsPages: React.FC<DetailsProps> = (props) => {
  const { userData } = useUser();
  const router = useRouter();

  if (router.isFallback) {
    return <div>Fetching fresh data...</div>;
  }

  return (
    <>
      {props.acronym && (
        <Layout
          title={`${props.acronym.term}`}
          description={`${props.acronym.term}`}
          bg={props.bg}
          color={props.color}
        >
          <HeroTop
            breadcrumbs={
              <Breadcrumb mt={4}>
                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/government-acronyms">
                    Government Acronyms
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>{props.acronym.term}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            }
            title={props.acronym.term}
            actionButton={
              isAdmin(userData && userData) && (
                <Button
                  onClick={() =>
                    router.push(
                      `/dashboard/pages/acronyms/edit/${props.acronym.id}`,
                    )
                  }
                  w={{ base: 'full', md: 'auto' }}
                  colorScheme="whiteAlpha"
                  color={props.color}
                  borderWidth={0.5}
                  borderStyle="dotted"
                  boxShadow="base"
                  rounded={{ xs: 'full', md: 'full' }}
                  size="md"
                  fontSize="md"
                  fontWeight="bold"
                  outline="none"
                  _hover={{
                    outline: 'none',
                    bg: lighten(0.05, props.bg),
                    color: darken(0.05, props.color),
                    boxShadow: 'outline',
                    borderColor: lighten(0.05, props.bg),
                  }}
                  px="8"
                >
                  Edit Acronym
                </Button>
              )
            }
            tagline={props.acronym.description.toString()}
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
                  {parse(props.acronym.description.toString())}
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

                <Text>
                  Please help us maintain the accuracy of this acronym
                </Text>
              </Box>
              <ContributeForm {...props} acronymId={props.acronym.id} />
            </Box>
          </SimpleGrid>
        </Layout>
      )}
    </>
  );
};

export default GovernmentAcronymsPages;
