import {
  Box,
  Button,
  Flex,
  HStack,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  SkeletonCircle,
  Divider,
} from '@chakra-ui/react';
import * as React from 'react';
import { NavLink } from './NavLink';
import { NavMenu } from './NavMenu';
import { Submenu } from './Submenu';
import { ToggleButton } from './ToggleButton';
import { links } from './navData';
import NextLink from 'next/link';
import { isAdmin, isAssistant, isStaffing, randomColor } from '@/helpers/index';
import { useAuth } from '@/hooks/useAuth';
import dynamic from 'next/dynamic';

const Logo = dynamic<any>(
  () => import('@/components/Logo').then((mod) => mod.Logo),
  { ssr: false, loading: () => <SkeletonCircle size="34" /> },
);

const MobileNavContext = (props: any) => {
  const { isOpen, onToggle } = useDisclosure();
  const auth = useAuth();

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        className="nav-content__mobile"
        {...props}
      >
        <Box mx="auto">
          <Logo
            boxSize={34}
            href="/"
            color={props.color}
            title="Colorful Dots, LLC"
            bg={randomColor()}
            ml={[8]}
          />
        </Box>
        <Box
          visibility={{
            xs: 'visible',
            sm: 'visible',
            md: 'hidden',
            lg: 'hidden',
            xl: 'hidden',
          }}
        >
          <ToggleButton isOpen={isOpen} onClick={onToggle} {...props} />
        </Box>
      </Flex>
      <NavMenu animate={isOpen ? 'open' : 'closed'} bg="gray.100">
        {links.map((link, idx) =>
          link.children ? (
            <Submenu.Mobile key={idx} link={link} />
          ) : (
            <NavLink.Mobile key={idx} href={link.href} color={props.color}>
              {link.label}
            </NavLink.Mobile>
          ),
        )}

        {(isAdmin(props.user) ||
          isAssistant(props.user) ||
          isStaffing(props.user)) && (
          <Box>
            <Divider my={4} />
            <Menu>
              <MenuButton as={Button} colorScheme="pink" size="sm">
                {props.user.firstName}
              </MenuButton>
              <MenuList>
                <MenuGroup title="Dashboard">
                  {isAdmin(props.user) && (
                    <MenuItem>
                      <NextLink href={`/dashboard/inbox`}>
                        <a title="Inbox">Inbox</a>
                      </NextLink>
                    </MenuItem>
                  )}
                  {isAdmin(props.user) && (
                    <MenuItem>
                      <NextLink href={`/dashboard/leads`}>
                        <a title="Leads">Leads</a>
                      </NextLink>
                    </MenuItem>
                  )}
                  {(isAdmin(props.user) ||
                    isAssistant(props.user) ||
                    isStaffing(props.user)) && (
                    <MenuItem>
                      <NextLink href={`/dashboard/jobs`}>
                        <a title="Jobs">Jobs</a>
                      </NextLink>
                    </MenuItem>
                  )}
                  {(isAdmin(props.user) || isAssistant(props.user)) && (
                    <MenuItem>
                      <NextLink href={`/dashboard/agencies`}>
                        <a title="Agencies">Agencies</a>
                      </NextLink>
                    </MenuItem>
                  )}
                  {(isAdmin(props.user) || isStaffing(props.user)) && (
                    <MenuItem>
                      <NextLink href={`/dashboard/applicants`}>
                        <a title="Applicants">Applicants</a>
                      </NextLink>
                    </MenuItem>
                  )}
                  {isAdmin(props.user) && (
                    <MenuItem>
                      <NextLink href={`/dashboard/clients`}>
                        <a title="Clients">Clients</a>
                      </NextLink>
                    </MenuItem>
                  )}
                  {isAdmin(props.user) && (
                    <MenuItem>
                      <NextLink href={`/dashboard/clients/new`}>
                        <a title="Add New Client">Add New Client</a>
                      </NextLink>
                    </MenuItem>
                  )}
                </MenuGroup>
                <MenuDivider />

                <MenuGroup title="Account">
                  <MenuItem>
                    <NextLink href={`/dashboard/settings`}>
                      <a title="Settings">Settings</a>
                    </NextLink>
                  </MenuItem>
                  <MenuItem onClick={() => auth.signout('/auth/sign-in')}>
                    Sign Out
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Box>
        )}
      </NavMenu>
    </>
  );
};

const DesktopNavContent = (props: any) => {
  const auth = useAuth();

  return (
    <Flex
      className="nav-content__desktop"
      align="center"
      justify="space-between"
      {...props}
    >
      <Box>
        {/* <VisuallyHidden>Colorful Dots, LLC</VisuallyHidden> */}
        <Logo
          boxSize={42}
          href="/"
          color={props.color}
          title="Colorful Dots, LLC"
          bg={randomColor()}
          brand="CD"
        />
      </Box>
      <HStack
        as="ul"
        id="nav__primary-menu"
        aria-label="Main Menu"
        listStyleType="none"
      >
        {links.map((link, idx) => (
          <Box as="li" key={idx} id={`nav__menuitem-${idx}`} pl={4}>
            {link.children ? (
              <Submenu.Desktop link={link} />
            ) : (
              // @ts-ignore
              <NavLink.Desktop
                href={link.href}
                color={props.color}
                title={link.label}
              >
                {link.label}
              </NavLink.Desktop>
            )}
          </Box>
        ))}
        {(isAdmin(props.user) ||
          isAssistant(props.user) ||
          isStaffing(props.user)) && (
          <Box pl={4}>
            <Menu>
              <MenuButton as={Button} colorScheme="pink" size="sm">
                {props.user.firstName}
              </MenuButton>
              <MenuList>
                <MenuGroup title="Dashboard">
                  {isAdmin(props.user) && (
                    <MenuItem>
                      <NextLink href={`/dashboard/inbox`}>
                        <a title="Inbox">Inbox</a>
                      </NextLink>
                    </MenuItem>
                  )}
                  {isAdmin(props.user) && (
                    <MenuItem>
                      <NextLink href={`/dashboard/leads`}>
                        <a title="Leads">Leads</a>
                      </NextLink>
                    </MenuItem>
                  )}
                  {(isAdmin(props.user) ||
                    isAssistant(props.user) ||
                    isStaffing(props.user)) && (
                    <MenuItem>
                      <NextLink href={`/dashboard/jobs`}>
                        <a title="Jobs">Jobs</a>
                      </NextLink>
                    </MenuItem>
                  )}
                  {(isAdmin(props.user) || isAssistant(props.user)) && (
                    <MenuItem>
                      <NextLink href={`/dashboard/agencies`}>
                        <a title="Agencies">Agencies</a>
                      </NextLink>
                    </MenuItem>
                  )}
                  {(isAdmin(props.user) || isStaffing(props.user)) && (
                    <MenuItem>
                      <NextLink href={`/dashboard/applicants`}>
                        <a title="Applicants">Applicants</a>
                      </NextLink>
                    </MenuItem>
                  )}
                  {isAdmin(props.user) && (
                    <MenuItem>
                      <NextLink href={`/dashboard/clients`}>
                        <a title="Clients">Clients</a>
                      </NextLink>
                    </MenuItem>
                  )}
                  {isAdmin(props.user) && (
                    <MenuItem>
                      <NextLink href={`/dashboard/clients/new`}>
                        <a title="Add New Client">Add New Client</a>
                      </NextLink>
                    </MenuItem>
                  )}
                </MenuGroup>
                <MenuDivider />

                <MenuGroup title="Account">
                  <MenuItem>
                    <NextLink href={`/dashboard/settings`}>
                      <a title="Settings">Settings</a>
                    </NextLink>
                  </MenuItem>
                  <MenuItem onClick={() => auth.signout('/auth/sign-in')}>
                    Sign Out
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Box>
        )}
      </HStack>
    </Flex>
  );
};

export const NavContent = {
  Mobile: MobileNavContext,
  Desktop: DesktopNavContent,
};
