import * as React from 'react';
import dynamic from 'next/dynamic';
import { lighten } from 'polished';
import {
  Box,
  Flex,
  Heading,
  Text,
  Divider,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  SimpleGrid,
  Skeleton,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { isAdmin, isStaffing, isAssistant } from '@/helpers/index';
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

export const DashboardWelcome = (props: any) => {
  const { userData } = useDashboardUser();

  return (
    <>
      {userData && (
        <LayoutDashboard title="Dashboard" bg={props.bg} color={props.color}>
          <Box position="relative">
            <Flex h="full">
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
                        <BreadcrumbItem isCurrentPage>
                          <BreadcrumbLink>Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                      </Breadcrumb>
                    </Box>
                  </Stack>
                </Box>
                <Divider />

                <Box as="section" py="16">
                  <Box
                    maxW={{ base: 'xl', md: '7xl' }}
                    mx="auto"
                    px={{ base: '6', md: '8' }}
                    textAlign="center"
                  >
                    <Heading
                      // align="center"
                      fontWeight="extrabold"
                      maxW="md"
                      mx="auto"
                    >
                      Management
                    </Heading>
                    <SimpleGrid
                      columns={{ base: 1, sm: 1, md: 2, lg: 2 }}
                      mt="8"
                      spacing="6"
                      // color={mode('inherit', 'white')}
                    >
                      {(isAdmin(userData) || isAssistant(userData)) && (
                        <NextLink href="/dashboard/jobs">
                          <Box
                            py="8"
                            px="8"
                            verticalAlign="middle"
                            textAlign="center"
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
                          >
                            <Heading
                              fontSize="3xl"
                              fontWeight="extrabold"
                              maxW="md"
                              mx="auto"
                            >
                              Manage Jobs
                            </Heading>
                            <Text
                              mt="2"
                              fontSize="md"
                              // color={mode('gray.600', 'gray.400')}
                            >
                              Create, edit, update and delete jobs.
                            </Text>
                          </Box>
                        </NextLink>
                      )}

                      {isAdmin(userData) && (
                        <NextLink href="/dashboard/clients">
                          <Box
                            py="8"
                            px="8"
                            verticalAlign="middle"
                            textAlign="center"
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
                          >
                            <Heading
                              fontSize="3xl"
                              fontWeight="extrabold"
                              maxW="md"
                              mx="auto"
                            >
                              Manage Clients
                            </Heading>
                            <Text
                              mt="2"
                              fontSize="md"
                              // color={mode('gray.600', 'gray.400')}
                            >
                              Create, edit, update and delete clients.
                            </Text>
                          </Box>
                        </NextLink>
                      )}

                      {isAdmin(userData) && (
                        <NextLink href="/dashboard/partnerships">
                          <Box
                            py="8"
                            px="8"
                            verticalAlign="middle"
                            textAlign="center"
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
                          >
                            <Heading
                              fontSize="3xl"
                              fontWeight="extrabold"
                              maxW="md"
                              mx="auto"
                            >
                              Manage Partnerships
                            </Heading>
                            <Text
                              mt="2"
                              fontSize="md"
                              // color={mode('gray.600', 'gray.400')}
                            >
                              Create, edit, update and delete partnerships.
                            </Text>
                          </Box>
                        </NextLink>
                      )}

                      {(isAdmin(userData) || isStaffing(userData)) && (
                        <NextLink href="/dashboard/applicants">
                          <Box
                            py="8"
                            px="8"
                            verticalAlign="middle"
                            textAlign="center"
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
                          >
                            <Heading
                              fontSize="3xl"
                              fontWeight="extrabold"
                              maxW="md"
                              mx="auto"
                            >
                              Manage Applicants
                            </Heading>
                            <Text
                              mt="2"
                              fontSize="md"
                              // color={mode('gray.600', 'gray.400')}
                            >
                              Manage job applicants
                            </Text>
                          </Box>
                        </NextLink>
                      )}

                      {isAdmin(userData) && (
                        <NextLink href="/dashboard/contracts">
                          <Box
                            py="8"
                            px="8"
                            verticalAlign="middle"
                            alignItems="center"
                            borderColor={props.bg}
                            borderWidth={0.5}
                            borderStyle="dotted"
                            boxShadow="base"
                            rounded={{ md: 'lg' }}
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
                          >
                            <Heading
                              fontSize="3xl"
                              fontWeight="extrabold"
                              maxW="md"
                              mx="auto"
                            >
                              Manage Contracts
                            </Heading>
                            <Text
                              mt="2"
                              fontSize="md"
                              // color={mode('gray.600', 'gray.400')}
                            >
                              Manage contracts
                            </Text>
                          </Box>
                        </NextLink>
                      )}

                      {(isAdmin(userData) || isAssistant(userData)) && (
                        <NextLink href="/dashboard/agencies">
                          <Box
                            py="8"
                            px="8"
                            verticalAlign="middle"
                            alignItems="center"
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
                          >
                            <Heading
                              fontSize="3xl"
                              fontWeight="extrabold"
                              maxW="md"
                              mx="auto"
                            >
                              Manage Agencies
                            </Heading>
                            <Text
                              mt="2"
                              fontSize="md"
                              // color={mode('gray.600', 'gray.400')}
                            >
                              Manage Agencies
                            </Text>
                          </Box>
                        </NextLink>
                      )}
                    </SimpleGrid>
                  </Box>
                </Box>
              </Box>
            </Flex>
          </Box>
        </LayoutDashboard>
      )}
    </>
  );
};

export default DashboardWelcome;
