import { useForm, Controller } from 'react-hook-form';
import { useCollection } from '@nandorojo/swr-firestore';
import { useRouter } from 'next/router';
import { lighten, darken } from 'polished';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Box,
  Radio,
  RadioGroup,
  Stack,
  SimpleGrid,
  Heading,
  Textarea,
} from '@chakra-ui/react';

export interface ContactFormProps {
  bg: string;
  color: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ bg, color }) => {
  const toast = useToast();
  const router = useRouter();

  const { add } = useCollection<any>('contacts');

  const { register, handleSubmit, control, formState } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data: any) => {
    const dataObj = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    // @ts-ignore
    add(dataObj)
      .then(() => {
        // toast({
        //   title: 'Thank you for contacting us!',
        //   description: 'Our team will follow up with you shortly!',
        //   status: 'success',
        //   duration: 5000,
        //   isClosable: true,
        // });
        router.push('/contact/success');
      })
      .catch((errors) => {
        toast({
          title: 'Error!',
          description: errors,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box bg={darken(0.035, bg.toString())} p={8} rounded={'md'}>
        <Box>
          {/* <Heading size="lg" mb="6">
            Contact Us
          </Heading> */}
          {/* <Text>
            Please complete the form to the best of your ability with accurate
            and informative information about you, your background, and
            experiences. This application should take you between 10-20 minutes.
          </Text> */}
        </Box>

        <Heading size="sm" mb="4">
          Personal Information
        </Heading>

        <SimpleGrid columns={[1, 1, 1, 2, 3]} spacing={10}>
          <Box>
            <FormControl id="firstName">
              <FormLabel>First Name *</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="text"
                name="firstName"
                placeholder="First Name"
                ref={register({ required: true })}
              />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
          </Box>
          <Box>
            <FormControl id="middleName">
              <FormLabel>Middle Name</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="text"
                name="middleName"
                placeholder="Middle Name"
              />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
          </Box>
          <Box>
            <FormControl id="lastName">
              <FormLabel>Last Name *</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="text"
                name="lastName"
                placeholder="Last Name"
                ref={register({ required: true })}
              />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
          </Box>
          <Box>
            <FormControl id="phoneNumber">
              <FormLabel>Phone Number *</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                ref={register({ required: true })}
              />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
          </Box>
          <Box>
            <FormControl id="emailAddress">
              <FormLabel>Email Address *</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                ref={register({ required: true })}
              />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
          </Box>
          <Box>
            <FormControl id="website">
              <FormLabel>Website</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="url"
                name="website"
                placeholder="https://company.com"
                ref={register()}
              />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
          </Box>
        </SimpleGrid>
      </Box>

      <Box bg={darken(0.035, bg.toString())} p={8} rounded={'md'}>
        <Box my={4}>
          <FormControl id="message">
            <FormLabel>Message *</FormLabel>
            <Textarea
              name="message"
              _placeholder={{ color: 'gray.600' }}
              bg="white"
              color="gray.900"
              h="3xs"
              placeholder="Please use this area to write a message to us regarding general contact information"
              ref={register({ required: true })}
            />

            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
          </FormControl>
        </Box>

        <Box my={4}>
          <FormControl id="newsletter">
            <FormLabel>
              Would you also like to join our monthly newsletter?
            </FormLabel>
            <Controller
              as={
                <RadioGroup name="newsletter">
                  <Stack spacing={5} direction="row">
                    <Radio
                      size="md"
                      colorScheme="whiteAlpha"
                      bg={darken(0.2, bg.toString())}
                      color={color}
                      borderColor={color}
                      value="Yes"
                    >
                      Yes
                    </Radio>
                    <Radio
                      size="md"
                      colorScheme="whiteAlpha"
                      bg={darken(0.2, bg.toString())}
                      color={color}
                      borderColor={color}
                      value="No"
                    >
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              }
              defaultValue=""
              name="newsletter"
              control={control}
            />

            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
          </FormControl>
        </Box>

        <Box my={4}>
          <Button
            mt={4}
            colorScheme="whiteAlpha"
            color={color}
            borderColor={bg}
            borderWidth={0.5}
            borderStyle="dotted"
            boxShadow="base"
            rounded={{ md: 'lg' }}
            size="lg"
            fontSize="md"
            fontWeight="bold"
            outline="none"
            _hover={{
              outline: 'none',
              bg: lighten(0.05, bg),
              color: color,
              boxShadow: 'outline',
              borderColor: bg,
            }}
            type="submit"
            isLoading={formState.isSubmitting}
          >
            Contact Us
          </Button>
        </Box>
      </Box>
    </form>
  );
};
