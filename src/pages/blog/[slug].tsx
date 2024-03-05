import firebase from 'firebase/app';
import { GetStaticProps, GetStaticPaths } from 'next';
import {
  Box,
  Heading,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Skeleton,
  Text,
  Badge,
} from '@chakra-ui/react';
import { lighten } from 'polished';
import * as React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import parse from 'html-react-parser';
import NextLink from 'next/link';
import { Layout } from '@/components/Layout';
import { ArticleJsonLd, BreadcrumbJsonLd } from 'next-seo';
import { formatDate, isAdmin } from '@/helpers/index';
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
  blog: any | undefined;
  bg: string;
  color: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  let blogs = [];
  const ref = firebase.firestore().collection('blogs');
  try {
    let allBlogs = await ref.get();
    for (const doc of allBlogs.docs) {
      let data = doc.data();
      // console.log(data);
      blogs.push({ ...data });
    }
  } catch (e) {
    console.log(e);
  }
  const paths = blogs.map((blog) => ({
    params: { slug: blog['slug'] },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<DetailsProps> = async (
  context,
): Promise<any> => {
  let blog = {};

  try {
    const ref = firebase
      .firestore()
      .collection('blogs')
      .where('slug', '==', context.params && context.params['slug']);

    const snapshot = await ref.get();
    snapshot.forEach((doc) => {
      // console.log(doc.id, '=>', doc.data());
      const data = doc.data();
      blog = { ...data, id: doc.id };
    });
    return {
      props: { blog },
      revalidate: 1,
    };
  } catch (e) {
    console.log(e);
  }
};

const BlogDetailPage: React.FC<DetailsProps> = (props) => {
  const { userData } = useUser();
  const router = useRouter();

  const badgeEnum: Record<string, string> = {
    'Tech News': 'green',
    Gaming: 'red',
    'How-To': 'yellow',
    'Tech Tips': 'purple',
    Showcase: 'orange',
    'Tech Reviews': 'blue',
    'Tech Blogs': 'cyan',
    'Government Contracting': 'purple',
  };

  if (router.isFallback) {
    return <div>Fetching fresh data...</div>;
  }

  return (
    <>
      {props.blog && (
        <Layout
          title={`${props.blog.title} - Blog`}
          description={`${props.blog.intro}`}
          bg={props.bg}
          color={props.color}
        >
          <HeroTop
            maxW="3xl"
            title={props.blog.title}
            tagline={`${props.blog.intro}`}
            breadcrumbs={
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/blog">
                    Blog
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>{props.blog.title}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            }
            actionButton={
              isAdmin(userData && userData) && (
                <Button
                  onClick={() =>
                    router.push(`/dashboard/pages/blog/edit/${props.blog.id}`)
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
                  Edit Blog Post
                </Button>
              )
            }
          />
          <ArticleJsonLd
            type="Blog"
            url={`https://colorfuldots.com/blog/${props.blog.slug}`}
            title={`${props.blog.title}`}
            images={[
              'https://colorfuldots.s3.amazonaws.com/cd-assets/images/colorful-dots-llc-logo-2020.svg',
            ]}
            datePublished={`${formatDate(props.blog.createdAt)}`}
            dateModified={`${formatDate(props.blog.modifiedAt)}`}
            authorName="Eric David Smith @ Colorful Dots, LLC"
            description={`${props.blog.intro}`}
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
                name: 'Blog',
                item: 'https://colorfuldots.com/blog',
              },
              {
                position: 3,
                name: props.blog.title,
                item: `https://colorfuldots.com/blog/${props.blog.slug}`,
              },
            ]}
          />
          <Stack
            as="section"
            maxW="7xl"
            mx="auto"
            mt={[-10, -10, -20, -38]}
            px={{ base: '6', md: '8' }}
            py={{ base: '12', md: '20' }}
            spacing="12"
          >
            <Stack maxW="full" spacing="6">
              <Heading as="h2">{props.blog.title}</Heading>
              <Text>
                Posted on
                <Badge fontSize="md" colorScheme="gray">
                  {`${formatDate(props.blog.createdAt)}`}
                </Badge>
                &bull; by{' '}
                <Badge fontSize="md" colorScheme="yellow">
                  Colorful Dots, LLC
                </Badge>{' '}
                &bull; Category{' '}
                <Badge
                  fontSize="md"
                  colorScheme={badgeEnum[props.blog.category.label]}
                >
                  {props.blog.category.label}
                </Badge>
              </Text>
              <Box fontSize="lg" color={props.color} className="jobDescription">
                {parse(props.blog.description.toString())}
              </Box>
            </Stack>
          </Stack>
        </Layout>
      )}
    </>
  );
};

export default BlogDetailPage;
