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
  Link,
  ListItem,
  UnorderedList,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spinner,
  Skeleton,
  Badge,
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

export const DashboardAgencies = (props: any) => {
  const { userData } = useDashboardUser();
  const router = useRouter();
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const onClose = () => setIsOpen(false);

  const { data: agenciesData } = useCollection<any>('agencies', {
    orderBy: ['createdAt', 'desc'],
  });

  const { deleteDocument } = useDocument<any>(
    deleteId ? `agencies/${deleteId}` : null,
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
      title: 'Agency Deleted!',
      description: "You've successfully deleted an agency!",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    setIsOpen(false);
    router.push('/dashboard/agencies');
  };

  // START Search Filter
  const [searchTerm, setSearchTerm] = useState('');

  const SearchFilter = (e: any) => {
    setSearchTerm(e.target.value);
  };
  // END Search Filter

  function validateEmail(email: any) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const badgeEnum: Record<string, string> = {
    Public: 'green',
    Private: 'red',
    Draft: 'purple',
  };

  return (
    <>
      {agenciesData && (
        <LayoutDashboard title="Agencies" bg={props.bg} color={props.color}>
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
                          <BreadcrumbLink>Agencies</BreadcrumbLink>
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
                        Agencies ({agenciesData?.length})
                      </Heading>
                      <TableActions
                        csvData={agenciesData}
                        csvHeaders={null}
                        type="Agency"
                        count={agenciesData?.length}
                        newLink={'/dashboard/agencies/new'}
                        onChange={SearchFilter}
                      />
                      <Table variant="simple" my={4}>
                        <Thead bg="gray.50">
                          <Tr>
                            <Th>Agency Name</Th>
                            <Th>Acronym</Th>
                            <Th>Contact</Th>
                            <Th>Visibility</Th>
                            <Th whiteSpace="nowrap">Posted By</Th>
                            <Th></Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {agenciesData
                            ?.filter(
                              (agency) =>
                                agency.agencyName.includes(searchTerm) ||
                                agency.agencyAcronym.includes(searchTerm),
                            )
                            .map((agency) => {
                              return (
                                <Tr key={agency.id}>
                                  <Td>
                                    <Link
                                      href={`/agencies/${agency.state.label}/government/${agency.slug}`}
                                      color="purple.500"
                                      isExternal
                                    >
                                      {agency.agencyName}
                                    </Link>
                                  </Td>
                                  <Td>
                                    <Link
                                      href={`/agencies/${agency.state.label}/government/${agency.slug}`}
                                      color="purple.500"
                                      isExternal
                                    >
                                      {agency.agencyAcronym}
                                    </Link>
                                  </Td>
                                  <Td>
                                    <UnorderedList listStyleType="none" ml={0}>
                                      <ListItem>
                                        {agency.streetAddress}
                                      </ListItem>
                                      {agency.streetAddress2 && (
                                        <ListItem>
                                          {agency.streetAddress2}
                                        </ListItem>
                                      )}
                                      <ListItem>
                                        {agency.city},{agency.state.label}{' '}
                                        {agency.zipcode}
                                      </ListItem>
                                      <ListItem>
                                        <Link
                                          href={`tel:${agency.phoneNumber}`}
                                          color="purple.500"
                                        >
                                          {agency.phoneNumber}
                                        </Link>
                                      </ListItem>
                                      <ListItem>
                                        <Link
                                          href={
                                            validateEmail(agency.emailAddress)
                                              ? `mailto:${agency.emailAddress}`
                                              : `${agency.emailAddress}`
                                          }
                                          color="purple.500"
                                          isExternal
                                        >
                                          {agency.emailAddress}
                                        </Link>
                                      </ListItem>
                                      <ListItem>
                                        <Link
                                          href={agency.website}
                                          color="purple.500"
                                          isExternal
                                        >
                                          Website
                                        </Link>
                                      </ListItem>
                                    </UnorderedList>
                                  </Td>

                                  <Td>
                                    <Badge
                                      fontSize="xs"
                                      colorScheme={badgeEnum[agency.visibility]}
                                    >
                                      {agency.visibility}
                                    </Badge>
                                  </Td>
                                  <Td>{agency.postedBy}</Td>
                                  <Td textAlign="right">
                                    <ButtonGroup variant="outline" spacing="6">
                                      <Button
                                        size="sm"
                                        leftIcon={
                                          <HiPencilAlt fontSize="1.25em" />
                                        }
                                        onClick={() =>
                                          router.push(
                                            `/dashboard/agencies/edit/${agency.id}`,
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
                                          handleDeleteModal(agency.id)
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
                        agenciesData={agenciesData}
                        type="Agency"
                        count={agenciesData?.length}
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

export default DashboardAgencies;
