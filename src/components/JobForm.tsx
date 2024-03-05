import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
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
  Text,
} from '@chakra-ui/react';
import Select from 'react-select';
import { RichText } from '@/components/RichText';
import NextLink from 'next/link';
import {
  _jobDurationOptions,
  _jobHoursOptions,
  _contractNameOptions,
  _educationData,
  _statesData,
  _jobRegionOptions,
  _jobSalaryFrequencyOptions,
  _monthsOfExperienceOptions,
} from '@/components/index';
import { slugify } from '@/helpers/index';
import { UserDataProps } from '../types';

export interface JobFormProps {
  userData: UserDataProps;
  isEditing: boolean;
  bg: string;
  color: string;
}

export const JobForm: React.FC<any> = ({ userData, isEditing, bg, color }) => {
  const toast = useToast();
  const router = useRouter();

  const { add } = useCollection<any>('careers');
  const { data: jobsData, update } = useDocument<any>(
    `careers/${router.query.id}`,
  );

  const { data: agenciesData } = useCollection<any>('agencies', {
    listen: true,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    watch('jobTitle');
  }, [watch]);

  // effect runs when user state is updated
  useEffect(() => {
    // reset form with user data
    reset(jobsData);
  }, [jobsData, reset]);

  const onSubmit = async (data: any | null) => {
    const dataObj = {
      ...data,
      postedBy:
        userData.firstName + ` ` + userData.lastName.substring(0, 1) + `.`,
      createdAt: new Date().toISOString(),
    };
    // @ts-ignore
    await add(dataObj)
      .then(() => {
        toast({
          title: 'Job Posted!',
          description: "You've successfully posted a new job!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/jobs');
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

  const onUpdate = async (data: any) => {
    const dataObj = {
      ...data,
      postedBy:
        userData.firstName + ` ` + userData.lastName.substring(0, 1) + `.`,
      modifiedAt: new Date().toISOString(),
    };
    // @ts-ignore
    await update(dataObj)
      .then(() => {
        toast({
          title: 'Job Updated!',
          description: "You've successfully updated your job!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/jobs');
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
    <form onSubmit={handleSubmit(isEditing ? onUpdate : onSubmit)}>
      <Box>
        <Heading size="lg" mb="6">
          {isEditing ? 'Editing Job' : 'Add New Job'}
          <Text fontSize="md" mt={2} color="gray.500">
            <NextLink href={`/careers/${jobsData?.jobSlug}`}>
              <a target="_blank" rel="noreferrer">
                {isEditing && jobsData?.jobTitle}
              </a>
            </NextLink>
          </Text>
        </Heading>
      </Box>

      <SimpleGrid columns={[1, 1, 3]} spacing={10} mb={8}>
        <Box>
          <FormControl id="jobTitle">
            <FormLabel>Title</FormLabel>
            <Input
              defaultValue={(isEditing && jobsData?.jobTitle) || ''}
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="jobShortTitle">
            <FormLabel>Short Title</FormLabel>
            <Input
              defaultValue={(isEditing && jobsData?.jobShortTitle) || ''}
              type="text"
              name="jobShortTitle"
              placeholder="Job Short Title"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="jobSlug">
            <FormLabel>Slug (URL)</FormLabel>
            <Input
              defaultValue={(isEditing && jobsData?.jobSlug) || ''}
              type="text"
              name="jobSlug"
              value={watch('jobTitle') && slugify(watch('jobTitle'))}
              placeholder="Job Slug /some-job-title-thing"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 3]} spacing={10} mb={8}>
        <Box>
          <FormControl id="jobContractNumber">
            <FormLabel>Contract Number</FormLabel>
            <Input
              defaultValue={(isEditing && jobsData?.jobContractNumber) || ''}
              type="text"
              name="jobContractNumber"
              placeholder="Job Contract Number"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="jobAgency">
            <FormLabel>Agency Name</FormLabel>
            <Controller
              defaultValue={(isEditing && jobsData?.jobAgency) || ''}
              as={Select}
              name="jobAgency"
              options={agenciesData?.map((agency) => ({
                label: agency.agencyName,
                value: agency.agencyName,
              }))}
              control={control}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="jobContractName">
            <FormLabel>Contract Name</FormLabel>
            <Controller
              defaultValue={(isEditing && jobsData?.jobContractName) || ''}
              as={Select}
              name="jobContractName"
              options={_contractNameOptions}
              control={control}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 3]} spacing={10} mb={8}>
        <Box>
          <FormControl id="jobEducation">
            <FormLabel>Education</FormLabel>
            <Controller
              defaultValue={(isEditing && jobsData?.jobEducation) || ''}
              as={Select}
              name="jobEducation"
              options={_educationData}
              control={control}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="jobMonthsOfExperience">
            <FormLabel>Months Of Experience</FormLabel>
            <Controller
              defaultValue={
                (isEditing && jobsData?.jobMonthsOfExperience) || ''
              }
              as={Select}
              name="jobMonthsOfExperience"
              options={_monthsOfExperienceOptions}
              control={control}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="jobHours">
            <FormLabel>Job Hours</FormLabel>
            <Controller
              defaultValue={(isEditing && jobsData?.jobHours) || ''}
              as={Select}
              name="jobHours"
              options={_jobHoursOptions}
              control={control}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="jobDuration">
            <FormLabel>Job Duration</FormLabel>
            <Controller
              defaultValue={(isEditing && jobsData?.jobDuration) || ''}
              as={Select}
              name="jobDuration"
              options={_jobDurationOptions}
              control={control}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="jobSalary">
            <FormLabel>Job Salary (USD)</FormLabel>
            <Input
              defaultValue={(isEditing && jobsData?.jobSalary) || ''}
              type="text"
              name="jobSalary"
              placeholder="Job Salary"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="jobSalaryFrequency">
            <FormLabel>Job Salary Frequency</FormLabel>
            <Controller
              defaultValue={(isEditing && jobsData?.jobSalaryFrequency) || ''}
              as={Select}
              name="jobSalaryFrequency"
              options={_jobSalaryFrequencyOptions}
              control={control}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 2]} spacing={10} mb={8}>
        <Box>
          <FormControl id="jobStreetAddress">
            <FormLabel>Street Address</FormLabel>
            <Input
              defaultValue={(isEditing && jobsData?.jobStreetAddress) || ''}
              type="text"
              name="jobStreetAddress"
              placeholder="Job Street Address"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="jobStreetAddress2">
            <FormLabel>Street Address 2</FormLabel>
            <Input
              defaultValue={(isEditing && jobsData?.jobStreetAddress2) || ''}
              type="text"
              name="jobStreetAddress2"
              placeholder="Job Street Address 2"
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 4]} spacing={10} mb={8}>
        <Box>
          <FormControl id="jobCity">
            <FormLabel>City</FormLabel>
            <Input
              defaultValue={(isEditing && jobsData?.jobCity) || ''}
              type="text"
              name="jobCity"
              placeholder="Job City"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="jobState">
            <FormLabel>State</FormLabel>
            <Controller
              defaultValue={(isEditing && jobsData?.jobState) || ''}
              as={Select}
              name="jobState"
              options={_statesData}
              control={control}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="jobZipCode">
            <FormLabel>Zipcode</FormLabel>
            <Input
              defaultValue={(isEditing && jobsData?.jobZipCode) || ''}
              type="text"
              name="jobZipCode"
              placeholder="Job ZipCode"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="jobRegion">
            <FormLabel>Region</FormLabel>
            <Controller
              defaultValue={(isEditing && jobsData?.jobRegion) || ''}
              as={Select}
              name="jobRegion"
              options={_jobRegionOptions}
              control={control}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 3]} spacing={10} mb={8}>
        <Box>
          <FormControl id="jobStartDate">
            <FormLabel>Start Date</FormLabel>
            <Input
              defaultValue={(isEditing && jobsData?.jobStartDate) || ''}
              type="date"
              name="jobStartDate"
              placeholder="Job Start Date"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="jobEndDate">
            <FormLabel>End Date</FormLabel>
            <Input
              defaultValue={(isEditing && jobsData?.jobEndDate) || ''}
              type="date"
              name="jobEndDate"
              placeholder="Job End Date"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="jobPostDate">
            <FormLabel>Post Date</FormLabel>
            <Input
              defaultValue={(isEditing && jobsData?.jobPostDate) || ''}
              type="date"
              name="jobPostDate"
              placeholder="Job Post Date"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <Box my={4}>
        <FormControl id="jobDescription">
          <FormLabel>Job Description</FormLabel>
          <Controller
            control={control}
            name="jobDescription"
            defaultValue=""
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                isAdmin
                onChange={(jobDescription: any) => onChange(jobDescription)}
                value={value || ''}
              />
            )}
          />
        </FormControl>
      </Box>
      <Box my={4}>
        <FormControl id="jobMMandatoryQualifications">
          <FormLabel>Job Mandatory Qualifications</FormLabel>
          <Controller
            control={control}
            name="jobMMandatoryQualifications"
            defaultValue=""
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                isAdmin
                onChange={(jobMMandatoryQualifications: any) =>
                  onChange(jobMMandatoryQualifications)
                }
                value={value || ''}
              />
            )}
          />
        </FormControl>
      </Box>
      <Box my={4}>
        <FormControl id="jobDesiredQualifications">
          <FormLabel>Job Desired Qualifications</FormLabel>
          <Controller
            control={control}
            name="jobDesiredQualifications"
            defaultValue=""
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                isAdmin
                onChange={(jobDesiredQualifications: any) =>
                  onChange(jobDesiredQualifications)
                }
                value={value || ''}
              />
            )}
          />
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="jobAdditionalInformation">
          <FormLabel>Job Additional Information</FormLabel>
          <Controller
            control={control}
            name="jobAdditionalInformation"
            defaultValue=""
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                isAdmin
                onChange={(jobAdditionalInformation: any) =>
                  onChange(jobAdditionalInformation)
                }
                value={value || ''}
              />
            )}
          />
        </FormControl>
      </Box>

      {/* <Box my={4}>
        <FormControl id="agencyDescription">
          <FormLabel>Agency Description</FormLabel>
          <Controller
            control={control}
            name="agencyDescription"
            defaultValue=""
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                isAdmin
                onChange={(agencyDescription: any) =>
                  onChange(agencyDescription)
                }
                value={value || ''}
              />
            )}
          />
        </FormControl>
      </Box> */}

      <Box my={4}>
        <FormControl id="jobIsRemote">
          <FormLabel>Remote?</FormLabel>
          <Controller
            defaultValue={(isEditing && jobsData?.jobIsRemote) || ''}
            as={
              <RadioGroup name="jobIsRemote">
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="green" value="Yes">
                    Yes
                  </Radio>
                  <Radio colorScheme="red" value="No">
                    No
                  </Radio>
                </Stack>
              </RadioGroup>
            }
            name="jobIsRemote"
            control={control}
          />
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="jobIsVisa">
          <FormLabel>Visa Sponsorship?</FormLabel>
          <Controller
            defaultValue={(isEditing && jobsData?.jobIsVisa) || ''}
            as={
              <RadioGroup name="jobIsVisa">
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="green" value="Yes">
                    Yes
                  </Radio>
                  <Radio colorScheme="red" value="No">
                    No
                  </Radio>
                </Stack>
              </RadioGroup>
            }
            name="jobIsVisa"
            control={control}
          />
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="visibility">
          <FormLabel>Job Status (visibility)</FormLabel>
          <Controller
            defaultValue={(isEditing && jobsData?.visibility) || ''}
            as={
              <RadioGroup name="visibility">
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="green" value="Public">
                    Public (open)
                  </Radio>
                  <Radio colorScheme="red" value="Private">
                    Private (closed / filled)
                  </Radio>
                  <Radio colorScheme="gray" value="Draft">
                    Draft (Not Public)
                  </Radio>
                </Stack>
              </RadioGroup>
            }
            name="visibility"
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
          onClick={() => router.push('/dashboard/jobs')}
        >
          Cancel
        </Button>
        <Button
          mt={4}
          bg={bg}
          color={color}
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          loadingText="Submitting..."
        >
          {isEditing ? 'Update' : 'Post'} Job
        </Button>
      </Box>
    </form>
  );
};
