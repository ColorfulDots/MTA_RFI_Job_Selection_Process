import firebase from 'firebase/app';
import { GetStaticProps, GetStaticPaths } from 'next';
import {
  Box,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Divider,
  ListItem,
  UnorderedList,
  Spinner,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';
import { lighten, darken } from 'polished';
import * as React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useCollection } from '@nandorojo/swr-firestore';
import NextLink from 'next/link';
import {
  isAdmin,
  isAssistant,
  randomColor,
  truncateString,
} from '@/helpers/index';
import { Layout } from '@/components/Layout';
import { useUser } from '@/hooks/useUser';

const TopBanner = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.TopBanner),
  { ssr: false, loading: () => <Spinner /> },
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
  agency: any | undefined;
  bg: string;
  color: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  let agencies = [];
  const ref = firebase.firestore().collection('agencies');
  try {
    let allAgencies = await ref.get();
    for (const doc of allAgencies.docs) {
      let data = doc.data();
      // console.log(data);
      agencies.push({ ...data });
    }
  } catch (e) {
    console.log(e);
  }
  const paths = agencies.map((agency) => ({
    params: {
      state: agency['state']?.label,
      slug: agency['slug'],
    },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<DetailsProps> = async (
  context,
): Promise<any> => {
  let agency = {};

  try {
    const ref = firebase
      .firestore()
      .collection('agencies')
      .where('slug', '==', context.params && context.params['slug']);

    const snapshot = await ref.get();
    snapshot.forEach((doc) => {
      // console.log(doc.id, '=>', doc.data());
      const data = doc.data();
      agency = { ...data, id: doc.id };
    });
    return {
      props: { agency },
      revalidate: 1,
    };
  } catch (e) {
    console.log(e);
  }
};

const AgenciesDetailPage: React.FC<DetailsProps> = (props) => {
  const { userData } = useUser();
  const router = useRouter();

  const { data: careersData } = useCollection<any>(
    props.agency ? 'careers' : null,
    {
      where: ['jobAgency.label', '==', props.agency && props.agency.agencyName],
      listen: false,
    },
  );

  if (props.agency && props.agency.visibility === 'Private')
    return (
      <TopBanner
        title="Access Denied!"
        message="This content is not available for the public"
      />
    );

  if (router.isFallback) {
    return <div>Fetching fresh data...</div>;
  }

  return (
    <>
      {props.agency && careersData && (
        <Layout
          title={`${props.agency.agencyName}`}
          description={`${truncateString(
            props.agency.intro.replace(/<[^>]*>?/gm, ' '),
            150,
          )}`}
          bg={props.bg}
          color={props.color}
        >
          <HeroTop
            maxW="7xl"
            title={props.agency.agencyName}
            tagline={props.agency.intro}
            breadcrumbs={
              <Breadcrumb mt={4}>
                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href={`/agencies`}>
                    Agencies
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>{props.agency.agencyName}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            }
            actionButton={
              (isAdmin(userData && userData) ||
                isAssistant(userData && userData)) && (
                <Button
                  onClick={() =>
                    router.push(`/dashboard/agencies/edit/${props.agency.id}`)
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
                  Edit Agency
                </Button>
              )
            }
          />

          <SimpleGrid columns={[1, 1, 1, 1, 1, 2]} spacing={10}>
            <Box p={10}>
              <SimpleGrid
                mx="auto"
                spacing={{ base: '14', md: '30', lg: '100' }}
                columns={{ base: 1, md: 2, lg: 2 }}
              >
                <Stat title="" value="LOCATION" color={props.color}>
                  <UnorderedList styleType="none">
                    <ListItem>{props.agency.streetAddress}</ListItem>
                    {props.agency.streetAddress2 && (
                      <ListItem>{props.agency.streetAddress2}</ListItem>
                    )}
                    <ListItem>
                      {props.agency.city}, {props.agency.state?.label}{' '}
                      {props.agency.zipcode}
                    </ListItem>

                    <ListItem>{props.agency.region?.label}</ListItem>
                  </UnorderedList>
                </Stat>
                <Stat title="" value="CONTACT" color={props.color}>
                  <UnorderedList styleType="none">
                    <ListItem>(e): {props.agency.emailAddress}</ListItem>

                    <ListItem>(p): {props.agency.phoneNumber}</ListItem>

                    <ListItem>
                      (w):{' '}
                      <a
                        href={`${props.agency.website}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit Website
                      </a>
                    </ListItem>
                  </UnorderedList>
                </Stat>
              </SimpleGrid>
            </Box>
            <Box p={10}>
              <Stat
                value={`${careersData?.length} Open Careers`}
                bg={props.bg}
                color={props.color}
              >
                <SimpleGrid columns={[1, 1, 1, 1, 1, 2]} spacing={10}>
                  {careersData?.map((career: any, i: any) => (
                    <NextLink href={`/careers/${career.jobSlug}`} key={i}>
                      <Box
                        p={5}
                        color={props.color}
                        borderColor={props.bg}
                        borderWidth={0.5}
                        borderStyle="dotted"
                        boxShadow="base"
                        rounded={{ md: 'lg' }}
                        // size="lg"
                        fontSize="md"
                        fontWeight="bold"
                        outline="none"
                        _hover={{
                          outline: 'none',
                          bg: lighten(0.05, props.bg),
                          color: props.color,
                          boxShadow: 'md',
                          borderColor: props.bg,
                        }}
                        cursor="pointer"
                        // boxShadow={`inherit inherit inherit inherit ${props.color}`}
                      >
                        <Heading
                          as="h2"
                          fontSize={18}
                          mb={2}
                          position="relative"
                        >
                          <DotIcon
                            boxSize={10}
                            position="absolute"
                            top={-10}
                            left={-10}
                            bg={randomColor().toString()}
                          />{' '}
                          {career.jobShortTitle}
                        </Heading>
                        <Text fontWeight="normal" fontSize="sm" mb={2}>
                          @ {career.jobAgency?.label}
                        </Text>
                        <Text fontSize="sm">{career.jobContractNumber}</Text>
                        <Box mt={4} fontWeight="normal">
                          {truncateString(
                            career.jobDescription.replace(/<[^>]*>?/gm, ' '),
                            100,
                          )}
                        </Box>
                        <Divider
                          height={0.5}
                          my={2}
                          bg={darken(0.05, props.bg?.toString())}
                        />
                        <Stack direction={{ base: 'column', md: 'row' }}>
                          <Text fontSize="sm" fontWeight="normal">
                            {career.jobHours?.label}
                          </Text>
                          {career.jobIsRemote === 'Yes' && (
                            <Text fontSize="sm" fontWeight="normal">
                              &bull; Remote
                            </Text>
                          )}
                          {career.jobIsVisa === 'Yes' && (
                            <Text fontSize="sm" fontWeight="normal">
                              &bull; Visa
                            </Text>
                          )}
                        </Stack>
                      </Box>
                    </NextLink>
                  ))}
                </SimpleGrid>
              </Stat>
            </Box>
          </SimpleGrid>
        </Layout>
      )}
    </>
  );
};

export default AgenciesDetailPage;
