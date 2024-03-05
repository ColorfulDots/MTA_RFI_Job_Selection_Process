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

export const BlogPage = (props: {
  bg: string;
  color: string;
  blogsData: any;
}) => {
  return (
    <>
      {props.blogsData && (
        <Layout
          title="Blog"
          description="Welcome to the Colorful Dots, LLC Blog! We share original content around technology news, tech tips, technology tutorials and how-to's, technology career advice, and many other technology related topics."
          bg={props.bg}
          color={props.color}
        >
          <HeroTop
            maxW="3xl"
            title="Blog"
            tagline="Welcome to the Colorful Dots, LLC Blog! We share original content around technology news, tech tips, technology tutorials and how-to's, technology career advice, and many other technology related topics."
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
                  title=""
                  value={`${props.blogsData?.length} Blog Posts`}
                  bg={props.bg}
                  color={props.color}
                >
                  <SimpleGrid columns={[1, 1, 2, 2, 4, 5]} spacing={10}>
                    {props.blogsData.map((blog: any, i: any) => (
                      <Card
                        data={blog}
                        key={i}
                        bg={props.bg}
                        color={props.color}
                        type="blog"
                      />
                    ))}
                  </SimpleGrid>
                </Stat>
              </SimpleGrid>
            </Box>
          </Stack>
        </Layout>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await db.collection('blogs').orderBy('createdAt', 'desc').get();

  const blogsData = blogs.docs.map((blog: { data: () => any }) => blog.data());
  return {
    props: { blogsData },
    revalidate: 1,
  };
};

export default BlogPage;
