import { Box, Button, Flex, LightMode, Stack, Text } from '@chakra-ui/react';
import { InputField } from '@/components/index';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link';
import { lighten, darken } from 'polished';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

export const SigninForm = (props: any) => {
  const { bg, color } = props;
  const { signin } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onBlur',
  });

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
      <Stack spacing="8">
        <InputField
          bg={bg}
          color={color}
          borderColor={bg}
          _focus={{
            outline: 'none',
            bg: lighten(0.05, bg),
            boxShadow: 'outline',
            borderColor: bg,
          }}
          label="Email"
          type="email"
          placeholder="Email"
          name="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        <Box>
          <InputField
            bg={bg}
            color={color}
            borderColor={bg}
            colorScheme={bg}
            _focus={{
              outline: 'none',
              bg: lighten(0.05, bg),
              boxShadow: 'outline',
              borderColor: bg,
            }}
            label="Password"
            type="password"
            placeholder="Password"
            name="password"
            ref={register({ required: true, maxLength: 100 })}
          />
          <Box
            display="inline-block"
            color={color}
            fontWeight="semibold"
            fontSize="sm"
            mt="3"
          >
            <NextLink href="/auth/forgot-password">Forgot password?</NextLink>
          </Box>
        </Box>
      </Stack>
      <Flex
        // spacing="4"
        direction={{ base: 'column-reverse', md: 'row' }}
        mt="6"
        align="center"
        justify="space-between"
      >
        <Text color={color} fontSize="sm" fontWeight="semibold">
          New user? <NextLink href="/auth/sign-up">Create account</NextLink>
        </Text>
        <LightMode>
          <Button
            mb={{ base: '4', md: '0' }}
            w={{ base: 'full', md: 'auto' }}
            type="submit"
            color={color}
            bg={darken(0.05, bg)}
            size="lg"
            fontSize="md"
            fontWeight="bold"
            outline="none"
            _hover={{
              outline: 'none',
              bg: lighten(0.05, bg),
              color,
              boxShadow: 'outline',
              borderColor: bg,
            }}
            isLoading={isSubmitting}
            loadingText="Submitting..."
          >
            Sign In
          </Button>
        </LightMode>
      </Flex>
    </form>
  );
};
