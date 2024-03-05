import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDocument } from '@nandorojo/swr-firestore';
import { useRouter } from 'next/router';
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

export interface InboxFormProps {
  bg: string;
  color: string;
}

export const InboxForm: React.FC<InboxFormProps> = ({ bg, color }) => {
  const toast = useToast();
  const router = useRouter();

  const { update, data: ContactData } = useDocument<any>(
    `contacts/${router.query.id}`,
  );

  const { register, handleSubmit, control, formState, reset } = useForm({
    mode: 'onChange',
    defaultValues: ContactData,
  });

  const onSubmit = (data: any) => {
    const dataObj = {
      ...data,
      modifiedAt: new Date().toISOString(),
    };

    // @ts-ignore
    update(dataObj)
      .then(() => {
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

  useEffect(() => {
    reset(ContactData);
  }, [ContactData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box p={8} rounded={'md'}>
        <Heading size="sm" mb="4">
          Personal Information
        </Heading>

        <SimpleGrid columns={[1, 1, 1, 2, 3]} spacing={10}>
          <Box>
            <FormControl id="firstName">
              <FormLabel>First Name *</FormLabel>
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                ref={register}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="middleName">
              <FormLabel>Middle Name</FormLabel>
              <Input type="text" name="middleName" placeholder="Middle Name" />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="lastName">
              <FormLabel>Last Name *</FormLabel>
              <Input
                type="text"
                name="lastName"
                placeholder="Last Name"
                ref={register}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="phoneNumber">
              <FormLabel>Phone Number *</FormLabel>
              <Input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                ref={register}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="emailAddress">
              <FormLabel>Email Address *</FormLabel>
              <Input
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                ref={register}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="website">
              <FormLabel>Website</FormLabel>
              <Input
                type="url"
                name="website"
                placeholder="https://company.com"
                ref={register()}
              />
            </FormControl>
          </Box>
        </SimpleGrid>
      </Box>

      <Box p={8} rounded={'md'}>
        <Box my={4}>
          <FormControl id="message">
            <FormLabel>Message *</FormLabel>
            <Textarea
              name="message"
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
                <RadioGroup>
                  <Stack spacing={5} direction="row">
                    <Radio size="md" value="Yes">
                      Yes
                    </Radio>
                    <Radio size="md" value="No">
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
            type="submit"
            isLoading={formState.isSubmitting}
            disabled={true}
          >
            Update
          </Button>
        </Box>
      </Box>
    </form>
  );
};
