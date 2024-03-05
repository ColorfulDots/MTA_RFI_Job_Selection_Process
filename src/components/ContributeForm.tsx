import * as React from 'react';
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
} from '@chakra-ui/react';
import { RichText } from '@/components/RichText';

export interface ContributeFormProps {
  bg: string;
  color: string;
  acronymId: string;
}

export const ContributeForm: React.FC<ContributeFormProps> = ({
  bg,
  color,
  acronymId,
}) => {
  const toast = useToast();
  const router = useRouter();

  const { add } = useCollection<any>('contributions');

  const { register, handleSubmit, control, formState } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data: any) => {
    const dataObj = {
      ...data,
      acronymId: acronymId,
      createdAt: new Date().toISOString(),
    };

    // @ts-ignore
    add(dataObj)
      .then(() => {
        // toast({
        //   title: 'Your contribution has been submitted!',
        //   description: 'We appreciate your suggestions!',
        //   status: 'success',
        //   duration: 5000,
        //   isClosable: true,
        // });
        router.push(
          `/government-acronyms/${router.query.slug}/contribution/success`,
        );
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
        {/* <Box>
          <Heading size="lg" mb="6">
            Contribute
          </Heading>
          <Text>
            Please help us make this page better by submitting your suggested
            edits and revisions.
          </Text>
        </Box> */}

        <Heading size="sm" my={4}>
          Personal Information
        </Heading>

        <SimpleGrid columns={[1, 1, 2, 2, 2]} spacing={10} mb={4}>
          <Box>
            <FormControl id="name">
              <FormLabel>Your Name *</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="text"
                name="name"
                placeholder="Your Name"
                ref={register({ required: true })}
              />
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
            </FormControl>
          </Box>
        </SimpleGrid>

        <Box>
          <FormControl id="sourceLink">
            <FormLabel>Source / Reference Link</FormLabel>
            <Input
              _placeholder={{ color: 'gray.600' }}
              bg="white"
              color="gray.900"
              type="url"
              name="sourceLink"
              placeholder="e.g. https://government-source.com/terms"
              ref={register()}
            />
          </FormControl>
        </Box>

        <Box my={4}>
          <FormControl id="contribution">
            <FormLabel>Contribution *</FormLabel>
            <Controller
              control={control}
              name="contribution"
              defaultValue=""
              rules={{ required: true }}
              render={({ onChange, value }: { onChange: any; value: any }) => (
                <RichText
                  placeholder="Write your contribution &amp; suggested edits here"
                  style={{
                    background: 'white',
                    borderRadius: 10,
                    color: 'black',
                  }}
                  onChange={(contribution: any) => onChange(contribution)}
                  value={value || ''}
                />
              )}
            />
          </FormControl>
        </Box>

        <Box my={4}>
          <FormControl id="openToContact">
            <FormLabel>May we contact you for additional questions?</FormLabel>
            <Controller
              defaultValue=""
              as={
                <RadioGroup name="openToContact">
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
              name="openToContact"
              control={control}
            />
          </FormControl>
        </Box>

        <Box my={4}>
          <Button
            mr={2}
            mt={4}
            bg="gray.300"
            color="gray.800"
            colorScheme="whiteAlpha"
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
            onClick={() => router.push('/government-acronyms')}
          >
            Cancel
          </Button>
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
            loadingText="Submitting..."
          >
            Submit Contribution
          </Button>
        </Box>
      </Box>
    </form>
  );
};
