import * as React from 'react';
import { lighten, darken } from 'polished';
import dynamic from 'next/dynamic';
import { Flex, Stack, Tag, Spinner, Skeleton } from '@chakra-ui/react';
import {
  BiCog,
  BiCommentAdd,
  BiHome,
  BiUserCircle,
  BiStore,
  BiUserPin,
  BiSpreadsheet,
} from 'react-icons/bi';
import { HiOutlineMail, HiOutlineOfficeBuilding } from 'react-icons/hi';
import { useCollection } from '@nandorojo/swr-firestore';
import { isAdmin, isAssistant, isStaffing } from '@/helpers/index';

const AccountSwitcher = dynamic<any>(
  () =>
    import('@/components/AccountSwitcher').then((mod) => mod.AccountSwitcher),
  {
    ssr: false,
    loading: () => (
      <Stack>
        <Skeleton height="73px" />
      </Stack>
    ),
  },
);

const NavItem = dynamic<any>(
  () => import('@/components/NavItem').then((mod) => mod.NavItem),
  {
    ssr: false,
    loading: () => (
      <Stack>
        <Skeleton height="37px" />
      </Stack>
    ),
  },
);

const NavGroup = dynamic<any>(
  () => import('@/components/NavGroup').then((mod) => mod.NavGroup),
  {
    ssr: false,
    loading: () => (
      <Stack>
        <Skeleton height="150px" />
      </Stack>
    ),
  },
);

export interface DashboardNavProps {}

export const DashboardNav: React.FC<any> = (props: any) => {
  const { data: contactsData, loading: contactsLoading } = useCollection<any>(
    'contacts',
    {
      listen: false,
    },
  );

  const { data: leadsData, loading: leadsLoading } = useCollection<any>(
    'leads',
    {
      listen: false,
    },
  );

  const { data: careersData, loading: careersLoading } = useCollection<any>(
    'careers',
    {
      listen: false,
    },
  );

  const { data: contractsData, loading: contractsLoading } = useCollection<any>(
    'contracts',
    {
      listen: false,
    },
  );

  const { data: applicantsData, loading: applicantsLoading } =
    useCollection<any>('applicants', {
      listen: false,
    });

  const { data: clientsData, loading: clientsLoading } = useCollection<any>(
    'clients',
    {
      listen: false,
    },
  );

  const { data: partnershipsData, loading: partnershipsLoading } =
    useCollection<any>('partnerships', {
      listen: false,
    });

  const { data: agenciesData, loading: agenciesLoading } = useCollection<any>(
    'agencies',
    {
      listen: false,
    },
  );

  return (
    <Flex h="full" direction="column" px="4" py="4">
      <AccountSwitcher
        user={props.userData}
        bg={props.bg && lighten(0.035, props.bg?.toString())}
        color={props.color && darken(0.05, props.color?.toString())}
      />
      <Stack spacing="8" flex="1" overflow="auto" pt="8">
        <Stack spacing="1">
          {isAdmin(props.userData) && (
            <NavItem
              active
              icon={<BiHome color={props.color} />}
              label="Welcome"
              href="/dashboard"
            />
          )}
          {isAdmin(props.userData) && (
            <NavItem
              icon={<HiOutlineMail color={props.color} />}
              label="Inbox"
              href="/dashboard/inbox"
              endElement={
                <Tag
                  size="sm"
                  variant="solid"
                  bg={props.color}
                  color={props.bg}
                >
                  {contactsLoading ? (
                    <Spinner size="xs" />
                  ) : (
                    contactsData?.length
                  )}
                </Tag>
              }
            />
          )}
          {isAdmin(props.userData) && (
            <NavItem
              icon={<BiCommentAdd color={props.color} />}
              label="Leads"
              href="/dashboard/leads"
              endElement={
                <Tag
                  size="sm"
                  variant="solid"
                  bg={props.color}
                  color={props.bg}
                >
                  {leadsLoading ? <Spinner size="xs" /> : leadsData?.length}
                </Tag>
              }
            />
          )}
        </Stack>
        <NavGroup label="Jobs">
          {(isAssistant(props.userData) || isAdmin(props.userData)) && (
            <NavItem
              icon={<BiStore color={props.color} />}
              label="Jobs"
              href="/dashboard/jobs"
              endElement={
                <Tag
                  size="sm"
                  variant="solid"
                  bg={props.color}
                  color={props.bg}
                >
                  {careersLoading ? <Spinner size="xs" /> : careersData?.length}
                </Tag>
              }
            />
          )}
          {(isStaffing(props.userData) || isAdmin(props.userData)) && (
            <NavItem
              icon={<BiUserCircle color={props.color} />}
              label="Applicants"
              href="/dashboard/applicants"
              endElement={
                <Tag
                  size="sm"
                  variant="solid"
                  bg={props.color}
                  color={props.bg}
                >
                  {applicantsLoading ? (
                    <Spinner size="xs" />
                  ) : (
                    applicantsData?.length
                  )}
                </Tag>
              }
            />
          )}
          {(isAssistant(props.userData) || isAdmin(props.userData)) && (
            <NavItem
              icon={<HiOutlineOfficeBuilding color={props.color} />}
              label="Agencies"
              href="/dashboard/agencies"
              endElement={
                <Tag
                  size="sm"
                  variant="solid"
                  bg={props.color}
                  color={props.bg}
                >
                  {agenciesLoading ? (
                    <Spinner size="xs" />
                  ) : (
                    agenciesData?.length
                  )}
                </Tag>
              }
            />
          )}
        </NavGroup>

        {isAdmin(props.userData) && (
          <NavGroup label="Clients">
            <NavItem
              icon={<BiUserPin color={props.color} />}
              label="Clients"
              href="/dashboard/clients"
              endElement={
                <Tag
                  size="sm"
                  variant="solid"
                  bg={props.color}
                  color={props.bg}
                >
                  {clientsLoading ? <Spinner size="xs" /> : clientsData?.length}
                </Tag>
              }
            />
          </NavGroup>
        )}

        {isAdmin(props.userData) && (
          <NavGroup label="Partnerships">
            <NavItem
              icon={<BiUserPin color={props.color} />}
              label="Partnerships"
              href="/dashboard/partnerships"
              endElement={
                <Tag
                  size="sm"
                  variant="solid"
                  bg={props.color}
                  color={props.bg}
                >
                  {partnershipsLoading ? (
                    <Spinner size="xs" />
                  ) : (
                    partnershipsData?.length
                  )}
                </Tag>
              }
            />
          </NavGroup>
        )}

        {isAdmin(props.userData) && (
          <NavGroup label="Contracts">
            <NavItem
              icon={<BiUserPin color={props.color} />}
              label="Contracts"
              href="/dashboard/contracts"
              endElement={
                <Tag
                  size="sm"
                  variant="solid"
                  bg={props.color}
                  color={props.bg}
                >
                  {contractsLoading ? (
                    <Spinner size="xs" />
                  ) : (
                    contractsData?.length
                  )}
                </Tag>
              }
            />
            <NavItem
              icon={<BiUserPin color={props.color} />}
              label="Federal Opportunities"
              href="/dashboard/opportunities"
            />
          </NavGroup>
        )}

        {isAdmin(props.userData) && (
          <NavGroup label="Content Management">
            <NavItem
              icon={<BiSpreadsheet color={props.color} />}
              label="Pages"
              href="/dashboard/pages"
            />
          </NavGroup>
        )}

        <NavGroup label="Account">
          <NavItem
            subtle
            icon={<BiCog color={props.color} />}
            label="Settings"
            href="/dashboard/settings"
          />
        </NavGroup>
      </Stack>
    </Flex>
  );
};
