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
  Spinner,
  UnorderedList,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { HiPencilAlt } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import parse from 'html-react-parser';
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

export const DashboardInbox = (props: any) => {
  const { userData } = useDashboardUser();

  const router = useRouter();
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const onClose = () => setIsOpen(false);

  const { data: contactsData } = useCollection<any>('contacts', {
    orderBy: ['createdAt', 'desc'],
    listen: false,
  });

  const { deleteDocument } = useDocument<any>(
    deleteId ? `contacts/${deleteId}` : null,
  );

  const handleDeleteModal = async (id: string) => {
    // open modal
    setIsOpen(true);
    // set the state - prepare for delete
    setDeleteId(id);
  };

  const handleDelete = async () => {
    deleteDocument();

    toast({
      title: 'Contact Deleted!',
      description: "You've successfully deleted a contact!",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    setIsOpen(false);
    router.push('/dashboard/inbox');
  };

  // START Search Filter
  const [searchTerm, setSearchTerm] = useState('');

  const SearchFilter = (e: any) => {
    setSearchTerm(e.target.value);
  };
  // END Search Filter

  return (
    <>
      {contactsData && (
        <LayoutDashboard title="Inbox" bg={props.bg} color={props.color}>
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
                          <BreadcrumbLink>Inbox</BreadcrumbLink>
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
                        Inbox ({contactsData?.length})
                      </Heading>
                      <TableActions
                        csvData={contactsData}
                        csvHeaders={null}
                        type="Contacts"
                        newLink={null}
                        onChange={SearchFilter}
                      />
                      <Table variant="simple" my={4}>
                        <Thead bg="gray.50">
                          <Tr>
                            <Th>POC</Th>
                            <Th>Message</Th>
                            <Th>Date</Th>
                            <Th></Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {contactsData
                            ?.filter(
                              (contact) =>
                                contact.firstName.includes(searchTerm) ||
                                contact.lastName.includes(searchTerm),
                            )
                            .map((contact) => {
                              return (
                                <Tr key={contact.id}>
                                  <Td>
                                    <UnorderedList styleType="none">
                                      <ListItem>
                                        {contact.firstName} {contact.lastName}
                                      </ListItem>
                                      <ListItem>
                                        {contact.emailAddress}
                                      </ListItem>
                                      <ListItem>
                                        <Link
                                          href={`tel:${contact.phoneNumber}`}
                                          color="purple.500"
                                        >
                                          {contact.phoneNumber}
                                        </Link>
                                      </ListItem>
                                      {contact.website && (
                                        <ListItem>
                                          <Link
                                            isExternal
                                            href={contact.website}
                                            color="purple.500"
                                          >
                                            Website
                                          </Link>
                                        </ListItem>
                                      )}
                                    </UnorderedList>
                                  </Td>

                                  <Td maxWidth={['lg']} className="description">
                                    <Text noOfLines={[1, 2, 3]}>
                                      {parse(contact.message.toString())}
                                    </Text>
                                  </Td>
                                  <Td>{formatDate(contact.createdAt)}</Td>
                                  <Td textAlign="right">
                                    <ButtonGroup variant="outline" spacing="6">
                                      <Button
                                        size="sm"
                                        leftIcon={
                                          <HiPencilAlt fontSize="1.25em" />
                                        }
                                        onClick={() =>
                                          router.push(
                                            `/dashboard/inbox/edit/${contact.id}`,
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
                                          handleDeleteModal(contact.id)
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
                        contactsData={contactsData}
                        type="Contacts"
                        count={contactsData?.length}
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

export default DashboardInbox;
