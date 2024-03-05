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
} from '@chakra-ui/react';
import { HiPencilAlt } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrDocumentDownload } from 'react-icons/gr';
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

export const DashboardLeads = (props: any) => {
  const { userData } = useDashboardUser();

  const router = useRouter();
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const onClose = () => setIsOpen(false);

  const { data: leadsData } = useCollection<any>('leads', {
    orderBy: ['createdAt', 'desc'],
  });

  const { deleteDocument } = useDocument<any>(
    deleteId ? `leads/${deleteId}` : null,
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
      title: 'Lead Deleted!',
      description: "You've successfully deleted a lead!",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    setIsOpen(false);
    router.push('/dashboard/leads');
  };

  return (
    <>
      {leadsData && (
        <LayoutDashboard title="Leads" bg={props.bg} color={props.color}>
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

                        <BreadcrumbItem isCurrentPage>
                          <BreadcrumbLink>Leads</BreadcrumbLink>
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
                        Leads ({leadsData?.length})
                      </Heading>
                      <TableActions
                        csvData={leadsData}
                        csvHeaders={null}
                        type="Leads"
                        newLink={null}
                        onChange={() => {}}
                      />
                      <Table variant="simple" my={4}>
                        <Thead bg="gray.50">
                          <Tr>
                            <Th>Project Name</Th>
                            <Th>POC</Th>
                            <Th>Budget</Th>
                            <Th>Attachments</Th>
                            <Th>Scope</Th>
                            <Th></Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {leadsData?.map((lead) => {
                            return (
                              <Tr key={lead.id}>
                                <Td>{lead.projectName}</Td>
                                <Td>
                                  <UnorderedList listStyleType="none">
                                    <ListItem>
                                      {lead.firstName} {lead.lastName}
                                    </ListItem>
                                    <ListItem>{lead.emailAddress}</ListItem>
                                    <ListItem>
                                      <Link
                                        href={`tel:${lead.phoneNumber}`}
                                        color="purple.500"
                                      >
                                        {lead.phoneNumber}
                                      </Link>
                                    </ListItem>
                                    <ListItem>
                                      <Link
                                        href={`${lead.projectWebsite}`}
                                        color="purple.500"
                                        isExternal
                                      >
                                        Website
                                      </Link>
                                    </ListItem>
                                  </UnorderedList>
                                </Td>
                                <Td>{lead.budget?.label}</Td>
                                <Td>
                                  {lead.attachment ? (
                                    <Link
                                      href={`${lead.attachment}`}
                                      color="purple.500"
                                      isExternal
                                    >
                                      <GrDocumentDownload />
                                    </Link>
                                  ) : (
                                    'No'
                                  )}
                                </Td>

                                <Td maxWidth={['sm']} className="description">
                                  {parse(lead.projectScope.toString())}
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
                                          `/dashboard/leads/edit/${lead.id}`,
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
                                      onClick={() => handleDeleteModal(lead.id)}
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
                        leadsData={leadsData}
                        type="Leads"
                        count={leadsData?.length}
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

export default DashboardLeads;
