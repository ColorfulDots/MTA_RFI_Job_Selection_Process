import firebase from 'firebase/app';
import { GetStaticProps, GetStaticPaths } from 'next';
import {
  Box,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Skeleton,
} from '@chakra-ui/react';
import { lighten } from 'polished';
import * as React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import parse from 'html-react-parser';
import NextLink from 'next/link';
import { isAdmin, formatDate } from '@/helpers/index';
import { Layout } from '@/components/Layout';
import { useUser } from '@/hooks/useUser';

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
  legal: any | undefined;
  bg: string;
  color: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  let legals = [];
  const ref = firebase.firestore().collection('legals');
  try {
    let allLegals = await ref.get();
    for (const doc of allLegals.docs) {
      let data = doc.data();
      // console.log(data);
      legals.push({ ...data });
    }
  } catch (e) {
    console.log(e);
  }
  const paths = legals.map((legal) => ({
    params: { slug: legal['slug'] },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<DetailsProps> = async (
  context,
): Promise<any> => {
  let legal = {};

  try {
    const ref = firebase
      .firestore()
      .collection('legals')
      .where('slug', '==', context.params && context.params['slug']);

    const snapshot = await ref.get();
    snapshot.forEach((doc) => {
      // console.log(doc.id, '=>', doc.data());
      const data = doc.data();
      legal = { ...data, id: doc.id };
    });
    return {
      props: { legal },
      revalidate: 1,
    };
  } catch (e) {
    console.log(e);
  }
};

const LegalDetailPage: React.FC<DetailsProps> = (props) => {
  const { userData } = useUser();
  const router = useRouter();

  if (router.isFallback) {
    return <div>Fetching fresh data...</div>;
  }

  return (
    <>
      {props.legal && (
        <Layout
          title={`${props.legal.title}`}
          description={`${props.legal.description}`}
          bg={props.bg}
          color={props.color}
        >
          <HeroTop
            maxW="5xl"
            title={props.legal.title}
            tagline={`Posted on ${formatDate(props.legal.createdAt)}`}
            breadcrumbs={
              <Breadcrumb mt={4}>
                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/legal">
                    Legal
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>{props.legal.title}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            }
            actionButton={
              isAdmin(userData && userData) && (
                <Button
                  onClick={() =>
                    router.push(`/dashboard/pages/legal/edit/${props.legal.id}`)
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
                  Edit Legal Post
                </Button>
              )
            }
          />
          <Stack
            as="section"
            maxW="7xl"
            mx="auto"
            px={{ base: '6', md: '8' }}
            py={{ base: '4', md: '0' }}
          >
            <Stack maxW="full" spacing="6">
              <Box fontSize="lg" color={props.color} className="jobDescription">
                {parse(props.legal.description.toString())}
              </Box>
            </Stack>
          </Stack>
        </Layout>
      )}
    </>
  );
};

export default LegalDetailPage;
