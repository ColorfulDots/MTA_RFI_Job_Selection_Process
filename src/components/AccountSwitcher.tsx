import {
  Box,
  Flex,
  HStack,
  Menu,
  Divider,
  MenuItem,
  Text,
  useMenuButton,
  Avatar,
  MenuList,
} from '@chakra-ui/react';
import { HiSelector } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { roleCheck, isAdmin } from '@/helpers/index';
import { useDashboardUser } from '@/hooks/useDashboardUser';

const AccountSwitcherButton = (props: any) => {
  const buttonProps = useMenuButton(props);

  return (
    <Flex
      as="button"
      {...buttonProps}
      w={'full'}
      display={'flex'}
      alignItems={'center'}
      rounded={'lg'}
      px={3}
      py={2}
      fontSize={'sm'}
      userSelect={'none'}
      cursor={'pointer'}
      outline={0}
      transition={'all 0.2s'}
      _focus={{ shadow: 'outline' }}
    >
      <HStack flex="1" spacing={3}>
        <Avatar
          borderWidth={2}
          name={props.user.firstName + ' ' + props.user.lastName}
          src={props.user.avatar}
        />
        <Box textAlign="start">
          <Box noOfLines={1} fontWeight="semibold">
            {`${props.user.firstName} ${props.user.middleName} ${props.user.lastName}`}
          </Box>
          <Box fontSize="xs">ID {props.user?.uid?.substr(-13) || null}</Box>
          <Box fontSize="xs">{roleCheck(props.user)}</Box>
        </Box>
      </HStack>
      <Box fontSize="lg">
        <HiSelector color={props.color} />
      </Box>
    </Flex>
  );
};

export const AccountSwitcher = (props: any) => {
  const { signout } = useDashboardUser();
  const router = useRouter();

  return (
    <Menu>
      <AccountSwitcherButton {...props} />
      <MenuList
        shadow="lg"
        py="4"
        px="3"
        bg={props.bg}
        color={props.color}
        borderColor={props.bg}
      >
        <Text fontWeight="medium" mb="2">
          {props.user.email}
        </Text>
        {/* <MenuOptionGroup
          defaultValue="NYS HBITS"
          bg={props.bg}
          color={props.color}
        >
          <MenuItemOption value="NYS HBITS" fontWeight="semibold" rounded="md">
            NYS HBITS
          </MenuItemOption>
          <MenuItemOption
            value="Colorful Dots, LLC"
            fontWeight="semibold"
            rounded="md"
          >
            Colorful Dots, LLC
          </MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider /> */}
        {isAdmin(props.user) && (
          <>
            <MenuItem
              onClick={() => router.push('/dashboard/settings')}
              rounded="md"
            >
              Workspace Settings
            </MenuItem>
            <MenuItem
              onClick={() => router.push('/dashboard/accounts')}
              rounded="md"
            >
              Accounts
            </MenuItem>
          </>
        )}
        <Divider height={0.5} my={2} />
        <MenuItem
          onClick={() => router.push('/dashboard/user/profile')}
          rounded="md"
        >
          My Profile
        </MenuItem>
        <MenuItem
          onClick={() => router.push('/dashboard/settings')}
          rounded="md"
        >
          My Settings
        </MenuItem>
        <Divider height={0.5} my={2} />
        <MenuItem rounded="md" onClick={() => signout('/auth/sign-in')}>
          Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
