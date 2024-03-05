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
import { commaHelper } from '@/helpers/index';
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

const DotIcon = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.DotIcon),
  { ssr: false, loading: () => <Spinner /> },
);

export const DashboardClients = (props: any) => {
  const { userData } = useDashboardUser();
  const router = useRouter();
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const onClose = () => setIsOpen(false);

  const { data: clientsData } = useCollection<any>('clients', {
    orderBy: ['createdAt', 'desc'],
  });

  const { deleteDocument } = useDocument<any>(
    deleteId ? `clients/${deleteId}` : null,
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
      title: 'Client Deleted!',
      description: "You've successfully deleted a client!",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    setIsOpen(false);
    router.push('/dashboard/clients');
  };

  // START Search Filter
  const [searchTerm, setSearchTerm] = useState('');

  const SearchFilter = (e: any) => {
    setSearchTerm(e.target.value);
  };
  // END Search Filter

  const badgeEnum: Record<string, string> = {
    Public: 'green',
    Private: 'red',
    Completed: 'green',
    'In Development': 'orange',
    'Design Phase': 'purple',
    'Planning Phase': 'blue',
  };

  const clientsHeaders = [
    { label: '#', key: '' },
    { label: 'CLIENT', key: 'name' },
    { label: 'BUDGET', key: 'budget' },
    { label: 'PROJECT STATUS', key: 'projectStatus' },
    { label: 'WEBSITE', key: 'website' },
    { label: 'INDUSTRY', key: 'industry[0].label' },
    { label: 'TIMELINE', key: 'timeline' },
    { label: 'TYPE', key: 'clientTypeMain.label' },
  ];

  return (
    <>
      {clientsData && (
        <LayoutDashboard title="Clients" bg={props.bg} color={props.color}>
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
                          <BreadcrumbLink>Clients</BreadcrumbLink>
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
                        Clients ({clientsData?.length})
                      </Heading>
                      <TableActions
                        csvData={clientsData}
                        csvHeaders={clientsHeaders}
                        type="Client"
                        count={clientsData?.length}
                        newLink={'/dashboard/clients/new'}
                        onChange={SearchFilter}
                      />
                      <Table variant="simple" my={4}>
                        <Thead bg="gray.50">
                          <Tr>
                            <Th>Color</Th>
                            <Th>Client</Th>
                            <Th>Budget</Th>
                            <Th>Project Status</Th>
                            <Th>Visibility</Th>
                            <Th></Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {clientsData
                            ?.filter(
                              (client) =>
                                client.name.includes(searchTerm) ||
                                client.budget.includes(searchTerm),
                            )
                            .map((client) => {
                              return (
                                <Tr key={client.id}>
                                  <Td>
                                    <NextLink
                                      href={`/clients/project/${client.slug}`}
                                    >
                                      <DotIcon
                                        boxSize={10}
                                        bg={client.colors[0]?.color.toString()}
                                      />
                                    </NextLink>
                                  </Td>
                                  <Td>
                                    <NextLink
                                      href={`/clients/project/${client.slug}`}
                                    >
                                      {client.name}
                                    </NextLink>
                                  </Td>
                                  <Td>
                                    {client.budget !== 'NA' && '$'}
                                    {commaHelper(client.budget)}
                                  </Td>
                                  <Td>
                                    <Badge
                                      fontSize="xs"
                                      colorScheme={
                                        badgeEnum[client.projectStatus]
                                      }
                                    >
                                      {client.projectStatus}
                                    </Badge>
                                  </Td>
                                  <Td>
                                    <Badge
                                      fontSize="xs"
                                      colorScheme={badgeEnum[client.visibility]}
                                    >
                                      {client.visibility}
                                    </Badge>
                                  </Td>

                                  <Td textAlign="right">
                                    <ButtonGroup variant="outline" spacing="6">
                                      <Button
                                        size="sm"
                                        leftIcon={
                                          <HiPencilAlt fontSize="1.25em" />
                                        }
                                        onClick={() =>
                                          router.push(
                                            `/dashboard/clients/edit/${client.id}`,
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
                                          handleDeleteModal(client.id)
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
                        clientsData={clientsData}
                        type="Client"
                        count={clientsData?.length}
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

export default DashboardClients;
