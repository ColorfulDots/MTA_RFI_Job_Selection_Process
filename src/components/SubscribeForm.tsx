import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import * as React from 'react';
import { lighten } from 'polished';

export const SubscribeForm = (props: any) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      // add submit logic
    }}
  >
    <Box mt="8" display={{ md: 'flex' }} maxW="xl">
      <FormControl id="email" marginEnd="-1px">
        <FormLabel srOnly>Enter your email</FormLabel>
        <Input
          roundedEnd={{ md: '0' }}
          mb={{ base: '2', lg: '0' }}
          flex="1"
          bg={mode('white', 'gray.900')}
          placeholder="Your email"
        />
      </FormControl>
      <Button
        w={{ base: 'full', md: 'auto' }}
        fontSize="sm"
        px="8"
        roundedStart={{ md: '0' }}
        colorScheme="whiteAlpha"
        color={props.color}
        borderColor={props.bg}
        borderWidth={0.5}
        borderStyle="dotted"
        boxShadow="base"
        outline="none"
        _hover={{
          outline: 'none',
          bg: lighten(0.05, props.bg),
          color: props.color,
          boxShadow: 'outline',
          borderColor: props.bg,
        }}
        textTransform="uppercase"
        fontWeight="bold"
        letterSpacing="wide"
      >
        Subscribe
      </Button>
    </Box>
  </form>
);
