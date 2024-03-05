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
  Badge,
  Skeleton,
} from '@chakra-ui/react';
import { HiPencilAlt } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import parse from 'html-react-parser';
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

export const DashboardPagesFaqs = (props: any) => {
  const { userData } = useDashboardUser();
  const router = useRouter();
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const onClose = () => setIsOpen(false);

  const { data: faqsData } = useCollection<any>('faqs', {
    orderBy: ['createdAt', 'desc'],
  });

  const { deleteDocument } = useDocument<any>(
    deleteId ? `faqs/${deleteId}` : null,
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
      title: 'FAQ Deleted!',
      description: "You've successfully deleted an faq!",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    setIsOpen(false);
    router.push('/dashboard/pages/faqs');
  };

  // START Search Filter
  const [searchTerm, setSearchTerm] = useState('');

  const SearchFilter = (e: any) => {
    setSearchTerm(e.target.value);
  };
  // END Search Filter

  const badgeEnum: Record<string, string> = {
    Clients: 'pink',
    'Government Contracting': 'red',
    'Pricing / Billing': 'green',
    Partnerships: 'blue',
    Careers: 'orange',
    'Software Development': 'purple',
    Legal: 'gray',
    Process: 'teal',
    Contact: 'cyan',
    Design: 'blue',
    'NA / Other': 'gray',
  };

  return (
    <>
      {faqsData && (
        <LayoutDashboard title="Faqs" bg={props.bg} color={props.color}>
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
                          <BreadcrumbLink>Faqs</BreadcrumbLink>
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
                        Faqs ({faqsData?.length})
                      </Heading>
                      <TableActions
                        faqsData={faqsData}
                        type="Faq"
                        count={faqsData?.length}
                        newLink={'/dashboard/pages/faqs/new'}
                        onChange={SearchFilter}
                      />
                      <Table variant="simple" my={4}>
                        <Thead bg="gray.50">
                          <Tr>
                            <Th>Question</Th>
                            <Th>Answer</Th>
                            <Th>Category</Th>
                            <Th>Visibility</Th>
                            <Th></Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {faqsData
                            ?.filter(
                              (faq) =>
                                faq.question.includes(searchTerm) ||
                                faq.category?.label.includes(searchTerm),
                            )
                            .map((faq) => {
                              return (
                                <Tr key={faq.id}>
                                  <Td>
                                    <NextLink href={`/faqs/${faq.slug}`}>
                                      {faq.question}
                                    </NextLink>
                                  </Td>
                                  <Td noOfLines={1} maxWidth={['sm']}>
                                    {parse(faq.answer.toString())}
                                  </Td>
                                  <Td>
                                    <Badge
                                      variant="outline"
                                      fontSize="xs"
                                      colorScheme={
                                        badgeEnum[faq.category?.label]
                                      }
                                    >
                                      {faq.category?.label}
                                    </Badge>
                                  </Td>
                                  <Td>{faq.visibility}</Td>
                                  <Td textAlign="right">
                                    <ButtonGroup variant="outline" spacing="6">
                                      <Button
                                        size="sm"
                                        leftIcon={
                                          <HiPencilAlt fontSize="1.25em" />
                                        }
                                        onClick={() =>
                                          router.push(
                                            `/dashboard/pages/faqs/edit/${faq.id}`,
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
                                          handleDeleteModal(faq.id)
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
                        faqsData={faqsData}
                        type="Faq"
                        count={faqsData?.length}
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

export default DashboardPagesFaqs;
