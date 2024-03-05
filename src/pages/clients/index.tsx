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

export const ClientsPage = (props: {
  bg: string;
  color: string;
  clientsWebsites: any;
  clientsMobile: any;
  clientsVrs: any;
  clientsDesigns: any;
  clientsBooks: any;
  clientsMusics: any;
  clientsFilms: any;
  clientsLogos: any;
}) => {
  return (
    <Layout
      title="Clients"
      description="We make digital products that are engaging, intuitive, memorable,
      and absolutely colorful."
      bg={props.bg}
      color={props.color}
    >
      <HeroTop
        maxW="2xl"
        title="Clients"
        tagline="We make digital products that are engaging, intuitive, memorable,
        and absolutely colorful. <br /><br />Please explore our clients and projects below..."
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
              value="Websites"
              // value={props.clientsWebsites?.length}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 2, 2, 4, 5]} spacing={10}>
                {props.clientsWebsites?.map((item: any, i: any) => (
                  <Card
                    data={item}
                    key={i}
                    bg={props.bg}
                    color={props.color}
                    type="clients"
                  />
                ))}
              </SimpleGrid>
            </Stat>
          </SimpleGrid>
        </Box>

        <Box>
          <SimpleGrid
            mx="auto"
            my={4}
            spacing={{ base: '10', md: '20' }}
            columns={{ base: 1, md: 1 }}
          >
            <Stat
              title=""
              value="Mobile Apps"
              // value={props.clientsWebsites?.length}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 2, 2, 4, 5]} spacing={10}>
                {props.clientsMobile?.map((item: any, i: any) => (
                  <Card
                    data={item}
                    key={i}
                    bg={props.bg}
                    color={props.color}
                    type="clients"
                  />
                ))}
              </SimpleGrid>
            </Stat>
          </SimpleGrid>
        </Box>

        <Box>
          <SimpleGrid
            mx="auto"
            my={4}
            spacing={{ base: '10', md: '20' }}
            columns={{ base: 1, md: 1 }}
          >
            <Stat
              title=""
              value="Virtual Reality"
              // value={props.clientsWebsites?.length}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 2, 2, 4, 5]} spacing={10}>
                {props.clientsVrs?.map((item: any, i: any) => (
                  <Card
                    data={item}
                    key={i}
                    bg={props.bg}
                    color={props.color}
                    type="clients"
                  />
                ))}
              </SimpleGrid>
            </Stat>
          </SimpleGrid>
        </Box>

        <Box>
          <SimpleGrid
            mx="auto"
            my={4}
            spacing={{ base: '10', md: '20' }}
            columns={{ base: 1, md: 1 }}
          >
            <Stat
              title=""
              value="Logo Design"
              // value={props.clientsWebsites?.length}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 2, 2, 4, 5]} spacing={10}>
                {props.clientsLogos?.map((item: any, i: any) => (
                  <Card
                    data={item}
                    key={i}
                    bg={props.bg}
                    color={props.color}
                    type="clients"
                  />
                ))}
              </SimpleGrid>
            </Stat>
          </SimpleGrid>
        </Box>

        <Box>
          <SimpleGrid
            mx="auto"
            my={4}
            spacing={{ base: '10', md: '20' }}
            columns={{ base: 1, md: 1 }}
          >
            <Stat
              title=""
              value="Graphic Design"
              // value={props.clientsWebsites?.length}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 2, 2, 4, 5]} spacing={10}>
                {props.clientsDesigns?.map((item: any, i: any) => (
                  <Card
                    data={item}
                    key={i}
                    bg={props.bg}
                    color={props.color}
                    type="clients"
                  />
                ))}
              </SimpleGrid>
            </Stat>
          </SimpleGrid>
        </Box>

        <Box>
          <SimpleGrid
            mx="auto"
            my={4}
            spacing={{ base: '10', md: '20' }}
            columns={{ base: 1, md: 1 }}
          >
            <Stat
              title=""
              value="Books"
              // value={props.clientsWebsites?.length}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 2, 2, 4, 5]} spacing={10}>
                {props.clientsBooks?.map((item: any, i: any) => (
                  <Card
                    data={item}
                    key={i}
                    bg={props.bg}
                    color={props.color}
                    type="clients"
                  />
                ))}
              </SimpleGrid>
            </Stat>
          </SimpleGrid>
        </Box>
        {props.clientsMusics.length > 0 && (
          <Box>
            <SimpleGrid
              mx="auto"
              my={4}
              spacing={{ base: '10', md: '20' }}
              columns={{ base: 1, md: 1 }}
            >
              <Stat
                title=""
                value="Music Production"
                // value={props.clientsWebsites?.length}
                bg={props.bg}
                color={props.color}
              >
                <SimpleGrid columns={[1, 1, 2, 2, 4, 5]} spacing={10}>
                  {props.clientsMusics?.map((item: any, i: any) => (
                    <Card
                      data={item}
                      key={i}
                      bg={props.bg}
                      color={props.color}
                      type="clients"
                    />
                  ))}
                </SimpleGrid>
              </Stat>
            </SimpleGrid>
          </Box>
        )}
        {props.clientsFilms.length > 0 && (
          <Box>
            <SimpleGrid
              mx="auto"
              my={4}
              spacing={{ base: '10', md: '20' }}
              columns={{ base: 1, md: 1 }}
            >
              <Stat
                title=""
                value="Film Production"
                // value={props.clientsWebsites?.length}
                bg={props.bg}
                color={props.color}
              >
                <SimpleGrid columns={[1, 1, 2, 2, 4, 5]} spacing={10}>
                  {props.clientsFilms?.map((item: any, i: any) => (
                    <Card
                      data={item}
                      key={i}
                      bg={props.bg}
                      color={props.color}
                      type="clients"
                    />
                  ))}
                </SimpleGrid>
              </Stat>
            </SimpleGrid>
          </Box>
        )}
      </Stack>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const websites = await db
    .collection('clients')
    .where('clientTypeMain.label', '==', 'website')
    .get();

  const websitesData = websites.docs.map((website: { data: () => any }) =>
    website.data(),
  );

  const mobiles = await db
    .collection('clients')
    .where('clientTypeMain.label', '==', 'mobile')
    .get();

  const mobilesData = mobiles.docs.map((mobile: { data: () => any }) =>
    mobile.data(),
  );

  const vr = await db
    .collection('clients')
    .where('clientTypeMain.label', '==', 'vr')
    .get();

  const vrsData = vr.docs.map((vr: { data: () => any }) => vr.data());

  const designs = await db
    .collection('clients')
    .where('clientTypeMain.label', '==', 'design')
    .get();

  const designsData = designs.docs.map((design: { data: () => any }) =>
    design.data(),
  );

  const books = await db
    .collection('clients')
    .where('clientTypeMain.label', '==', 'book')
    .get();

  const booksData = books.docs.map((book: { data: () => any }) => book.data());

  const musics = await db
    .collection('clients')
    .where('clientTypeMain.label', '==', 'music')
    .get();

  const musicsData = musics.docs.map((music: { data: () => any }) =>
    music.data(),
  );

  const films = await db
    .collection('clients')
    .where('clientTypeMain.label', '==', 'film')
    .get();

  const filmsData = films.docs.map((film: { data: () => any }) => film.data());

  const logos = await db
    .collection('clients')
    .where('clientTypeMain.label', '==', 'logo')
    .get();

  const logosData = logos.docs.map((logo: { data: () => any }) => logo.data());

  const responses = await Promise.all([
    websitesData,
    mobilesData,
    vrsData,
    designsData,
    booksData,
    musicsData,
    filmsData,
    logosData,
  ]);

  return {
    props: {
      clientsWebsites: responses[0],
      clientsMobile: responses[1],
      clientsVrs: responses[2],
      clientsDesigns: responses[3],
      clientsBooks: responses[4],
      clientsMusics: responses[5],
      clientsFilms: responses[6],
      clientsLogos: responses[7],
    },
    revalidate: 1,
  };
};

// { label: 'branding', value: 'branding' },
// { label: 'logo', value: 'logo' },
// { label: 'book', value: 'book' },
// { label: 'music', value: 'music' },
// { label: 'film', value: 'film' },

export default ClientsPage;
