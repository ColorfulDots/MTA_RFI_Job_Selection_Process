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
} from '@chakra-ui/react';
import Select from 'react-select';
import { RichText } from '@/components/RichText';
import { _budgetData } from '@/components/index';

export interface LeadsFormProps {
  bg: string;
  color: string;
}

export const LeadsForm: React.FC<LeadsFormProps> = ({ bg, color }) => {
  const toast = useToast();
  const router = useRouter();

  const { update, data: ServicesData } = useDocument<any>(
    `leads/${router.query.id}`,
  );

  const { register, handleSubmit, control, formState, reset } = useForm({
    mode: 'onBlur',
    defaultValues: ServicesData,
  });

  const onSubmit = (data: any) => {
    const dataObj = {
      ...data,
      modifiedAt: new Date().toISOString(),
    };
    // @ts-ignore
    update(dataObj)
      .then(() => {
        toast({
          title: 'Thank you!',
          description: 'Our team will follow up with you shortly!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        // router.push(`/services/${router.query.slug}/start/success`);
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
    reset(ServicesData);
  }, [ServicesData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box p={8} rounded={'md'}>
        <Box>
          <Heading size="lg" mb="6">
            {ServicesData?.name}
          </Heading>
        </Box>

        <Heading size="sm" mb="4">
          Contact Information
        </Heading>

        <SimpleGrid columns={[1, 1, 1, 1, 3]} spacing={10}>
          <Box>
            <FormControl>
              <FormLabel htmlFor="firstName">First Name *</FormLabel>
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                ref={register({ required: true })}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel htmlFor="lastName">Last Name *</FormLabel>
              <Input
                type="text"
                name="lastName"
                placeholder="Last Name"
                ref={register({ required: true })}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel htmlFor="title">Your Title</FormLabel>
              <Input
                type="text"
                name="title"
                placeholder="Your Title"
                ref={register({ required: false })}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel htmlFor="emailAddress">Email Address *</FormLabel>
              <Input
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                ref={register({ required: true })}
              />
            </FormControl>
          </Box>

          <Box>
            <FormControl>
              <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
              <Input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                ref={register({ required: false })}
              />
            </FormControl>
          </Box>

          <Box>
            <FormControl>
              <FormLabel htmlFor="website">Company Website</FormLabel>
              <Input
                type="url"
                name="website"
                placeholder="https://yourcompany.com"
                ref={register({ required: false })}
              />
            </FormControl>
          </Box>
        </SimpleGrid>
      </Box>

      <Box p={8} rounded={'md'} mt={8}>
        <Heading size="sm" mb="4">
          Project Information
        </Heading>

        <SimpleGrid columns={[1, 1, 1, 1, 2]} spacing={10} mb={8}>
          <Box>
            <FormControl>
              <FormLabel htmlFor="projectName">Project Name *</FormLabel>
              <Input
                type="text"
                name="projectName"
                placeholder="Project Name"
                ref={register({ required: true })}
              />
            </FormControl>
          </Box>

          <Box>
            <FormControl>
              <FormLabel htmlFor="projectWebsite">Project Website</FormLabel>
              <Input
                type="url"
                name="projectWebsite"
                placeholder="https://projectname.com"
                ref={register({ required: false })}
              />
            </FormControl>
          </Box>

          <Box>
            <FormControl>
              <FormLabel htmlFor="targetCompletionDate">
                When is your target project completion date? *
              </FormLabel>
              <Input
                type="date"
                name="targetCompletionDate"
                ref={register({ required: true })}
              />
            </FormControl>
          </Box>

          <Box>
            <FormControl>
              <FormLabel>What is your estimated project budget? *</FormLabel>
              <Controller
                as={Select}
                name="budget"
                options={_budgetData}
                defaultValue=""
                control={control}
              />
            </FormControl>
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 1, 1, 3]} spacing={10}>
          <Box my={4}>
            <FormControl>
              <FormLabel htmlFor="technologyRoadmap">
                Do you have a technology road map?
              </FormLabel>
              <Controller
                as={
                  <RadioGroup name="technologyRoadmap">
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
                rules={{ required: 'Required' }}
                name="technologyRoadmap"
                control={control}
                defaultValue=""
              />
            </FormControl>
          </Box>
          <Box my={4}>
            <FormControl>
              <FormLabel htmlFor="establishedCompany">
                Is this a new or existing business or project?
              </FormLabel>
              <Controller
                as={
                  <RadioGroup name="establishedCompany">
                    <Stack spacing={5} direction="row">
                      <Radio size="md" value="New">
                        New
                      </Radio>
                      <Radio size="md" value="Established">
                        Established
                      </Radio>
                    </Stack>
                  </RadioGroup>
                }
                rules={{ required: 'Required' }}
                name="establishedCompany"
                control={control}
                defaultValue=""
              />
            </FormControl>
          </Box>

          <Box my={4}>
            <FormControl>
              <FormLabel htmlFor="existingTechTeam">
                Do you have an existing technology team?
              </FormLabel>
              <Controller
                as={
                  <RadioGroup name="existingTechTeam">
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
                rules={{ required: 'Required' }}
                name="existingTechTeam"
                control={control}
                defaultValue=""
              />
            </FormControl>
          </Box>
        </SimpleGrid>
      </Box>

      <Box p={8} rounded={'md'}>
        <Box mb={4}>
          <FormControl id="projectScope">
            <FormLabel>Project Scope</FormLabel>
            <Controller
              control={control}
              name="projectScope"
              defaultValue=""
              render={({ onChange, value }: { onChange: any; value: any }) => (
                <RichText
                  placeholder="Write as much or as little as you would like about your project. We will follow up and schedule time to go over the bigger picture after we receive your initial information."
                  onChange={(projectScope: any) => onChange(projectScope)}
                  value={value || ''}
                />
              )}
            />
          </FormControl>
        </Box>

        <Box my={4}>
          <FormControl id="newsletter">
            <FormLabel>May we send you our newsletter?</FormLabel>
            <Controller
              as={
                <RadioGroup name="newsletter">
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
              name="newsletter"
              control={control}
              defaultValue=""
            />
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
            loadingText="Submitting..."
            disabled={true}
          >
            Update Leads
          </Button>
        </Box>
      </Box>
    </form>
  );
};
