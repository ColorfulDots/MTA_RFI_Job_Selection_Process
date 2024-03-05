import { Button, Flex, LightMode, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';
import { InputField } from '@/components/index';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

export const ForgotPasswordForm = () => {
  const { signin } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: any) =>
    signin(data).then((success: any) => {
      // console.log(success);
      if (success) {
        router.push('/dashboard');
      } else {
        console.log(errors);
      }
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={10}>
        <InputField
          label="Email"
          type="email"
          placeholder="Email"
          name="email"
          bg="white"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
      </Stack>
      <Flex
        // spacing="4"
        direction={{ base: 'column-reverse', md: 'row' }}
        mt="6"
        align="center"
        justify="space-between"
      >
        <Text fontSize="sm" fontWeight="semibold">
          <NextLink href="/auth/sign-up">Sign Up</NextLink> |{' '}
          <NextLink href="/auth/sign-in">Sign In</NextLink>
        </Text>
        <LightMode>
          <Button
            mb={{ base: '4', md: '0' }}
            w={{ base: 'full', md: 'auto' }}
            type="submit"
            size="lg"
            fontSize="md"
            fontWeight="bold"
            outline="none"
          >
            Reset Password
          </Button>
        </LightMode>
      </Flex>
    </form>
  );
};
