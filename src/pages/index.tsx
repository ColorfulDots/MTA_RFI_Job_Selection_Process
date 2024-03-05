import { Skeleton, Box, Button, SimpleGrid, Stack } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import db from '@/lib/firebase';
import { GetStaticProps } from 'next';
import { lighten, darken, transparentize } from 'polished';
import { Layout } from '@/components/Layout';
import * as React from 'react';
import NextLink from 'next/link';

const Stat = dynamic<any>(
  () => import('@/components/Stat').then((mod) => mod.Stat),
  {
    ssr: false,
  },
);

const Card = dynamic<any>(
  () => import('@/components/Card').then((mod) => mod.Card),
  {
    ssr: false,
    loading: () => (
      <Stack lineHeight={0}>
        <Skeleton height="21px" />
        <Skeleton height="24px" />
        <Skeleton height="24px" />
      </Stack>
    ),
  },
);

const HeroTop = dynamic<any>(
  () => import('@/components/HeroTop').then((mod) => mod.HeroTop),
  {
    ssr: false,
    loading: () => (
      <Stack lineHeight={0}>
        <Skeleton height="922px" />
      </Stack>
    ),
  },
);

export const HomePage = (props: {
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
      title="Colorful Dots, LLC | Brooklyn, NY"
      description="We provide a wide range of modernized technical services and solutions. From IT staff augmentation, NY State &amp; Federal government contracting, custom mobile &amp; web development, AR/VR/XR development, graphic design, music &amp; film production, marketing &amp; advertising and more. If it's digital...we're doing it!"
      bg={props.bg}
      color={props.color}
    >
      <HeroTop
        maxW="2xl"
        title="We're an award winning digital agency"
        tagline="We provide a wide range of modernized technical services and solutions. From IT staff augmentation, NY State &amp; Federal government contracting, custom mobile &amp; web development, AR/VR/XR development, graphic design, music &amp; film production, marketing &amp; advertising and more. If it's digital...we're doing it!"
        actionButton={
          <>
            <NextLink href="/services" passHref>
              <Button
                as="a"
                w={{ base: 'full', md: 'auto' }}
                //  colorScheme="whiteAlpha"
                color={props.color}
                bg={transparentize(0.2, 'hsl(0, 0%, 100%)')}
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
                Services
              </Button>
            </NextLink>

            <NextLink href="/careers" passHref>
              <Button
                as="a"
                w={{ base: 'full', md: 'auto' }}
                // colorScheme="whiteAlpha"
                color={props.color}
                bg={transparentize(0.2, 'hsl(0, 0%, 100%)')}
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
                Careers
              </Button>
            </NextLink>

            <NextLink href="/partnerships" passHref>
              <Button
                as="a"
                w={{ base: 'full', md: 'auto' }}
                // colorScheme="whiteAlpha"
                color={props.color}
                bg={transparentize(0.2, 'hsl(0, 0%, 100%)')}
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
                Partnerships
              </Button>
            </NextLink>

            <NextLink href="/faqs" passHref>
              <Button
                as="a"
                w={{ base: 'full', md: 'auto' }}
                // colorScheme="whiteAlpha"
                color={props.color}
                bg={transparentize(0.2, 'hsl(0, 0%, 100%)')}
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
                FAQs
              </Button>
            </NextLink>

            <NextLink href="/contact" passHref>
              <Button
                as="a"
                w={{ base: 'full', md: 'auto' }}
                // colorScheme="whiteAlpha"
                color={props.color}
                bg={transparentize(0.2, 'hsl(0, 0%, 100%)')}
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
                Contact Us
              </Button>
            </NextLink>
          </>
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
            columns={{ base: 1, md: 2 }}
          >
            <Stat
              title=""
              as="h2"
              value="Websites"
              // value={props.clientsWebsites?.length}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 1, 1, 2, 2]} spacing={10}>
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

            <Stat
              title=""
              as="h2"
              value="Mobile Apps"
              // value={props.clientsWebsites?.length}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 1, 1, 2, 2]} spacing={10}>
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
            columns={{ base: 1, md: 2 }}
          >
            <Stat
              title=""
              as="h2"
              value="Virtual Reality"
              // value={props.clientsWebsites?.length}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 1, 1, 2, 2]} spacing={10}>
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
            <Stat
              title=""
              as="h2"
              value="Logo Design"
              // value={props.clientsWebsites?.length}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 1, 1, 2, 2]} spacing={10}>
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
            columns={{ base: 1, md: 2 }}
          >
            <Stat
              title=""
              as="h2"
              value="Graphic Design"
              // value={props.clientsWebsites?.length}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 1, 1, 2, 2]} spacing={10}>
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

            <Stat
              title=""
              as="h2"
              value="Books"
              // value={props.clientsWebsites?.length}
              bg={props.bg}
              color={props.color}
            >
              <SimpleGrid columns={[1, 1, 1, 1, 2, 2]} spacing={10}>
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
                as="h2"
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
                as="h2"
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
    .limit(4)
    .get();

  const websitesData = websites.docs.map((website: { data: () => any }) =>
    website.data(),
  );

  const mobiles = await db
    .collection('clients')
    .where('clientTypeMain.label', '==', 'mobile')
    .limit(4)
    .get();

  const mobilesData = mobiles.docs.map((mobile: { data: () => any }) =>
    mobile.data(),
  );

  const vr = await db
    .collection('clients')
    .where('clientTypeMain.label', '==', 'vr')
    .limit(4)
    .get();

  const vrsData = vr.docs.map((vr: { data: () => any }) => vr.data());

  const designs = await db
    .collection('clients')
    .where('clientTypeMain.label', '==', 'design')
    .limit(4)
    .get();

  const designsData = designs.docs.map((design: { data: () => any }) =>
    design.data(),
  );

  const books = await db
    .collection('clients')
    .where('clientTypeMain.label', '==', 'book')
    .limit(4)
    .get();

  const booksData = books.docs.map((book: { data: () => any }) => book.data());

  const musics = await db
    .collection('clients')
    .where('clientTypeMain.label', '==', 'music')
    .limit(4)
    .get();

  const musicsData = musics.docs.map((music: { data: () => any }) =>
    music.data(),
  );

  const films = await db
    .collection('clients')
    .where('clientTypeMain.label', '==', 'film')
    .limit(4)
    .get();

  const filmsData = films.docs.map((film: { data: () => any }) => film.data());

  const logos = await db
    .collection('clients')
    .where('clientTypeMain.label', '==', 'logo')
    .limit(4)
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

export default HomePage;
