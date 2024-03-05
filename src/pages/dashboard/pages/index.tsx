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

export const DashboardPages = (props: any) => {
  const { userData } = useDashboardUser();

  return (
    <LayoutDashboard title="Pages" bg={props.bg} color={props.color}>
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
                    <BreadcrumbItem>
                      <BreadcrumbLink as={NextLink} href="/dashboard">
                        Dashboard
                      </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                      <BreadcrumbLink>Pages</BreadcrumbLink>
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
                  Content Management
                </Heading>
                <SimpleGrid
                  columns={{ base: 1, sm: 1, md: 2, lg: 2 }}
                  mt="8"
                  spacing="6"
                  // color={mode('inherit', 'white')}
                >
                  <NextLink href="/dashboard/pages/faqs">
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
                        FAQs Page
                      </Heading>
                      <Text
                        mt="2"
                        fontSize="md"
                        // color={mode('gray.600', 'gray.400')}
                      >
                        Create, edit, update and delete faqs
                      </Text>
                    </Box>
                  </NextLink>

                  <NextLink href="/dashboard/pages/technologies">
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
                        Technologies Page
                      </Heading>
                      <Text
                        mt="2"
                        fontSize="md"
                        // color={mode('gray.600', 'gray.400')}
                      >
                        Create, edit, update and delete technologies
                      </Text>
                    </Box>
                  </NextLink>

                  <NextLink href="/dashboard/pages/technology-glossary">
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
                        Tech Glossary Page
                      </Heading>
                      <Text
                        mt="2"
                        fontSize="md"
                        // color={mode('gray.600', 'gray.400')}
                      >
                        Create, edit, update and delete tech glossary
                      </Text>
                    </Box>
                  </NextLink>

                  <NextLink href="/dashboard/pages/services">
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
                        Services Page
                      </Heading>
                      <Text
                        mt="2"
                        fontSize="md"
                        // color={mode('gray.600', 'gray.400')}
                      >
                        Create, edit, update and delete services
                      </Text>
                    </Box>
                  </NextLink>

                  <NextLink href="/dashboard/pages/blog">
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
                        Blog Page
                      </Heading>
                      <Text
                        mt="2"
                        fontSize="md"
                        // color={mode('gray.600', 'gray.400')}
                      >
                        Create, edit, update and delete blog pages
                      </Text>
                    </Box>
                  </NextLink>

                  <NextLink href="/dashboard/pages/legal">
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
                        Legal Page
                      </Heading>
                      <Text
                        mt="2"
                        fontSize="md"
                        // color={mode('gray.600', 'gray.400')}
                      >
                        Create, edit, update and delete legal pages
                      </Text>
                    </Box>
                  </NextLink>

                  <NextLink href="/dashboard/pages/acronyms">
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
                        Acronyms Page
                      </Heading>
                      <Text
                        mt="2"
                        fontSize="md"
                        // color={mode('gray.600', 'gray.400')}
                      >
                        Create, edit, update and delete acronyms pages
                      </Text>
                    </Box>
                  </NextLink>

                  <NextLink href="/dashboard/pages/tags">
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
                        Tags Page
                      </Heading>
                      <Text
                        mt="2"
                        fontSize="md"
                        // color={mode('gray.600', 'gray.400')}
                      >
                        Create, edit, update and delete tags
                      </Text>
                    </Box>
                  </NextLink>
                </SimpleGrid>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </LayoutDashboard>
  );
};

export default DashboardPages;
