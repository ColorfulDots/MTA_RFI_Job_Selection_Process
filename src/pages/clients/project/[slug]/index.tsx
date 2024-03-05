import firebase from 'firebase/app';
import { GetStaticProps, GetStaticPaths } from 'next';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spinner,
  Skeleton,
  SkeletonCircle,
  Badge,
  Img,
  Button,
  Center,
  Box,
  SimpleGrid,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { lighten, darken } from 'polished';
import * as React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import parse from 'html-react-parser';
import NextLink from 'next/link';
import {
  isAdmin,
  slugify,
  randomColor,
  getColorContrast,
} from '@/helpers/index';
import { Layout } from '@/components/Layout';
import { useUser } from '@/hooks/useUser';

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

const TopBanner = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.TopBanner),
  { ssr: false, loading: () => <Spinner /> },
);

export interface DetailsProps {
  client: any | undefined;
  bg: string;
  color: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  let clients = [];
  const ref = firebase.firestore().collection('clients');
  try {
    let allClients = await ref.get();
    for (const doc of allClients.docs) {
      let data = doc.data();
      // console.log(data);
      clients.push({ ...data });
    }
  } catch (e) {
    console.log(e);
  }
  const paths = clients.map((client) => ({
    params: { slug: client['slug'] },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<DetailsProps> = async (
  context,
): Promise<any> => {
  let client = {};

  try {
    const ref = firebase
      .firestore()
      .collection('clients')
      .where('slug', '==', context.params && context.params['slug']);

    const snapshot = await ref.get();
    snapshot.forEach((doc) => {
      // console.log(doc.id, '=>', doc.data());
      const data = doc.data();
      client = { ...data, id: doc.id };
    });
    return {
      props: { client },
      revalidate: 1,
    };
  } catch (e) {
    console.log(e);
  }
};

const ClientsDetailPage: React.FC<DetailsProps> = (props) => {
  const { userData } = useUser();
  const router = useRouter();

  if (props.client && props.client.visibility === 'Private')
    return (
      <TopBanner
        title="Private Client"
        message="This client is not available for public viewing"
      />
    );

  if (router.isFallback) {
    return <div>Fetching fresh data...</div>;
  }
  return (
    <>
      {props.client && (
        <Layout
          title={props.client.name.toString()}
          description={props.client.intro.toString()}
          bg={props.bg}
          color={props.color}
        >
          <HeroTop
            maxW="4xl"
            rootBgColor={props.client.colors[0].color}
            rootColor={getColorContrast(props.client.colors[0].color)}
            title={props.client.name}
            tagline={props.client.intro.toString()}
            breadcrumbs={
              <Breadcrumb mt={4}>
                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/clients">
                    Clients
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>{props.client.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            }
            actionButton={
              isAdmin(userData && userData) ? (
                <Button
                  onClick={() =>
                    router.push(`/dashboard/clients/edit/${props.client.id}`)
                  }
                  w={{ base: 'full', md: 'auto' }}
                  colorScheme="whiteAlpha"
                  color={props.color}
                  borderColor={props.bg}
                  borderWidth={0.5}
                  borderStyle="dotted"
                  boxShadow="base"
                  rounded={{ md: 'lg' }}
                  size="md"
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
                  Edit Client
                </Button>
              ) : (
                <>
                  {props.client.website && (
                    <Button
                      onClick={() => router.push(`${props.client.website}`)}
                      w={{ base: 'full', md: 'auto' }}
                      colorScheme="whiteAlpha"
                      color={props.color}
                      borderColor={props.bg}
                      borderWidth={0.5}
                      borderStyle="dotted"
                      boxShadow="base"
                      rounded={{ md: 'lg' }}
                      size="md"
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
                      Visit Project
                    </Button>
                  )}
                </>
              )
            }
          />

          <SimpleGrid columns={[1, 1, 1, 2, 2, 2]} spacing={10}>
            <Box p={10}>
              <SimpleGrid
                mx="auto"
                my={8}
                spacing={{ base: '14', md: '30', lg: '30', xl: '30' }}
                columns={[1, 1, 1, 1, 1, 1]}
              >
                <Center
                  bg={props.client.logoBg}
                  textAlign="center"
                  rounded="2xl"
                  overflow="hidden"
                >
                  {props.client.logo && (
                    <Img
                      objectFit="contain"
                      width="lg"
                      w="auto"
                      h="auto"
                      loading="lazy"
                      title={props.client.name.toString()}
                      src={props.client.logo}
                      alt={props.client.name.toString()}
                    />
                  )}
                </Center>

                <Box>
                  <Heading size="md" mb={8}>
                    About {props.client.name}
                  </Heading>
                  <Box className="jobDescription">
                    {parse(props.client.description.toString())}
                  </Box>
                </Box>
              </SimpleGrid>
            </Box>
            <Box p={8}>
              {/* right */}
              <SimpleGrid columns={[1, 1, 1, 1, 2]} spacing={10}>
                <Box>
                  <Stat title="" value="COLORS" color={props.color}>
                    {props.client.colors.map(
                      (
                        color: { color: string },
                        i: React.Key | null | undefined,
                      ) => (
                        <NextLink
                          href={`/color/${color.color.substring(1)}`}
                          key={i}
                        >
                          <DotIcon boxSize={16} bg={`${color.color}`} />
                        </NextLink>
                      ),
                    )}
                  </Stat>
                </Box>
                {props.client.tags && (
                  <Box>
                    <Stat
                      title=""
                      value="TAGS"
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
                      {props.client.tags?.map(
                        (
                          tag: { label: {} | null | undefined },
                          i: React.Key | null | undefined,
                        ) => (
                          <Badge
                            key={i}
                            mr={2}
                            p={2}
                            mb={2}
                            color={props.color}
                            bg={darken(0.01, props.bg)}
                            borderColor={darken(0.035, props.bg)}
                            borderWidth={6}
                            rounded={50}
                          >
                            <>{tag.label}</>
                            {/* <NextLink href={`/tags/${slugify(tag.label)}`}>
                              {tag.label}
                            </NextLink> */}
                          </Badge>
                        ),
                      )}
                    </Stat>
                  </Box>
                )}

                <Box mt={10}>
                  <Stat
                    title=""
                    value="TECHNOLOGY"
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
                    {props.client.technologiesUsed.map(
                      (
                        tech: { label: {} | null | undefined },
                        i: React.Key | null | undefined,
                      ) => (
                        <Badge
                          key={i}
                          mr={2}
                          p={2}
                          mb={2}
                          color={props.color}
                          bg={darken(0.01, props.bg)}
                          borderColor={darken(0.035, props.bg)}
                          borderWidth={6}
                          rounded={50}
                        >
                          <NextLink
                            // @ts-ignore
                            href={`/technologies/${slugify(tech.label)}`}
                          >
                            <>{tech.label}</>
                          </NextLink>
                        </Badge>
                      ),
                    )}
                  </Stat>
                </Box>

                <Box mt={10}>
                  <Stat
                    title=""
                    value="FONT"
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
                    {props.client.typography?.map(
                      (
                        font: { label: {} | null | undefined },
                        i: React.Key | null | undefined,
                      ) => (
                        <Badge
                          key={i}
                          mr={2}
                          p={2}
                          mb={2}
                          color={props.color}
                          bg={darken(0.01, props.bg)}
                          borderColor={darken(0.035, props.bg)}
                          borderWidth={6}
                          rounded={50}
                        >
                          <>{font.label}</>
                          {/* <NextLink href={`/typography/${slugify(font.label)}`}>
                            {font.label}
                          </NextLink> */}
                        </Badge>
                      ),
                    )}
                  </Stat>
                </Box>

                <Box mt={8}>
                  <Stat
                    title=""
                    value="TIMELINE"
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
                    <Box fontSize="lg" fontWeight="normal">
                      {parse(props.client.timeline.toString())}
                    </Box>
                  </Stat>
                </Box>

                <Box mt={8}>
                  <Stat
                    title=""
                    value="STATUS"
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
                    {parse(props.client.projectStatus.toString())}
                  </Stat>
                </Box>

                {props.client.website && (
                  <Box mt={8}>
                    <Stat
                      title=""
                      value="LINKS"
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
                      <a
                        href={`${props.client.website}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Badge
                          mr={2}
                          p={2}
                          mb={2}
                          color={props.color}
                          bg={darken(0.01, props.bg)}
                          borderColor={darken(0.035, props.bg)}
                          borderWidth={6}
                          rounded={50}
                        >
                          Visit Website
                        </Badge>
                      </a>
                    </Stat>
                  </Box>
                )}
              </SimpleGrid>

              {props.client.problem.length > 11 && (
                <Box mt={8}>
                  <Stat
                    title=""
                    value="PROBLEM"
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
                      className="jobDescription"
                      fontSize="lg"
                      fontWeight="normal"
                    >
                      {parse(props.client.problem.toString())}
                    </Box>
                  </Stat>
                </Box>
              )}
              {props.client.solution.length > 11 && (
                <>
                  <Box mt={8}>
                    <Stat
                      title=""
                      value="SOLUTION"
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
                        className="jobDescription"
                        fontSize="lg"
                        fontWeight="normal"
                      >
                        {parse(props.client.solution.toString())}
                      </Box>
                    </Stat>
                  </Box>
                  <Box position="relative" p={'100% 0 0 0'}>
                    <iframe
                      title={props.client.name.toString()}
                      src="https://player.vimeo.com/video/442816028?title=0&byline=0&portrait=0"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                      }}
                      frameBorder={0}
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </Box>
                </>
              )}
              {props.client.result.length > 11 && (
                <Box mt={8}>
                  <Stat
                    title=""
                    value="RESULT"
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
                      className="jobDescription"
                      fontSize="lg"
                      fontWeight="normal"
                    >
                      {parse(props.client.result.toString())}
                    </Box>
                  </Stat>
                </Box>
              )}

              {props.client.testimony.length > 11 && (
                <Box mt={8}>
                  <Stat
                    title=""
                    value="CLIENT TESTIMONY"
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
                      className="jobDescription"
                      fontSize="lg"
                      fontWeight="normal"
                    >
                      {parse(props.client.testimony.toString())}
                    </Box>
                  </Stat>
                </Box>
              )}
            </Box>
          </SimpleGrid>
        </Layout>
      )}
    </>
  );
};

export default ClientsDetailPage;
