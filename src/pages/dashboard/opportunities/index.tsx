import { useState } from 'react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import {
  Box,
  Flex,
  Heading,
  Text,
  Divider,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Badge,
  Link,
  ListItem,
  UnorderedList,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spinner,
  Skeleton,
} from '@chakra-ui/react';
import useSWR from 'swr';
import { formatDate } from '@/helpers/index';
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

const TableActions = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.TableActions),
  { ssr: false, loading: () => <Spinner /> },
);

const TablePagination = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.TablePagination),
  { ssr: false, loading: () => <Spinner /> },
);

export const DashboardOpportunities = (props: any) => {
  const { userData } = useDashboardUser();

  const [pageIndex, setPageIndex] = useState(0);

  const fetcher = (url: RequestInfo): any => fetch(url).then((r) => r.json());

  function getFormattedDate(date: Date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return month + '/' + day + '/' + year;
  }

  const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const toDate = new Date(Date.now());

  const pageLimit = 200;
  const offset = (pageIndex + 1 - 1) * pageLimit;

  const handleNextPage = () => {
    setPageIndex(pageIndex + 1);
  };

  const handlePreviousPage = () => {
    setPageIndex(pageIndex - 1);
  };

  const { data: opportunitiesData } = useSWR<any, any>(
    `https://api.sam.gov/prod/opportunities/v2/search?api_key=${
      process.env['NEXT_PUBLIC_SAM_API_KEY']
    }&limit=${pageLimit}&postedFrom=${getFormattedDate(
      fromDate,
    )}&postedTo=${getFormattedDate(toDate)}&ptype=p&offset=${offset}`,
    fetcher,
  );

  const totalRecords = opportunitiesData?.totalRecords;

  // START Search Filter
  const [searchTerm, setSearchTerm] = useState('');

  const SearchFilter = (e: any) => {
    setSearchTerm(e.target.value);
  };
  // END Search Filter

  const badgeEnum: Record<string, string> = {
    '541511': 'green',
    '541519': 'green',
    '511210': 'green',
    '611420': 'green',
    '541613': 'green',
    '541430': 'green',
    '541810': 'green',
    SBA: 'green',
    HZC: 'green',
    HZS: 'green',
    SDVOSBC: 'green',
    SDVOSBS: 'green',
    VSA: 'green',
    VSS: 'green',
  };

  function paginationCounts(
    length: number,
    currentPage: number,
    pageLimit: number,
  ) {
    return {
      total: length,
      per_page: pageLimit,
      current_page: currentPage,
      last_page: Math.ceil(length / pageLimit),
      from: (currentPage - 1) * pageLimit + 1,
      to: currentPage * pageLimit,
    };
  }

  return (
    <>
      {opportunitiesData && (
        <LayoutDashboard
          title="Opportunities"
          bg={props.bg}
          color={props.color}
        >
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
                          <BreadcrumbLink>Federal Opportunities</BreadcrumbLink>
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
                      <Heading size="lg">
                        Federal Opportunities ({opportunitiesData?.totalRecords}
                        )
                      </Heading>

                      <Text mb="6">
                        Between {getFormattedDate(fromDate)} -{' '}
                        {getFormattedDate(toDate)}
                      </Text>
                      <Box my={4}>
                        <TableActions
                          csvData={opportunitiesData?.opportunitiesData}
                          csvHeaders={null}
                          type="Opportunity"
                          count={opportunitiesData?.opportunitiesData?.length}
                          newLink={null}
                          onChange={SearchFilter}
                        />
                      </Box>
                      <TablePagination
                        opportunitiesData={opportunitiesData?.opportunitiesData}
                        type="Opportunity"
                        count={opportunitiesData?.totalRecords}
                        onClickPrevious={handlePreviousPage}
                        onClickNext={handleNextPage}
                        pageIndex={pageIndex}
                        totalRecords={totalRecords}
                        currentPage={
                          paginationCounts(totalRecords, pageIndex, pageLimit)
                            .current_page + 1
                        }
                        lastPage={
                          paginationCounts(totalRecords, pageIndex, pageLimit)
                            .last_page
                        }
                        perPage={
                          paginationCounts(totalRecords, pageIndex, pageLimit)
                            .per_page
                        }
                      />
                      <Table variant="simple" my={4} size="sm">
                        <Thead bg="gray.50">
                          <Tr>
                            <Th>Opportunity</Th>
                            <Th>Type</Th>
                            <Th>Department</Th>
                            <Th>POC</Th>
                            <Th>Set-Aside</Th>
                            <Th>Dates</Th>
                            <Th>NAICS</Th>
                            <Th>Active</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {opportunitiesData?.opportunitiesData
                            ?.filter(
                              (item: {
                                title: string | string[];
                                fullParentPathName: string | string[];
                                naicsCode: string | string[];
                                type: string | string[];
                                typeOfSetAside: string | string[];
                              }): any =>
                                item.title?.includes(searchTerm) ||
                                item.fullParentPathName?.includes(searchTerm) ||
                                item.naicsCode?.includes(searchTerm) ||
                                item.type?.includes(searchTerm) ||
                                item.typeOfSetAside?.includes(searchTerm),
                            )
                            .map((item: any) => {
                              return (
                                <Tr key={item.noticeId}>
                                  <Td>
                                    <Link
                                      wordBreak="break-all"
                                      isExternal
                                      color="purple.500"
                                      href={item.uiLink}
                                    >
                                      {item.title} - {item.solicitationNumber}
                                    </Link>
                                  </Td>
                                  <Td>
                                    {item.baseType === item.type
                                      ? item.type
                                      : item.baseType}
                                  </Td>
                                  <Td>{item.fullParentPathName}</Td>
                                  <Td>
                                    {item.pointOfContact && (
                                      <UnorderedList styleType="none">
                                        <ListItem>
                                          {item.pointOfContact[0]?.fullName}
                                        </ListItem>
                                        <ListItem>
                                          <Link
                                            href={`mailto:${item.pointOfContact[0]?.email}`}
                                            color="purple.500"
                                          >
                                            {item.pointOfContact[0]?.email}
                                          </Link>
                                        </ListItem>
                                        <ListItem>
                                          <Link
                                            href={`tel:${item.pointOfContact[0]?.phone}`}
                                            color="purple.500"
                                          >
                                            {item.pointOfContact[0]?.phone}
                                          </Link>
                                        </ListItem>
                                      </UnorderedList>
                                    )}
                                  </Td>
                                  <Td>
                                    <Badge
                                      fontSize="xs"
                                      p={1}
                                      colorScheme={
                                        badgeEnum[item.typeOfSetAside]
                                      }
                                    >
                                      {item.typeOfSetAside}
                                    </Badge>
                                  </Td>
                                  <Td>
                                    Posted: {formatDate(item.postedDate)}
                                    <br />
                                    Deadline:{' '}
                                    {formatDate(item.responseDeadLine)}
                                  </Td>
                                  <Td>
                                    <Badge
                                      fontSize="xs"
                                      p={1}
                                      colorScheme={badgeEnum[item.naicsCode]}
                                    >
                                      {item.naicsCode}
                                    </Badge>
                                  </Td>
                                  <Td>{item.active}</Td>
                                </Tr>
                              );
                            })}
                        </Tbody>
                      </Table>
                      <TablePagination
                        opportunitiesData={opportunitiesData?.opportunitiesData}
                        type="Opportunity"
                        count={opportunitiesData?.totalRecords}
                        onClickPrevious={handlePreviousPage}
                        onClickNext={handleNextPage}
                        pageIndex={pageIndex}
                        totalRecords={totalRecords}
                        currentPage={
                          paginationCounts(totalRecords, pageIndex, pageLimit)
                            .current_page + 1
                        }
                        lastPage={
                          paginationCounts(totalRecords, pageIndex, pageLimit)
                            .last_page
                        }
                        perPage={
                          paginationCounts(totalRecords, pageIndex, pageLimit)
                            .per_page
                        }
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Flex>
          </Box>
        </LayoutDashboard>
      )}
    </>
  );
};

export default DashboardOpportunities;
