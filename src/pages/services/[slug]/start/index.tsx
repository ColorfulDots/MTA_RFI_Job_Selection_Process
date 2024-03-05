import {
  Box,
  Heading,
  Badge,
  Stack,
  SimpleGrid,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Skeleton,
} from '@chakra-ui/react';
import * as React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useCollection } from '@nandorojo/swr-firestore';
import parse from 'html-react-parser';
import NextLink from 'next/link';
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

const StartServicesForm = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.StartServicesForm),
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

export const ServicesStartPage = (props: any) => {
  const router = useRouter();

  const { data: servicesData } = useCollection<any>('services', {
    where: ['slug', '==', router.query.slug],
    limit: 1,
    listen: false,
  });

  return (
    <>
      {servicesData && (
        <Layout
          title={`${servicesData[0]?.name}`}
          description={`${servicesData[0]?.description}`}
          bg={props.bg}
          color={props.color}
        >
          <Stack
            as="section"
            maxW="7xl"
            mx="auto"
            px={{ base: '6', md: '8' }}
            py={{ base: '12', md: '20' }}
            spacing="12"
          >
            <Stack maxW="full" spacing="6">
              <Heading size="xl" fontWeight="extrabold">
                <Badge colorScheme={props.bg} p={1} borderRadius={4}>
                  Let&apos;s Build Sh*t With...
                </Badge>

                <br />
                {servicesData[0]?.name}
              </Heading>
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/services">
                    Technologies
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    as={NextLink}
                    href={`/services/${router.query.slug}`}
                  >
                    {servicesData[0]?.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>Start A Project</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Stack>

            <StartServicesForm servicesData={servicesData[0]} {...props} />

            <Box as="section">
              <SimpleGrid
                mx="auto"
                spacing={{ base: '14', md: '30', lg: '100' }}
                columns={{ base: 1, md: 2, lg: 2 }}
              >
                <Stat title="" value="AVG COST" color={props.color}>
                  {servicesData[0]?.priceRange}
                </Stat>
                <Stat title="" value="AVG TIMELINE" color={props.color}>
                  {servicesData[0]?.timeline}
                </Stat>

                <Stat title="" value="OUR SKILL LEVEL" color={props.color}>
                  {servicesData[0]?.skillLevel}
                </Stat>

                <Stat title="" value="GOOD FOR" color={props.color}>
                  {servicesData[0]?.projectScope}
                </Stat>
              </SimpleGrid>
            </Box>

            {servicesData[0]?.upSellMessage?.length > 11 && (
              <Accordion allowMultiple>
                <AccordionItem border="none">
                  <AccordionButton>
                    <Box flex="1" textAlign="left" color={props.color} py={4}>
                      <Heading size="xl" fontWeight="extrabold">
                        How We Use {servicesData[0]?.name}
                      </Heading>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} color={props.color}>
                    <Box
                      fontSize="lg"
                      color={props.color}
                      className="jobDescription"
                    >
                      {parse(servicesData[0]?.upSellMessage.toString())}
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            )}
          </Stack>
        </Layout>
      )}
    </>
  );
};

export default ServicesStartPage;
