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
  Link,
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  ListItem,
  UnorderedList,
  Spinner,
  Skeleton,
} from '@chakra-ui/react';
import { HiPencilAlt } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { LayoutDashboard } from '@/components/LayoutDashboard';
import { useDashboardUser } from '@/hooks/useDashboardUser';
import { formatDate } from '@/helpers/index';

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

export const DashboardPartnerships = (props: any) => {
  const { userData } = useDashboardUser();

  const router = useRouter();
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const onClose = () => setIsOpen(false);

  const { data: partnershipsData } = useCollection<any>('partnerships', {
    orderBy: ['createdAt', 'desc'],
  });

  const { deleteDocument } = useDocument<any>(`partnerships/${deleteId}`);

  const handleDeleteModal = async (id: string) => {
    // open modal
    setIsOpen(true);
    // set the state - prepare for delete
    setDeleteId(id);
  };

  const handleDelete = async () => {
    await deleteDocument();

    toast({
      title: 'Partner Deleted!',
      description: "You've successfully deleted a partner!",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    setIsOpen(false);
    router.push('/dashboard/partnerships');
  };

  // START Search Filter
  const [searchTerm, setSearchTerm] = useState('');

  const SearchFilter = (e: any) => {
    setSearchTerm(e.target.value);
  };
  // END Search Filter

  return (
    <>
      {partnershipsData && (
        <LayoutDashboard title="Partnerships" bg={props.bg} color={props.color}>
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
                          <BreadcrumbLink>Partnerships</BreadcrumbLink>
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
                        Partnerships ({partnershipsData?.length})
                      </Heading>
                      <TableActions
                        csvData={partnershipsData}
                        csvHeaders={null}
                        type="Partnerships"
                        count={partnershipsData?.length}
                        newLink={'/dashboard/partnerships/new'}
                        onChange={SearchFilter}
                      />
                      <Table variant="simple" my={4}>
                        <Thead bg="gray.50">
                          <Tr>
                            <Th>POC</Th>
                            <Th>Industry</Th>
                            <Th>Revenue</Th>
                            <Th># Employees</Th>
                            <Th>Date</Th>
                            <Th></Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {partnershipsData

                            ?.filter(
                              (partner) =>
                                partner.companyName.includes(searchTerm) ||
                                partner.annualRevenue.label.includes(
                                  searchTerm,
                                ) ||
                                partner.companySize.label.includes(
                                  searchTerm,
                                ) ||
                                partner.industry[0].label.includes(
                                  searchTerm,
                                ) ||
                                partner.firstName.includes(searchTerm) ||
                                partner.lastName.includes(searchTerm),
                            )
                            .map((partner) => {
                              return (
                                <Tr key={partner.id}>
                                  <Td>
                                    <UnorderedList>
                                      <ListItem>
                                        {partner.firstName} {partner.middleName}{' '}
                                        {partner.lastName}
                                      </ListItem>
                                      <ListItem>{partner.email}</ListItem>
                                      <ListItem>
                                        <Link
                                          href={`tel:${partner.phoneNumber}`}
                                          color="purple.500"
                                        >
                                          {partner.phoneNumber}
                                        </Link>
                                      </ListItem>
                                      <ListItem>
                                        <Link
                                          href={`${partner.companyWebsite}`}
                                          color="purple.500"
                                          isExternal
                                        >
                                          Website
                                        </Link>
                                      </ListItem>
                                    </UnorderedList>
                                  </Td>
                                  <Td>{partner.industry[0]?.label}</Td>
                                  <Td>{partner.annualRevenue.label}</Td>
                                  <Td>{partner.companySize.label}</Td>
                                  <Td>{formatDate(partner.createdAt)}</Td>
                                  <Td textAlign="right">
                                    <ButtonGroup variant="outline" spacing="6">
                                      <Button
                                        size="sm"
                                        leftIcon={
                                          <HiPencilAlt fontSize="1.25em" />
                                        }
                                        onClick={() =>
                                          router.push(
                                            `/dashboard/partnerships/edit/${partner.id}`,
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
                                          handleDeleteModal(partner.id)
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
                        partnershipsData={partnershipsData}
                        type="Partnerships"
                        count={partnershipsData?.length}
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

export default DashboardPartnerships;
