import { Box, Button, Flex, LightMode, Stack, Text } from '@chakra-ui/react';
import { InputField } from '@/components/index';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link';
import { lighten, darken } from 'polished';
import { useAuth } from '@/hooks/useAuth';

export const SignUpForm = (props: any) => {
  const { bg, color } = props;
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (formData: any) =>
    signup(formData).then((success: any) => {
      // console.log(success);
      if (success) {
        // add({
        //   id: fuego.auth().currentUser?.uid,
        //   userId: fuego.auth().currentUser?.uid,
        //   artist: 'Drake',
        //   year: '2020',
        // });
        // router.push('/dashboard');
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
          label="First Name"
          type="text"
          placeholder="First Name"
          name="firstName"
          ref={register({ required: true })}
        />
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
          label="Last Name"
          type="text"
          placeholder="Last Name"
          name="lastName"
          ref={register({ required: true })}
        />
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
          label="Company Name"
          type="text"
          placeholder="Company Name"
          name="companyName"
          ref={register({ required: true })}
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
          Existing user? <NextLink href="/auth/sign-in">Sign In</NextLink>
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
            Sign Up
          </Button>
        </LightMode>
      </Flex>
    </form>
  );
};
