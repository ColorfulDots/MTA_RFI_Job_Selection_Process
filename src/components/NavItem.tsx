import { Box, HStack } from '@chakra-ui/react';
import * as React from 'react';
import { BsCaretRightFill } from 'react-icons/bs';
import NextLink from 'next/link';

export const NavItem = (props: any) => {
  const { active, subtle, icon, children, label, endElement } = props;
  return (
    <NextLink href={props.href}>
      <HStack
        w="full"
        px="3"
        py="2"
        cursor="pointer"
        userSelect="none"
        rounded="md"
        transition="all 0.2s"
        bg={active ? props.bg : undefined}
        _hover={{ bg: props.bg }}
        _active={{ bg: props.bg }}
      >
        <Box fontSize="lg" color={active ? 'currentcolor' : props.color}>
          {icon}
        </Box>
        <Box
          flex="1"
          fontWeight="inherit"
          color={subtle ? props.color : undefined}
        >
          {label}
        </Box>
        {endElement && !children && <Box>{endElement}</Box>}
        {children && <Box fontSize="xs" flexShrink={0} as={BsCaretRightFill} />}
      </HStack>
    </NextLink>
  );
};
