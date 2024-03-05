import * as React from 'react';
import dynamic from 'next/dynamic';
import {
  Box,
  Flex,
  Heading,
  Text,
  Divider,
  Stack,
  Spinner,
  Skeleton,
} from '@chakra-ui/react';
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

const ApplicantsForm = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.ApplicantsForm),
  { ssr: false, loading: () => <Spinner /> },
);

export const DashboardClientsPost = (props: any) => {
  const { userData } = useDashboardUser();

  return (
    <LayoutDashboard title="Clients" bg={props.bg} color={props.color}>
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
                  <Text
                    mb="2"
                    fontSize="lg"
                    fontWeight="semibold"
                    // color={mode('gray.600', 'gray.400')}
                  >
                    Dashboard / Clients / Edit
                  </Text>
                  <Heading size="xl" fontWeight="extrabold" maxW="20ch">
                    Welcome, {userData?.firstName}!
                  </Heading>
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
                  <ApplicantsForm
                    isEditing={true}
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

export default DashboardClientsPost;
