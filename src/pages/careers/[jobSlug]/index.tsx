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
  UnorderedList,
  ListItem,
  Spinner,
  Skeleton,
  SkeletonCircle,
  Wrap,
  Badge,
} from '@chakra-ui/react';
import { lighten, darken } from 'polished';
import { FC } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useCollection } from '@nandorojo/swr-firestore';
import parse from 'html-react-parser';
import NextLink from 'next/link';
import {
  isAdmin,
  formatDate,
  randomColor,
  truncateString,
  getColorContrast,
  slugify,
  isAssistant,
} from '@/helpers/index';
import { Layout } from '@/components/Layout';
import { BreadcrumbJsonLd, JobPostingJsonLd } from 'next-seo';
import { useUser } from '@/hooks/useUser';
import { AgencyProps, ApplicantsProps } from '@/types/index';

const ApplyForm = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.ApplyForm),
  {
    ssr: false,
    loading: () => (
      <Stack>
        <Skeleton height="800px" />
      </Stack>
    ),
  },
);

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

export interface CareerDetailsProps {
  career: any | undefined;
  bg: string;
  color: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  let careers = [];
  const ref = firebase.firestore().collection('careers');
  try {
    let allCareers = await ref.get();
    for (const doc of allCareers.docs) {
      let data = doc.data();
      // console.log(data);
      careers.push({ ...data });
    }
  } catch (e) {
    console.log(e);
  }
  const paths = careers.map((career) => ({
    params: { jobSlug: career['jobSlug'] },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<CareerDetailsProps> = async (
  context,
): Promise<any> => {
  let career = {};

  try {
    const ref = firebase
      .firestore()
      .collection('careers')
      .where('jobSlug', '==', context.params && context.params['jobSlug']);

    const snapshot = await ref.get();
    snapshot.forEach((doc) => {
      // console.log(doc.id, '=>', doc.data());
      const data = doc.data();
      career = { ...data, id: doc.id };
    });
    return {
      props: { career },
      revalidate: 1,
    };
  } catch (e) {
    console.log(e);
  }
};

const CareerDetails: FC<CareerDetailsProps> = (props) => {
  const { userData } = useUser();
  const router = useRouter();
  const jobFillColor = randomColor();
  const jobColor = getColorContrast(jobFillColor);

  const { data: agenciesData } = useCollection<AgencyProps>(
    props.career ? 'agencies' : null,
    {
      where: ['agencyName', '==', props.career && props.career.jobAgency.label],
      limit: 1,
      listen: false,
    },
  );

  const { data: applicantsData } = useCollection<ApplicantsProps>(
    props.career ? 'applicants' : null,
    {
      where: ['jobId', '==', props.career && props.career.id],
      listen: false,
    },
  );

  const jobTypeEnum: any = {
    'Full-Time': 'FULL_TIME',
    'Part-Time': 'PART_TIME',
    'Part-Time (35 hours per week)': 'PART_TIME',
    Flexible: 'CONTRACTOR',
  };

  const jobPayFrequency: any = {
    Hourly: 'HOUR',
    Daily: 'DAY',
    Weekly: 'WEEK',
    Monthly: 'MONTH',
    Annually: 'YEAR',
  };

  const jobRemoteEnum: any = {
    Yes: 'TELECOMMUTE',
    No: '',
  };

  if (router.isFallback) {
    return <div>Fetching fresh data...</div>;
  }

  if (props.career && props.career.visibility === 'Draft') {
    return (
      <TopBanner
        color="primary"
        title="Position Unavailable"
        message="This career is being updated. Please check back soon!"
      />
    );
  }

  if (props.career && props.career.visibility === 'Private') {
    return (
      <TopBanner
        title="Position Filled"
        message="This position has been filled or expired"
      />
    );
  }

  return (
    <>
      {agenciesData && props.career && (
        <Layout
          title={`${props.career.jobShortTitle} | IT Jobs`}
          description={`${truncateString(
            props.career.jobDescription.replace(/<[^>]*>?/gm, ' '),
            150,
          )}`}
          bg={props.bg}
          color={props.color}
        >
          <JobPostingJsonLd
            datePosted={`${props.career.jobPostDate}T11:59:00`}
            description={`<p>${`We're currently seeking qualified candidate(s) for the following position: <strong>${props.career.jobShortTitle}</strong> in <strong>${props.career.jobCity}, ${props.career.jobState.label}, ${props.career.jobZipCode}</strong> at <strong>${props.career.jobAgency.label}</strong> under the contract <strong>${props.career.jobContractName.label}</strong>, specifically under the task order: <strong>${props.career.jobContractNumber}</strong>.`}</p> ${
              props.career.jobDescription
            } <p><strong>Mandatory Qualifications</strong></p> ${
              props.career.jobMMandatoryQualifications
            } <p><strong>Desired Qualifications</strong></p> ${
              props.career.jobDesiredQualifications
            } <p><strong>Additional Information</strong></p> ${
              props.career.jobAdditionalInformation
                ? props.career.jobAdditionalInformation
                : 'None'
            }`}
            hiringOrganization={{
              name: 'Colorful Dots, LLC',
              sameAs: 'https://colorfuldots.com',
              logo: 'https://colorfuldots.s3.amazonaws.com/cd-assets/icons/cd-safari-pinned-tab.svg',
            }}
            jobLocation={{
              streetAddress: `${props.career.jobStreetAddress}  
                ${
                  props.career.jobStreetAddress2
                    ? props.career.jobStreetAddress2
                    : ''
                }`,
              addressLocality: props.career.jobCity,
              addressRegion: props.career.jobState.label,
              postalCode: props.career.jobZipCode,
              addressCountry: 'United States',
            }}
            title={props.career.jobShortTitle}
            baseSalary={{
              currency: 'USD',
              value: props.career.jobSalary, // Can also be a salary range, like [40, 50]
              unitText: jobPayFrequency[props.career.jobSalaryFrequency.label],
            }}
            employmentType={jobTypeEnum[props.career.jobHours.label]}
            jobLocationType={jobRemoteEnum[props.career.jobIsRemote]}
            validThrough={`${props.career.jobEndDate} T11:59:00`}
            applicantLocationRequirements="US"
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
                name: 'Careers',
                item: `https://colorfuldots.com/careers`,
              },
              {
                position: 3,
                name: props.career.jobShortTitle,
                item: `https://colorfuldots.com/careers/${props.career.jobSlug}`,
              },
            ]}
          />

          <HeroTop
            breadcrumbs={
              <Breadcrumb mt={4}>
                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/careers">
                    Careers
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>{props.career.jobShortTitle}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            }
            title={props.career.jobShortTitle}
            // agencyLink={
            //   <Text>
            //     @{' '}
            //     <NextLink
            //       href={`/agencies/new-york/government/${agenciesData[0]?.slug}`}
            //     >
            //       {props.career.jobAgency.label}
            //     </NextLink>
            //   </Text>
            // }
            badges={
              <Wrap spacing="10px" direction="row">
                <Badge
                  fontSize="md"
                  bg={lighten(0.05, jobFillColor)}
                  color={jobColor}
                  borderColor={darken(0.05, jobFillColor)}
                  borderWidth={3}
                  rounded="md"
                >
                  {props.career.jobContractNumber}
                </Badge>
                <Badge
                  fontSize="md"
                  bg={lighten(0.05, jobFillColor)}
                  color={jobColor}
                  borderColor={darken(0.05, jobFillColor)}
                  borderWidth={3}
                  rounded="md"
                >
                  Posted: {formatDate(props.career.jobPostDate)}
                </Badge>
                <Badge
                  fontSize="md"
                  bg={lighten(0.05, jobFillColor)}
                  color={jobColor}
                  borderColor={darken(0.05, jobFillColor)}
                  borderWidth={3}
                  rounded="md"
                >
                  Start Date: {formatDate(props.career.jobStartDate)}
                </Badge>

                <Badge
                  fontSize="md"
                  bg={lighten(0.05, jobFillColor)}
                  color={jobColor}
                  borderColor={darken(0.05, jobFillColor)}
                  borderWidth={3}
                  rounded="md"
                >
                  {props.career.jobHours.label}
                </Badge>
                <Badge
                  fontSize="md"
                  bg={lighten(0.05, jobFillColor)}
                  color={jobColor}
                  borderColor={darken(0.05, jobFillColor)}
                  borderWidth={3}
                  rounded="md"
                >
                  Duration: {props.career.jobDuration.label}
                </Badge>

                {props.career.jobIsRemote === 'Yes' && (
                  <Badge
                    fontSize="md"
                    bg={lighten(0.05, jobFillColor)}
                    color={jobColor}
                    borderColor={darken(0.05, jobFillColor)}
                    borderWidth={3}
                    rounded="md"
                  >
                    Remote
                  </Badge>
                )}

                {props.career.jobIsVisa === 'Yes' && (
                  <Badge
                    fontSize="md"
                    bg={lighten(0.05, jobFillColor)}
                    color={jobColor}
                    borderColor={darken(0.05, jobFillColor)}
                    borderWidth={3}
                    rounded="md"
                  >
                    Visa Sponsor
                  </Badge>
                )}
              </Wrap>
            }
            actionButton={
              <>
                <Button
                  onClick={() =>
                    router.push(
                      `/agencies/${slugify(
                        agenciesData[0]?.state.label,
                      )}/government/${agenciesData[0]?.slug}`,
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
                  Explore All Jobs At This Agency
                </Button>

                {(isAdmin(userData && userData) ||
                  isAssistant(userData && userData)) && (
                  <Button
                    onClick={() =>
                      router.push(`/dashboard/jobs/edit/${props.career.id}`)
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
                    Edit Job
                  </Button>
                )}
              </>
            }
            tagline={`We're seeking a qualified candidate for the <strong>${props.career.jobShortTitle}</strong> position with <strong>${props.career.jobAgency.label}</strong> in <strong>${agenciesData[0]?.city}, ${agenciesData[0]?.state.label} ${agenciesData[0]?.zipcode}</strong>`}
            rootBgColor={jobFillColor}
            rootColor={jobColor}
          />

          <SimpleGrid columns={[1, 1, 1, 1, 1, 2]} spacing={10}>
            <Box p={10}>
              <SimpleGrid
                mx="auto"
                my={8}
                spacing={{ base: '14', md: '30', lg: '30', xl: '30' }}
                columns={[1, 1, 1, 3, 3, 3]}
              >
                <Stat
                  title=""
                  value="Location"
                  color={props.color}
                  position="relative"
                >
                  <DotIcon
                    boxSize={10}
                    position="absolute"
                    top={[12, 12, 12, 12, 12]}
                    left={-5}
                    bg={randomColor().toString()}
                  />{' '}
                  {agenciesData[0]?.streetAddress}
                  {agenciesData[0]?.streetAddress2 && '\n'}
                  {agenciesData[0]?.streetAddress2}
                  <br />
                  {agenciesData[0]?.city}, {agenciesData[0]?.state.label}{' '}
                  {agenciesData[0]?.zipcode} <br />
                  Region: {agenciesData[0]?.region.label}
                  <br />
                  Remote: {props.career.jobIsRemote}
                </Stat>
                <Stat
                  title=""
                  value="Timeline"
                  color={props.color}
                  position="relative"
                >
                  <DotIcon
                    boxSize={10}
                    position="absolute"
                    top={[12, 12, 12, 12, 12]}
                    left={-5}
                    bg={randomColor().toString()}
                  />{' '}
                  Posted: {formatDate(props.career.jobPostDate)}
                  <br />
                  Start Date: {formatDate(props.career.jobStartDate)}
                  <br />
                  {props.career.jobHours.label} <br />
                  Duration: {props.career.jobDuration.label}
                </Stat>

                <Stat
                  title=""
                  value="Contract"
                  color={props.color}
                  position="relative"
                >
                  <DotIcon
                    boxSize={10}
                    position="absolute"
                    top={[12, 12, 12, 12, 12]}
                    left={-5}
                    bg={randomColor().toString()}
                  />{' '}
                  {props.career.jobContractName.label}
                  <br />
                  {props.career.jobContractNumber}
                </Stat>
              </SimpleGrid>

              <Stat
                title=""
                value="Description"
                color={props.color}
                position="relative"
                mb={8}
              >
                <DotIcon
                  boxSize={10}
                  position="absolute"
                  top={[12, 12, 12, 12, 12]}
                  left={-5}
                  bg={randomColor().toString()}
                />{' '}
                <Box
                  fontSize="lg"
                  color={props.color}
                  className="jobDescription"
                >
                  {parse(props.career.jobDescription.toString())}
                </Box>
              </Stat>

              <Stat
                title=""
                value="Mandatory Qualifications"
                color={props.color}
                position="relative"
                mb={8}
              >
                <DotIcon
                  boxSize={10}
                  position="absolute"
                  top={[12, 12, 12, 12, 12]}
                  left={-5}
                  bg={randomColor().toString()}
                />{' '}
                <Box
                  fontSize="lg"
                  color={props.color}
                  className="jobDescription"
                >
                  {parse(props.career.jobMMandatoryQualifications.toString())}
                </Box>
              </Stat>

              <Stat
                title=""
                value="Desired Qualifications"
                color={props.color}
                position="relative"
                mb={8}
              >
                <DotIcon
                  boxSize={10}
                  position="absolute"
                  top={[12, 12, 12, 12, 12]}
                  left={-5}
                  bg={randomColor().toString()}
                />{' '}
                <Box
                  fontSize="lg"
                  color={props.color}
                  className="jobDescription"
                >
                  {parse(props.career.jobDesiredQualifications.toString())}
                </Box>
              </Stat>

              {props.career.jobAdditionalInformation && (
                <Stat
                  title=""
                  value="Additional Information"
                  color={props.color}
                  position="relative"
                  mb={8}
                >
                  <DotIcon
                    boxSize={10}
                    position="absolute"
                    top={[12, 12, 12, 12, 12]}
                    left={-5}
                    bg={randomColor().toString()}
                  />{' '}
                  <Box
                    fontSize="lg"
                    color={props.color}
                    className="jobDescription"
                  >
                    {parse(props.career.jobAdditionalInformation.toString())}
                  </Box>
                </Stat>
              )}

              <Stat
                title=""
                value="About The Agency"
                color={props.color}
                position="relative"
              >
                <DotIcon
                  boxSize={10}
                  position="absolute"
                  top={[12, 12, 12, 12, 12]}
                  left={-5}
                  bg={randomColor().toString()}
                />{' '}
                <Box
                  fontSize="lg"
                  color={props.color}
                  className="jobDescription"
                >
                  {parse(agenciesData[0]?.description.toString())}{' '}
                </Box>
              </Stat>

              <Stat
                title=""
                value="Equal Opportunity Employer"
                color={props.color}
                position="relative"
                mb={8}
              >
                <DotIcon
                  boxSize={10}
                  position="absolute"
                  top={[12, 12, 12, 12, 12]}
                  left={-5}
                  bg={randomColor().toString()}
                />{' '}
                <Box fontSize="lg" color={props.color}>
                  <Text mb={8}>
                    Our policies and procedures promote equal opportunity for
                    all employees and applicant candidates without regard to
                    race, color, religion, national origin, sex, age, physical
                    or mental disability, pregnancy, sexual orientation, gender
                    identity, genetic information, or veteran status.
                  </Text>

                  <Text mb={8}>
                    In addition, our policies and procedures prohibit
                    discrimination and harassment based on race, color,
                    religion, national origin, sex, age, physical or mental
                    disability, pregnancy, sexual orientation, gender identity,
                    genetic information, or veteran status. Colorful Dots, LLC
                    has a zero tolerance policy for any act of discrimination
                    and harassment concerning an employee, applicant candidate,
                    or any individual who reports an incident of discrimination
                    or harassment.
                  </Text>
                </Box>
              </Stat>

              <Stat
                title=""
                value="Diversity &amp; Inclusion"
                color={props.color}
                position="relative"
                mb={8}
              >
                <DotIcon
                  boxSize={10}
                  position="absolute"
                  top={[12, 12, 12, 12, 12]}
                  left={-5}
                  bg={randomColor().toString()}
                />{' '}
                <Box fontSize="lg" color={props.color}>
                  <Text mb={8}>
                    At Colorful Dots, LLC, maintaining a diverse and inclusive
                    workplace is of the utmost importance. Diversity is part of
                    our culture and core values, and is included in our
                    recruiting, hiring, training, transfer and promotion
                    processes.
                  </Text>

                  <Text mb={8}>
                    We understand and are committed to integrating diversity and
                    inclusion in all our business practices, as our employees
                    are our most important asset and provide the high levels of
                    quality service that our customers expect.
                  </Text>
                </Box>
              </Stat>

              {props.career.jobContractName.label ===
                'Hourly Based Information Technology Services (HBITS)' && (
                <Stat
                  title=""
                  value="About HBITS"
                  color={props.color}
                  position="relative"
                  mb={8}
                >
                  <DotIcon
                    boxSize={10}
                    position="absolute"
                    top={[12, 12, 12, 12, 12]}
                    left={-5}
                    bg={randomColor().toString()}
                  />{' '}
                  <Box
                    fontSize="lg"
                    color={props.color}
                    className="jobDescription"
                  >
                    <Box
                      fontSize="lg"
                      color={props.color}
                      className="jobDescription"
                    >
                      <Text mb={8}>
                        Hourly Based Information Technology Services (HBITS)
                      </Text>
                      <UnorderedList>
                        <ListItem>
                          Contract Period: July 01, 2019 – June 30, 2024
                        </ListItem>
                        <ListItem>
                          Group: 73012 Award: 23158 Replaces Award 22439
                        </ListItem>
                        <ListItem>
                          Use of Contracts: All State Agencies and Non-State
                          Agencies
                        </ListItem>
                        <ListItem>Contract Issued: July 01, 2019</ListItem>
                      </UnorderedList>
                      <Text mt={8}>
                        Hourly Based Information Technology Services (HBITS) to
                        provide Authorized Users with information technology
                        staff necessary to support their ever-expanding
                        information technology needs through staff augmentation.
                      </Text>
                    </Box>
                  </Box>
                </Stat>
              )}
            </Box>
            <Box bg={props.bg} p={10}>
              <Box mb={4}>
                <Heading
                  fontSize={['lg', 'xl', '2xl']}
                  fontWeight="extrabold"
                  position="relative"
                >
                  Ready to grow your career? Apply Now!
                </Heading>
                <Text>Please tell us more about your background below</Text>
              </Box>

              <ApplyForm
                {...props}
                jobId={props.career.id}
                applicantCount={
                  applicantsData && applicantsData.length
                    ? applicantsData.length
                    : 0
                }
              />
            </Box>
          </SimpleGrid>
        </Layout>
      )}
    </>
  );
};

export default CareerDetails;
