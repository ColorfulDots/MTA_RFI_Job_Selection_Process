import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCollection } from '@nandorojo/swr-firestore';
import { useRouter } from 'next/router';
import { lighten, darken } from 'polished';
import firebase from 'firebase/app';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  useToast,
  Box,
  Radio,
  RadioGroup,
  Stack,
  SimpleGrid,
  Heading,
  Text,
  Divider,
} from '@chakra-ui/react';
import Select from 'react-select';
import { RichText } from '@/components/RichText';
import { RiErrorWarningLine } from 'react-icons/ri';
import { _budgetData } from '@/components/index';

export interface StartServicesFormProps {
  bg: string;
  color: string;
  servicesData: any;
}

export const StartServicesForm: React.FC<StartServicesFormProps> = ({
  bg,
  color,
  servicesData,
}) => {
  const toast = useToast();
  const router = useRouter();

  const { add } = useCollection<any>('leads');

  const { register, handleSubmit, errors, control, watch, formState } = useForm(
    {
      mode: 'onBlur',
    },
  );

  const [fileUrl, setFileUrl] = useState(null);

  // IMAGE UPLOAD
  const onFileChange = async (e: any) => {
    const metadata = {
      cacheControl: 'public,max-age=31536000',
    };
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref(`leads/${router.query.slug}`);
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file, metadata);
    // @ts-ignore
    setFileUrl(await fileRef.getDownloadURL());
  };

  const onSubmit = (data: any) => {
    const dataObj = {
      ...data,
      attachment: fileUrl,
      service: `Service: ${servicesData?.name}`,
      createdAt: new Date().toISOString(),
    };
    // @ts-ignore
    add(dataObj)
      .then(() => {
        // toast({
        //   title: 'Thank you!',
        //   description: 'Our team will follow up with you shortly!',
        //   status: 'success',
        //   duration: 5000,
        //   isClosable: true,
        // });
        router.push(`/services/${router.query.slug}/start/success`);
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
    watch('file');
    watch('attachment');
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box bg={darken(0.035, bg.toString())} p={8} rounded={'md'}>
        <Box>
          <Heading size="lg" mb="6">
            {servicesData?.name}
          </Heading>
          {/* <Text>
            Please complete the form to the best of your ability with accurate
            and informative information about you, your background, and
            experiences. This application should take you between 10-20 minutes.
          </Text> */}
        </Box>

        <Heading size="sm" mb="4">
          Contact Information
        </Heading>

        <SimpleGrid columns={[1, 1, 1, 1, 3]} spacing={10} mb={8}>
          <Box>
            <FormControl id="firstName" isInvalid={errors['firstName']}>
              <FormLabel htmlFor="firstName">First Name *</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="text"
                name="firstName"
                placeholder="First Name"
                ref={register({ required: 'Required' })}
              />
              <FormErrorMessage color={color} colorScheme="whiteAlpha">
                <RiErrorWarningLine color={color} size={20} />{' '}
                <Text ml={2}>
                  {errors['firstName'] && errors['firstName'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl id="lastName" isInvalid={errors['lastName']}>
              <FormLabel htmlFor="lastName">Last Name *</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="text"
                name="lastName"
                placeholder="Last Name"
                ref={register({ required: 'Required' })}
              />
              <FormErrorMessage color={color} colorScheme="whiteAlpha">
                <RiErrorWarningLine color={color} size={20} />{' '}
                <Text ml={2}>
                  {errors['lastName'] && errors['lastName'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl id="title" isInvalid={errors['title']}>
              <FormLabel htmlFor="title">Your Title</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="text"
                name="title"
                placeholder="Your Title"
                ref={register()}
              />
              <FormErrorMessage color={color} colorScheme="whiteAlpha">
                <RiErrorWarningLine color={color} size={20} />{' '}
                <Text ml={2}>{errors['title'] && errors['title'].message}</Text>
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl id="emailAddress" isInvalid={errors['emailAddress']}>
              <FormLabel htmlFor="emailAddress">Email Address *</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                ref={register({ required: 'Required' })}
              />
              <FormErrorMessage color={color} colorScheme="whiteAlpha">
                <RiErrorWarningLine color={color} size={20} />{' '}
                <Text ml={2}>
                  {errors['emailAddress'] && errors['emailAddress'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>

          <Box>
            <FormControl id="phoneNumber" isInvalid={errors['phoneNumber']}>
              <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                ref={register()}
              />
              <FormErrorMessage color={color} colorScheme="whiteAlpha">
                <RiErrorWarningLine color={color} size={20} />{' '}
                <Text ml={2}>
                  {errors['phoneNumber'] && errors['phoneNumber'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>

          <Box>
            <FormControl id="website" isInvalid={errors['website']}>
              <FormLabel htmlFor="website">Company Website</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="url"
                name="website"
                placeholder="https://yourcompany.com"
                ref={register()}
              />
              <FormErrorMessage color={color} colorScheme="whiteAlpha">
                <RiErrorWarningLine color={color} size={20} />{' '}
                <Text ml={2}>
                  {errors['website'] && errors['website'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>
        </SimpleGrid>
      </Box>

      <Box bg={darken(0.035, bg.toString())} p={8} rounded={'md'} mt={8}>
        <Heading size="sm" mb="4">
          Project Information
        </Heading>

        <SimpleGrid columns={[1, 1, 1, 1, 2]} spacing={10} mb={8}>
          <Box>
            <FormControl id="projectName" isInvalid={errors['projectName']}>
              <FormLabel htmlFor="projectName">Project Name *</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="text"
                name="projectName"
                placeholder="Project Name"
                ref={register({ required: 'Required' })}
              />
              <FormErrorMessage color={color} colorScheme="whiteAlpha">
                <RiErrorWarningLine color={color} size={20} />{' '}
                <Text ml={2}>
                  {errors['projectName'] && errors['projectName'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>

          <Box>
            <FormControl
              id="projectWebsite"
              isInvalid={errors['projectWebsite']}
            >
              <FormLabel htmlFor="projectWebsite">Project Website</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="url"
                name="projectWebsite"
                placeholder="https://projectname.com"
                ref={register()}
              />
              <FormErrorMessage color={color} colorScheme="whiteAlpha">
                <RiErrorWarningLine color={color} size={20} />{' '}
                <Text ml={2}>
                  {errors['projectWebsite'] && errors['projectWebsite'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>

          <Box>
            <FormControl
              id="targetCompletionDate"
              isInvalid={errors['targetCompletionDate']}
            >
              <FormLabel htmlFor="targetCompletionDate">
                When is your target project completion date? *
              </FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="date"
                name="targetCompletionDate"
                ref={register({ required: 'Required' })}
              />
              <FormErrorMessage color={color} colorScheme="whiteAlpha">
                <RiErrorWarningLine color={color} size={20} />{' '}
                <Text ml={2}>
                  {errors['targetCompletionDate'] &&
                    errors['targetCompletionDate'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>

          <Box>
            <FormControl id="budget">
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

        <SimpleGrid columns={[1, 1, 1, 1, 3]} spacing={10} mb={8}>
          <Box my={4}>
            <FormControl
              id="technologyRoadmap"
              isInvalid={errors['technologyRoadmap']}
            >
              <FormLabel htmlFor="technologyRoadmap">
                Do you have a technology road map?
              </FormLabel>
              <Controller
                as={
                  <RadioGroup name="technologyRoadmap">
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
                rules={{ required: 'Required' }}
                name="technologyRoadmap"
                control={control}
                defaultValue=""
              />
              <FormErrorMessage color={color} colorScheme="whiteAlpha">
                <RiErrorWarningLine color={color} size={20} />{' '}
                <Text ml={2}>
                  {errors['technologyRoadmap'] &&
                    errors['technologyRoadmap'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box my={4}>
            <FormControl
              id="establishedCompany"
              isInvalid={errors['establishedCompany']}
            >
              <FormLabel htmlFor="establishedCompany">
                Is this a new or existing business or project?
              </FormLabel>
              <Controller
                as={
                  <RadioGroup name="establishedCompany">
                    <Stack spacing={5} direction="row">
                      <Radio
                        size="md"
                        colorScheme="whiteAlpha"
                        bg={darken(0.2, bg.toString())}
                        color={color}
                        borderColor={color}
                        value="New"
                      >
                        New
                      </Radio>
                      <Radio
                        size="md"
                        colorScheme="whiteAlpha"
                        bg={darken(0.2, bg.toString())}
                        color={color}
                        borderColor={color}
                        value="Established"
                      >
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
              <FormErrorMessage color={color} colorScheme="whiteAlpha">
                <RiErrorWarningLine color={color} size={20} />{' '}
                <Text ml={2}>
                  {errors['establishedCompany'] &&
                    errors['establishedCompany'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>

          <Box my={4}>
            <FormControl
              id="existingTechTeam"
              isInvalid={errors['existingTechTeam']}
            >
              <FormLabel htmlFor="existingTechTeam">
                Do you have an existing technology team?
              </FormLabel>
              <Controller
                as={
                  <RadioGroup name="existingTechTeam">
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
                rules={{ required: 'Required' }}
                name="existingTechTeam"
                control={control}
                defaultValue=""
              />
              <FormErrorMessage color={color} colorScheme="whiteAlpha">
                <RiErrorWarningLine color={color} size={20} />{' '}
                <Text ml={2}>
                  {errors['existingTechTeam'] &&
                    errors['existingTechTeam'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>

          {/* <Box my={4}>
            <FormControl id="desiredEmploymentTypes">
              <FormLabel>What are your preferred employment types?</FormLabel>
              <Controller
                as={
                  <CheckboxGroup size="md" colorScheme="whiteAlpha">
                    <Stack>
                      <Checkbox
                        value="Full-Time"
                        color={color}
                        borderColor={color}
                      >
                        Full-Time
                      </Checkbox>
                      <Checkbox
                        value="Part-Time"
                        color={color}
                        borderColor={color}
                      >
                        Part-Time
                      </Checkbox>
                      <Checkbox
                        value="Seasonal/Temporary"
                        color={color}
                        borderColor={color}
                      >
                        Seasonal/Temporary
                      </Checkbox>
                      <Checkbox
                        value="Contract"
                        color={color}
                        borderColor={color}
                      >
                        Contract
                      </Checkbox>
                    </Stack>
                  </CheckboxGroup>
                }
                name="desiredEmploymentTypes"
                control={control}
              />

            </FormControl>
          </Box> */}
        </SimpleGrid>
      </Box>

      <Box bg={darken(0.035, bg.toString())} p={8} rounded={'md'} mt={8}>
        {/* <Box>
          <Heading size="lg" mb="6">
            Project Details
          </Heading>
        </Box> */}

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
                  style={{
                    background: 'white',
                    borderRadius: 10,
                    color: 'gray.900',
                  }}
                  onChange={(projectScope: any) => onChange(projectScope)}
                  value={value || ''}
                />
              )}
            />
            <FormErrorMessage color={color} colorScheme="whiteAlpha">
              <RiErrorWarningLine color={color} size={20} />{' '}
              <Text ml={2}>
                {errors['targetCompletionDate'] &&
                  errors['targetCompletionDate'].message}
              </Text>
            </FormErrorMessage>
            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}{' '}
          </FormControl>
        </Box>

        <Box my={4}>
          <FormControl id="attachment">
            <FormLabel>
              Attachments (NDA, TECH SPEC SHEET, PRODUCT ROAD-MAP, ETC)
            </FormLabel>

            <Controller
              control={control}
              name="attachment"
              defaultValue=""
              render={({}) => <Input onChange={onFileChange} type="file" />}
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
              name="newsletter"
              control={control}
              defaultValue=""
            />

            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
          </FormControl>
        </Box>

        <Box my={4}>
          {/* <Button
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
            onClick={() => router.push('/careers')}
          >
            Cancel
          </Button> */}
          <Divider
            aria-hidden
            my="4"
            borderWidth="1px"
            borderStyle="dashed"
            borderColor={color}
          />
          <Text>
            What happens next? Once you submit your project, our team will
            review your details and discuss if we can take on your project
            internally or refer you to one of our technology partners.
          </Text>
          <Divider
            aria-hidden
            my="4"
            borderWidth="1px"
            borderStyle="dashed"
            borderColor={color}
          />
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
            Submit Project
          </Button>
        </Box>
      </Box>
    </form>
  );
};
