import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useDocument, useCollection } from '@nandorojo/swr-firestore';
import NextLink from 'next/link';
import { LayoutDashboard } from '@/components/LayoutDashboard';
import { useDashboardUser } from '@/hooks/useDashboardUser';
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
  Link,
  Skeleton,
} from '@chakra-ui/react';
import { HiPencilAlt } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { slugify } from '@/helpers/index';

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

export const DashboardJobs = (props: any) => {
  const { userData } = useDashboardUser();
  const router = useRouter();
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const onClose = () => setIsOpen(false);

  const { data: jobsData } = useCollection<any>('careers', {
    orderBy: ['createdAt', 'desc'],
    listen: false,
  });

  const { deleteDocument } = useDocument<any>(`careers/${deleteId}`);

  const handleDeleteModal = async (id: string) => {
    // open modal
    setIsOpen(true);
    // set the state - prepare for delete
    setDeleteId(id);
  };

  const handleDelete = async () => {
    await deleteDocument();

    toast({
      title: 'Job Deleted!',
      description: "You've successfully deleted a job!",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    setIsOpen(false);
    router.push('/dashboard/jobs');
  };

  // START Search Filter
  const [searchTerm, setSearchTerm] = useState('');

  const SearchFilter = (e: any) => {
    setSearchTerm(e.target.value);
  };
  // END Search Filter

  function GetApplicantsCount(jobId: any) {
    const { data: applicantsData } = useCollection<any>('applicants', {
      where: ['jobId', '==', jobId.jobId],
    });

    return <>{applicantsData && applicantsData?.length}</>;
  }

  const badgeEnum: Record<string, string> = {
    Public: 'green',
    Private: 'red',
    Draft: 'purple',
  };

  return (
    <>
      {jobsData && (
        <LayoutDashboard title="Jobs" bg={props.bg} color={props.color}>
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
                          <BreadcrumbLink>Jobs</BreadcrumbLink>
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
                        Jobs ({jobsData?.length})
                      </Heading>
                      <TableActions
                        csvData={jobsData}
                        csvHeaders={null}
                        type="Job"
                        count={jobsData?.length}
                        newLink={'/dashboard/jobs/new'}
                        onChange={SearchFilter}
                      />
                      <Table variant="simple" my={4}>
                        <Thead bg="gray.50">
                          <Tr>
                            <Th>Contract Number</Th>
                            <Th>Title</Th>
                            <Th>Agency</Th>
                            <Th>Region</Th>
                            <Th>Status</Th>
                            <Th>Applicants</Th>
                            <Th whiteSpace="nowrap">Posted By</Th>
                            <Th></Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {jobsData
                            ?.filter(
                              (job) =>
                                job.jobTitle.includes(searchTerm) ||
                                job.jobContractNumber.includes(searchTerm),
                            )
                            .map((job) => {
                              return (
                                <Tr key={job.id}>
                                  <Td>
                                    <NextLink href={`/careers/${job.jobSlug}`}>
                                      {job.jobContractNumber}
                                    </NextLink>
                                  </Td>
                                  <Td>
                                    <NextLink href={`/careers/${job.jobSlug}`}>
                                      {job.jobShortTitle}
                                    </NextLink>
                                  </Td>
                                  <Td>
                                    <Link
                                      isExternal
                                      href={`/agencies/${
                                        job.state?.label
                                      }/government/${slugify(
                                        job.jobAgency.label,
                                      )}`}
                                    >
                                      {job.jobAgency?.label}
                                    </Link>
                                  </Td>
                                  <Td whiteSpace="nowrap">
                                    {job.jobRegion?.label}
                                  </Td>
                                  <Td>
                                    <Badge
                                      fontSize="xs"
                                      colorScheme={badgeEnum[job.visibility]}
                                    >
                                      {job.visibility}
                                    </Badge>
                                  </Td>
                                  <Td>
                                    <GetApplicantsCount jobId={job.id} />
                                  </Td>
                                  <Td>{job.postedBy}</Td>
                                  <Td textAlign="right">
                                    <ButtonGroup variant="outline" spacing="6">
                                      <Button
                                        size="sm"
                                        leftIcon={
                                          <HiPencilAlt fontSize="1.25em" />
                                        }
                                        onClick={() =>
                                          router.push(
                                            `/dashboard/jobs/edit/${job.id}`,
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
                                          handleDeleteModal(job.id)
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
                        jobsData={jobsData}
                        type="Job"
                        count={jobsData?.length}
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

export default DashboardJobs;
