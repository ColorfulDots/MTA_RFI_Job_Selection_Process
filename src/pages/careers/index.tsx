import { Box, Stack, SimpleGrid, Skeleton } from '@chakra-ui/react';
import * as React from 'react';
import dynamic from 'next/dynamic';
import db from '@/lib/firebase';
import { GetStaticProps } from 'next';
import { Layout } from '@/components/Layout';
// import { usePagination } from 'react-use-pagination';

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

export const CareersPage = (props: {
  bg: string;
  color: string;
  careersData: any;
}) => {
  // const [careersData] = React.useState(props?.careersData); // <- your data

  // const {
  //   currentPage,
  //   totalPages,
  //   setNextPage,
  //   setPreviousPage,
  //   nextEnabled,
  //   previousEnabled,
  //   startIndex,
  //   endIndex,
  // } = usePagination({ totalItems: careersData?.length });
  return (
    <Layout
      title="Careers"
      description="Colorful Dots, LLC currently seeking multiple full-time &amp; part-time
    information technology related positions throughout New York State
    and beyond."
      // bg={props.bg}
      // color={props.color}
    >
      <HeroTop
        title="Careers"
        tagline="We're currently seeking multiple full-time &amp; part-time
        information technology related positions throughout New York State
        and beyond. <br/><br/>We're an equal opportunity employer located in Brooklyn, NY. <br/><br/>Explore our open positions below..."
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
              value={`${props.careersData?.length} Open Careers`}
              // bg={props.bg}
              // color={props.color}
            >
              {/* <Stack direction="row" spacing={4} align="right" my={10}>
                {/* <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={setPreviousPage}
                  disabled={!previousEnabled}
                >
                  Previous
                </Button> 
                <Box w="100%" p={4} textAlign="right">
                  <Text as="span">
                    Page: {currentPage} of {totalPages}
                  </Text>
                  <Button
                    mx={4}
                    variant="outline"
                    onClick={setPreviousPage}
                    disabled={!previousEnabled}
                  >
                    Previous
                  </Button>

                  <Button
                    variant="outline"
                    onClick={setNextPage}
                    disabled={!nextEnabled}
                  >
                    Next
                  </Button>
                </Box>
              </Stack> */}
              <SimpleGrid columns={[1, 1, 2, 3, 4, 4]} spacing={10}>
                {props.careersData?.map((career: any, i: any) => (
                  <Card
                    data={career}
                    key={i}
                    bg={props.bg}
                    color={props.color}
                    type="careers"
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
  const careers = await db
    .collection('careers')
    .orderBy('createdAt', 'desc')
    .where('visibility', '==', 'Public')
    .limit(20)
    .get();

  const careersData = careers.docs.map((career: { data: () => any }) =>
    career.data(),
  );
  return {
    props: { careersData },
    revalidate: 1,
  };
};

export default CareersPage;
