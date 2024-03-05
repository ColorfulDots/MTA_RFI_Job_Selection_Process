import * as React from 'react';
import dynamic from 'next/dynamic';
import {
  Box,
  Flex,
  Heading,
  Divider,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spinner,
  Skeleton,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { LayoutDashboard } from '@/components/LayoutDashboard';
import { useDashboardUser } from '@/hooks/useDashboardUser';

const DashboardNav = dynamic<any>(
  () => import('@/components/DashboardNav').then((mod) => mod.DashboardNav),
  {
    ssr: false,
    loading: () => (
      <Stack>
        <Skeleton height="40px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="40px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="40px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    ),
  },
);

const LegalsForm = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.LegalsForm),
  { ssr: false, loading: () => <Spinner /> },
);

export const DashboardPagesLegalsPost = (props: any) => {
  const { userData } = useDashboardUser();

  return (
    <LayoutDashboard title="Legals Post" bg={props.bg} color={props.color}>
      <Box position="relative">
        <Flex h="full" id="app-container">
          <Box w="64" bg={props.bg} color={props.color} fontSize="sm">
            <DashboardNav
              userData={userData}
              color={props.color}
              bg={props.bg}
            />
          </Box>
          <Box bg={'white'} color={'gray.800'} flex="1" p="6">
            <Box as="section" py="5">
              <Stack
                spacing="6"
                direction={{ base: 'column', md: 'row' }}
                align={{ md: 'center' }}
                justify="space-between"
                maxW={{ base: 'xl', md: 'full' }}
                mx="auto"
                px={{ base: '6', md: '8' }}
              >
                <Box>
                  <Heading size="xl" fontWeight="extrabold" maxW="20ch">
                    Welcome, {userData?.firstName}!
                  </Heading>
                  <Breadcrumb>
                    <BreadcrumbItem>
                      <BreadcrumbLink as={NextLink} href="/dashboard">
                        Dashboard
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <BreadcrumbLink as={NextLink} href="/dashboard/pages">
                        Pages
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        as={NextLink}
                        href="/dashboard/pages/legal"
                      >
                        Legals
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                      <BreadcrumbLink>Edit</BreadcrumbLink>
                    </BreadcrumbItem>
                  </Breadcrumb>
                </Box>
              </Stack>
            </Box>
            <Divider />

            <Box as="section" py="16">
              <Box
                maxW={{ base: 'xl', md: 'full' }}
                mx="auto"
                px={{ base: '6', md: '8' }}
              >
                <Box>
                  <LegalsForm
                    isEditing={false}
                    bg={props.bg}
                    color={props.color}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </LayoutDashboard>
  );
};

export default DashboardPagesLegalsPost;
