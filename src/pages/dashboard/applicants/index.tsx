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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spinner,
  Skeleton,
} from '@chakra-ui/react';
import { HiPencilAlt } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrDocumentDownload } from 'react-icons/gr';
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

export const DashboardJobApplicants = (props: any) => {
  const { userData } = useDashboardUser();

  const router = useRouter();
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const onClose = () => setIsOpen(false);

  const { data: applicantsData } = useCollection<any>('applicants', {
    orderBy: ['createdAt', 'desc'],
    listen: false,
  });

  const { deleteDocument } = useDocument<any>(
    deleteId ? `applicants/${deleteId}` : null,
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
      title: 'Applicant Deleted!',
      description: "You've successfully deleted an applicant!",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    setIsOpen(false);
    router.push('/dashboard/applicants');
  };

  // START Search Filter
  const [searchTerm, setSearchTerm] = useState('');

  const SearchFilter = (e: any) => {
    setSearchTerm(e.target.value);
  };
  // END Search Filter

  return (
    <>
      {applicantsData && (
        <LayoutDashboard title="Applicants" bg={props.bg} color={props.color}>
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
                          <BreadcrumbLink>Applicants</BreadcrumbLink>
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
                        Applicants ({applicantsData?.length})
                      </Heading>
                      <TableActions
                        csvData={applicantsData}
                        csvHeaders={null}
                        type="Applicants"
                        count={applicantsData?.length}
                        newLink={null}
                        onChange={SearchFilter}
                      />
                      <Table variant="simple" my={4}>
                        <Thead bg="gray.50">
                          <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Phone</Th>
                            <Th>Resume</Th>
                            <Th>Citizen</Th>
                            <Th>Job Id</Th>
                            <Th></Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {applicantsData
                            ?.filter(
                              (applicant) =>
                                applicant.jobId.includes(searchTerm) ||
                                applicant.firstName.includes(searchTerm) ||
                                applicant.lastName.includes(searchTerm),
                            )
                            .map((applicant) => {
                              return (
                                <Tr key={applicant.id}>
                                  <Td>
                                    <Link
                                      href={applicant.resumeLink}
                                      isExternal
                                      color="purple.500"
                                    >
                                      {applicant.firstName}{' '}
                                      {applicant.middleName}{' '}
                                      {applicant.lastName}
                                    </Link>
                                  </Td>
                                  <Td>
                                    <Link
                                      href={`mailto:${applicant.emailAddress}`}
                                      color="purple.500"
                                    >
                                      {applicant.emailAddress}
                                    </Link>
                                  </Td>
                                  <Td>
                                    <Link
                                      href={`tel:${applicant.phoneNumber}`}
                                      color="purple.500"
                                    >
                                      {applicant.phoneNumber}
                                    </Link>
                                  </Td>
                                  <Td>
                                    {applicant.resume ? (
                                      <Link
                                        href={`${applicant.resume}`}
                                        color="purple.500"
                                        isExternal
                                      >
                                        <GrDocumentDownload />
                                      </Link>
                                    ) : (
                                      'No'
                                    )}
                                  </Td>
                                  <Td>{applicant.isUSEligible}</Td>
                                  <Td>
                                    <NextLink
                                      href={`/dashboard/jobs/edit/${applicant.jobId}`}
                                    >
                                      <a>{applicant.jobId}</a>
                                    </NextLink>
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
                                            `/dashboard/applicants/edit/${applicant.id}`,
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
                                          handleDeleteModal(applicant.id)
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
                        applicantsData={applicantsData}
                        type="Applicants"
                        count={applicantsData?.length}
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

export default DashboardJobApplicants;
