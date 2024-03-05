import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useDocument, useCollection } from '@nandorojo/swr-firestore';
import NextLink from 'next/link';
import {
  Box,
  Flex,
  Heading,
  Button,
  ButtonGroup,
  Divider,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spinner,
  Skeleton,
} from '@chakra-ui/react';
import { HiPencilAlt } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';

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

const AlertBox = dynamic<any>(
  () => import('@/components/AlertBox').then((mod) => mod.AlertBox),
  {
    ssr: false,
    loading: () => (
      <Stack>
        <Skeleton height="40px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    ),
  },
);

const TableActions = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.TableActions),
  { ssr: false, loading: () => <Spinner /> },
);

const TablePagination = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.TablePagination),
  { ssr: false, loading: () => <Spinner /> },
);

export const DashboardPagesBlog = (props: any) => {
  const { userData } = useDashboardUser();
  const router = useRouter();
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const onClose = () => setIsOpen(false);

  const { data: blogsData } = useCollection<any>('blogs', {
    listen: false,
    orderBy: ['createdAt', 'desc'],
  });

  const { deleteDocument } = useDocument<any>(
    deleteId ? `blogs/${deleteId}` : null,
  );

  const handleDeleteModal = async (id: string) => {
    // open modal
    setIsOpen(true);
    // set the state - prepare for delete
    await setDeleteId(id);
  };

  const handleDelete = async () => {
    deleteDocument();

    toast({
      title: 'Blog Post Deleted!',
      description: "You've successfully deleted a blog post!",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    setIsOpen(false);
    router.push('/dashboard/pages/blog');
  };

  // START Search Filter
  const [searchTerm, setSearchTerm] = useState('');

  const SearchFilter = (e: any) => {
    setSearchTerm(e.target.value);
  };
  // END Search Filter

  return (
    <>
      {blogsData && (
        <LayoutDashboard title="Blog" bg={props.bg} color={props.color}>
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
                        <BreadcrumbItem>
                          <BreadcrumbLink as={NextLink} href="/dashboard/pages">
                            Pages
                          </BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem isCurrentPage>
                          <BreadcrumbLink>Blog</BreadcrumbLink>
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
                      <Heading size="lg" mb="6">
                        Blog Posts ({blogsData?.length})
                      </Heading>
                      <TableActions
                        blogsData={blogsData}
                        type="Blog"
                        count={blogsData?.length}
                        newLink={'/dashboard/pages/blog/new'}
                        onChange={SearchFilter}
                      />
                      <Table variant="simple" my={4}>
                        <Thead bg="gray.50">
                          <Tr>
                            <Th>Title</Th>
                            <Th>Visibility</Th>
                            <Th></Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {blogsData
                            ?.filter((blog) => blog.title.includes(searchTerm))
                            .map((blog) => {
                              return (
                                <Tr key={blog.id}>
                                  <Td>
                                    <NextLink href={`/blog/${blog.slug}`}>
                                      {blog.title}
                                    </NextLink>
                                  </Td>
                                  <Td>{blog.visibility}</Td>
                                  <Td textAlign="right">
                                    <ButtonGroup variant="outline" spacing="6">
                                      <Button
                                        size="sm"
                                        leftIcon={
                                          <HiPencilAlt fontSize="1.25em" />
                                        }
                                        onClick={() =>
                                          router.push(
                                            `/dashboard/pages/blog/edit/${blog.id}`,
                                          )
                                        }
                                      >
                                        edit
                                      </Button>
                                      <Button
                                        size="sm"
                                        leftIcon={
                                          <RiDeleteBin6Line fontSize="1.25em" />
                                        }
                                        onClick={() =>
                                          handleDeleteModal(blog.id)
                                        }
                                      >
                                        delete
                                      </Button>
                                    </ButtonGroup>
                                  </Td>
                                </Tr>
                              );
                            })}
                        </Tbody>
                      </Table>
                      <TablePagination
                        blogsData={blogsData}
                        type="Blog"
                        count={blogsData?.length}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Flex>
          </Box>
          <AlertBox
            isOpen={isOpen}
            onClose={onClose}
            handleDelete={handleDelete}
          />
        </LayoutDashboard>
      )}
    </>
  );
};

export default DashboardPagesBlog;
