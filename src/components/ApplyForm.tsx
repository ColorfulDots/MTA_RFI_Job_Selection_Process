import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
  Radio,
  RadioGroup,
  Stack,
  SimpleGrid,
  Heading,
  Checkbox,
  CheckboxGroup,
  InputGroup,
  InputLeftAddon,
  Flex,
  Spacer,
  FormErrorMessage,
} from '@chakra-ui/react';
import Select from 'react-select';
import { RichText } from '@/components/RichText';
import { RiErrorWarningLine } from 'react-icons/ri';
import {
  _educationData,
  _statesData,
  _countriesData,
} from '@/components/index';

export interface ApplyFormProps {
  color: string;
  jobId: string;
  applicantCount: number;
}

export const ApplyForm: React.FC<ApplyFormProps> = ({
  applicantCount,
  jobId,
  color,
}) => {
  const router = useRouter();

  const { add } = useCollection<any>('applicants');
  const { data: jobsData } = useDocument<any>(`applicants/${router.query.id}`);

  const { register, handleSubmit, control, reset, watch, formState, errors } =
    useForm({
      mode: 'onBlur',
    });

  const [fileUrl, setFileUrl] = useState(null);

  // IMAGE UPLOAD
  const onFileChange = async (e: any) => {
    const metadata = {
      cacheControl: 'public,max-age=31536000',
    };
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref(`applicants/jobId/${jobId}`);
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file, metadata);
    // @ts-ignore
    setFileUrl(await fileRef.getDownloadURL());
  };

  useEffect(() => {
    watch('file');
    watch('resume');
  }, [reset, watch]);

  // effect runs when user state is updated
  useEffect(() => {
    // reset form with user data
    reset(jobsData);
  }, [jobsData, reset]);

  const onSubmit = (data: any) => {
    const dataObj = {
      ...data,
      resume: fileUrl,
      jobId: jobId,
      createdAt: new Date().toISOString(),
    };
    // @ts-ignore
    add(dataObj)
      .then(() => {
        router.push(`/careers/${router.query.jobSlug}/apply/success`);
      })
      .catch((errors) => {
        console.log('error', errors);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box bg="brand.50" p={8} rounded="md">
        <Flex>
          <Box>
            <Heading size="lg" mb="6">
              Apply
            </Heading>
          </Box>
          <Spacer />
          <Box>
            <Text color="gray.500">Total Applicants ({applicantCount})</Text>
          </Box>
        </Flex>

        <Heading size="sm" mb="4">
          Personal Information
        </Heading>

        <SimpleGrid columns={[1, 1, 2, 2, 3]} spacing={10} mb={8}>
          <Box>
            <FormControl id="firstName" isInvalid={errors['firstName']}>
              <FormLabel>First Name *</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="brand.0"
                color="brand.900"
                type="text"
                name="firstName"
                placeholder="First Name"
                ref={register({ required: 'Required' })}
              />
              <FormErrorMessage colorScheme="whiteAlpha">
                <RiErrorWarningLine size={20} />{' '}
                <Text ml={2}>
                  {errors['firstName'] && errors['firstName'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl id="middleName">
              <FormLabel>Middle Name</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="brand.0"
                color="brand.900"
                type="text"
                name="middleName"
                placeholder="Middle Name"
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="lastName" isInvalid={errors['lastName']}>
              <FormLabel>Last Name *</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="brand.0"
                color="brand.900"
                type="text"
                name="lastName"
                placeholder="Last Name"
                ref={register({ required: 'Required' })}
              />
              <FormErrorMessage colorScheme="whiteAlpha">
                <RiErrorWarningLine size={20} />{' '}
                <Text ml={2}>
                  {errors['lastName'] && errors['lastName'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl id="phoneNumber" isInvalid={errors['phoneNumber']}>
              <FormLabel>Phone Number *</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="brand.0"
                color="brand.900"
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                ref={register({ required: 'Required' })}
              />
              <FormErrorMessage colorScheme="whiteAlpha">
                <RiErrorWarningLine size={20} />{' '}
                <Text ml={2}>
                  {errors['phoneNumber'] && errors['phoneNumber'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl id="emailAddress" isInvalid={errors['emailAddress']}>
              <FormLabel>Email Address *</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="brand.0"
                color="brand.900"
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                ref={register({ required: 'Required' })}
              />
              <FormErrorMessage colorScheme="whiteAlpha">
                <RiErrorWarningLine size={20} />{' '}
                <Text ml={2}>
                  {errors['emailAddress'] && errors['emailAddress'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl id="website">
              <FormLabel>Personal Website</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="brand.0"
                color="brand.900"
                type="url"
                name="website"
                placeholder="https://yourpersonalsite.com"
              />
            </FormControl>
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 1, 2, 2]} spacing={10} mb={8}>
          <Box>
            <FormControl id="streetAddress" isInvalid={errors['streetAddress']}>
              <FormLabel>Street Address *</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="brand.0"
                color="brand.900"
                type="text"
                name="jobStreetAddress"
                placeholder="Street Address"
                ref={register({ required: 'Required' })}
              />
              <FormErrorMessage colorScheme="whiteAlpha">
                <RiErrorWarningLine size={20} />{' '}
                <Text ml={2}>
                  {errors['streetAddress'] && errors['streetAddress'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl id="streetAddress2">
              <FormLabel>Street Address 2</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="brand.0"
                color="brand.900"
                type="text"
                name="streetAddress2"
                placeholder="Street Address 2"
              />
            </FormControl>
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 1, 2, 4]} spacing={10} mb={8}>
          <Box>
            <FormControl id="city" isInvalid={errors['city']}>
              <FormLabel>City *</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="brand.0"
                color="brand.900"
                type="text"
                name="city"
                placeholder="Job City"
                ref={register({ required: 'Required' })}
              />
              <FormErrorMessage colorScheme="whiteAlpha">
                <RiErrorWarningLine size={20} />{' '}
                <Text ml={2}>{errors['city'] && errors['city'].message}</Text>
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl id="state" isInvalid={errors['state']}>
              <FormLabel>State *</FormLabel>
              <Controller
                as={Select}
                name="state"
                options={_statesData}
                defaultValue=""
                control={control}
                rules={{ required: 'Required' }}
              />
              <FormErrorMessage colorScheme="whiteAlpha">
                <RiErrorWarningLine size={20} />{' '}
                <Text ml={2}>{errors['state'] && errors['state'].message}</Text>
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl id="zipCode" isInvalid={errors['zipCode']}>
              <FormLabel>Zipcode *</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="brand.0"
                color="brand.900"
                type="text"
                name="zipCode"
                placeholder="Zipcode"
                ref={register({ required: 'Required' })}
              />
              <FormErrorMessage colorScheme="whiteAlpha">
                <RiErrorWarningLine size={20} />{' '}
                <Text ml={2}>
                  {errors['zipCode'] && errors['zipCode'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl id="country" isInvalid={errors['country']}>
              <FormLabel>Country *</FormLabel>
              <Controller
                defaultValue=""
                as={Select}
                name="country"
                options={_countriesData}
                rules={{ required: 'Required' }}
                control={control}
              />
              <FormErrorMessage colorScheme="whiteAlpha">
                <RiErrorWarningLine size={20} />{' '}
                <Text ml={2}>
                  {errors['country'] && errors['country'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 2, 2, 2]} spacing={10} mb={8}>
          <Box my={4}>
            <FormControl id="isVeteran" isInvalid={errors['isVeteran']}>
              <FormLabel>Are you a Veteran? *</FormLabel>
              <Controller
                defaultValue=""
                as={
                  <RadioGroup name="isVeteran">
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
                name="isVeteran"
                control={control}
                rules={{ required: 'Required' }}
              />
              <FormErrorMessage colorScheme="whiteAlpha">
                <RiErrorWarningLine size={20} />{' '}
                <Text ml={2}>
                  {errors['isVeteran'] && errors['isVeteran'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box my={4}>
            <FormControl id="isUSEligible" isInvalid={errors['isUSEligible']}>
              <FormLabel>
                Are you legally eligible to work in the US? *
              </FormLabel>
              <Controller
                defaultValue=""
                as={
                  <RadioGroup name="isUSEligible">
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
                name="isUSEligible"
                control={control}
                rules={{ required: 'Required' }}
              />
              <FormErrorMessage colorScheme="whiteAlpha">
                <RiErrorWarningLine size={20} />{' '}
                <Text ml={2}>
                  {errors['isUSEligible'] && errors['isUSEligible'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box my={4}>
            <FormControl
              id="authorizeBackgroundCheck"
              isInvalid={errors['authorizeBackgroundCheck']}
            >
              <FormLabel>
                Are you willing to submit to a background check? *
              </FormLabel>
              <Controller
                defaultValue=""
                as={
                  <RadioGroup name="authorizeBackgroundCheck">
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
                name="authorizeBackgroundCheck"
                control={control}
                rules={{ required: 'Required' }}
              />
              <FormErrorMessage colorScheme="whiteAlpha">
                <RiErrorWarningLine size={20} />{' '}
                <Text ml={2}>
                  {errors['authorizeBackgroundCheck'] &&
                    errors['authorizeBackgroundCheck'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box my={4}>
            <FormControl id="desiredEmploymentTypes">
              <FormLabel>What are your preferred employment types? *</FormLabel>
              <Controller
                defaultValue=""
                as={
                  <CheckboxGroup size="md" colorScheme="whiteAlpha">
                    <Stack>
                      <Checkbox
                        value="Full-Time"
                        color={color}
                        borderColor={color}
                        iconColor="green.400"
                      >
                        Full-Time
                      </Checkbox>
                      <Checkbox
                        value="Part-Time"
                        color={color}
                        borderColor={color}
                        iconColor="green.400"
                      >
                        Part-Time
                      </Checkbox>
                      <Checkbox
                        value="Seasonal/Temporary"
                        color={color}
                        borderColor={color}
                        iconColor="green.400"
                      >
                        Seasonal/Temporary
                      </Checkbox>
                      <Checkbox
                        value="Contract"
                        color={color}
                        borderColor={color}
                        iconColor="green.400"
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
          </Box>
        </SimpleGrid>
      </Box>

      <Box bg="brand.50" p={8} rounded="md" my={8}>
        <Heading size="sm" mb="4">
          Employment Information
        </Heading>

        <SimpleGrid columns={[1, 1, 1, 1, 2]} spacing={10} mb={8}>
          <Box>
            <FormControl id="degreeType" isInvalid={errors['degreeType']}>
              <FormLabel>
                What is your highest level of education completed? *
              </FormLabel>
              <Controller
                defaultValue=""
                as={Select}
                name="degreeType"
                options={_educationData}
                control={control}
                rules={{ required: 'Required' }}
              />
              <FormErrorMessage colorScheme="whiteAlpha">
                <RiErrorWarningLine size={20} />{' '}
                <Text ml={2}>
                  {errors['degreeType'] && errors['degreeType'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>

          <Box>
            <FormControl
              id="desiredAnnualSalary"
              isInvalid={errors['desiredAnnualSalary']}
            >
              <FormLabel>Desired Annual Salary (USD) *</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="brand.0"
                color="brand.900"
                type="text"
                name="desiredAnnualSalary"
                placeholder="$67,000"
                ref={register({ required: 'Required' })}
              />
              <FormErrorMessage colorScheme="whiteAlpha">
                <RiErrorWarningLine size={20} />{' '}
                <Text ml={2}>
                  {errors['desiredAnnualSalary'] &&
                    errors['desiredAnnualSalary'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 2]} spacing={10} mb={8}>
          <Box>
            <FormControl
              id="idealStartDate"
              isInvalid={errors['idealStartDate']}
            >
              <FormLabel>When is your ideal start date? *</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="brand.0"
                color="brand.900"
                type="date"
                name="idealStartDate"
                ref={register({ required: 'Required' })}
              />
              <FormErrorMessage colorScheme="whiteAlpha">
                <RiErrorWarningLine size={20} />{' '}
                <Text ml={2}>
                  {errors['idealStartDate'] && errors['idealStartDate'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box my={4}>
            <FormControl
              id="visaSponsorship"
              isInvalid={errors['visaSponsorship']}
            >
              <FormLabel>Do you require Visa sponsorship? *</FormLabel>
              <Controller
                defaultValue=""
                as={
                  <RadioGroup name="visaSponsorship">
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
                name="visaSponsorship"
                control={control}
                rules={{ required: 'Required' }}
              />
              <FormErrorMessage colorScheme="whiteAlpha">
                <RiErrorWarningLine size={20} />{' '}
                <Text ml={2}>
                  {errors['visaSponsorship'] &&
                    errors['visaSponsorship'].message}
                </Text>
              </FormErrorMessage>
            </FormControl>
          </Box>
        </SimpleGrid>
      </Box>

      <Box bg="brand.50" p={8} rounded="md" my={8}>
        <Heading size="sm" mb="4">
          Social Profiles (optional)
        </Heading>
        <Box my={4}>
          <FormLabel>LinkedIn Username</FormLabel>
          <Stack spacing={4}>
            <InputGroup>
              <InputLeftAddon>https://linkedin.com/in/</InputLeftAddon>
              <Input
                placeholder="username"
                _placeholder={{ color: 'gray.600' }}
                bg="brand.0"
                color="brand.900"
                type="text"
                ref={register()}
                name="linkedIn"
              />
            </InputGroup>
          </Stack>
        </Box>

        <Box my={4}>
          <FormLabel>Github Username</FormLabel>
          <Stack spacing={4}>
            <InputGroup>
              <InputLeftAddon>https://github.com/</InputLeftAddon>
              <Input
                placeholder="username"
                _placeholder={{ color: 'gray.600' }}
                bg="brand.0"
                color="brand.900"
                type="text"
                ref={register()}
                name="github"
              />
            </InputGroup>
          </Stack>
        </Box>
      </Box>

      <Box bg="brand.50" p={8} rounded="md" my={8}>
        <Box>
          <Heading size="lg" mb="6">
            Cover Letter &amp; Resume
          </Heading>
        </Box>

        <Box>
          <FormControl id="resumeLink">
            <FormLabel>Resume Link (optional)</FormLabel>
            <Input
              _placeholder={{ color: 'gray.600' }}
              bg="brand.0"
              color="brand.900"
              type="url"
              name="resumeLink"
              placeholder="https://myresume.com/pdf"
              ref={register()}
            />
          </FormControl>
        </Box>

        <Box my={4}>
          <FormControl id="coverLetter">
            <FormLabel>Cover Letter (optional)</FormLabel>
            <Controller
              control={control}
              name="coverLetter"
              defaultValue=""
              render={({ onChange, value }: { onChange: any; value: any }) => (
                <RichText
                  placeholder="Write your cover letter here"
                  style={{
                    background: 'white',
                    borderRadius: 10,
                    color: 'black',
                  }}
                  onChange={(coverLetter: any) => onChange(coverLetter)}
                  value={value || ''}
                />
              )}
            />
          </FormControl>
        </Box>

        <Box my={4}>
          <FormControl id="resumeText">
            <FormLabel>Resume Text Format (optional)</FormLabel>
            <Controller
              control={control}
              name="resumeText"
              defaultValue=""
              render={({ onChange, value }: { onChange: any; value: any }) => (
                <RichText
                  placeholder="Create or copy and paste your resume here"
                  style={{
                    background: 'white',
                    borderRadius: 10,
                    overflow: 'hidden',
                    border: 'none',
                    color: 'black',
                  }}
                  onChange={(resumeText: any) => onChange(resumeText)}
                  value={value || ''}
                />
              )}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="resume">
            <FormLabel>Resume Upload (optional)</FormLabel>

            <Controller
              control={control}
              name="resume"
              defaultValue=""
              render={() => <Input onChange={onFileChange} type="file" />}
            />
          </FormControl>
        </Box>

        <Box my={4} alignItems="right">
          {/* <Button
            mr={2}
            mt={4}
            colorScheme="whiteAlpha"
            color="brand.900"
            borderWidth={0.5}
            borderStyle="dotted"
            boxShadow="base"
            rounded={{ md: 'lg' }}
            w={{ base: 'full', sm: 'auto' }}
            size="lg"
            fontSize="md"
            fontWeight="bold"
            outline="none"
            onClick={() => router.push('/careers')}
          >
            Cancel
          </Button> */}
          <Button
            mt={4}
            colorScheme="whiteAlpha"
            color="brand.900"
            borderWidth={0.5}
            borderStyle="dotted"
            boxShadow="base"
            rounded={{ md: 'lg' }}
            w={{ base: 'full', sm: 'auto' }}
            size="lg"
            fontSize="md"
            fontWeight="bold"
            outline="none"
            type="submit"
            isLoading={formState.isSubmitting}
            loadingText="Submitting..."
          >
            Submit Application
          </Button>
        </Box>
      </Box>
    </form>
  );
};
