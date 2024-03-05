import { Box } from '@chakra-ui/react';
import { UserDataProps } from '../types';
import { NavContent } from './NavContent';

export interface NavBarProps {
  user: UserDataProps;
}

export const Navbar: React.FC<NavBarProps> = ({ user }) => {
  return (
    <Box as="header" position="relative" zIndex="10">
      <Box as="nav" aria-label="Main navigation" maxW="full" mx="auto">
        <NavContent.Mobile display={{ base: 'flex', lg: 'none' }} user={user} />
        <NavContent.Desktop
          display={{ base: 'none', lg: 'flex' }}
          p={5}
          user={user}
        />
      </Box>
    </Box>
  );
};
