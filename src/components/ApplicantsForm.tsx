import { useEffect } from 'react';
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
} from '@chakra-ui/react';
import Select from 'react-select';
import { RichText } from '@/components/RichText';
import {
  _jobDurationOptions,
  _jobHoursOptions,
  _contractNameOptions,
  _educationData,
  _statesData,
  _jobRegionOptions,
  _jobSalaryFrequencyOptions,
} from '@/components/index';

export interface ApplicantsFormProps {
  isEditing: boolean;
  bg: string;
  color: string;
}

export const ApplicantsForm: React.FC<ApplicantsFormProps> = ({
  isEditing,
  bg,
  color,
}) => {
  const toast = useToast();
  const router = useRouter();

  const { add } = useCollection<any>('applicants');
  const { data: applicantsData, update } = useDocument<any>(
    `applicants/${router.query.id}`,
  );

  const { register, handleSubmit, control, reset } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    reset(applicantsData);
  }, [applicantsData, reset]);

  const onSubmit = (data: any) =>
    // @ts-ignore
    add(data)
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

  const onUpdate = (data: any) =>
    // @ts-ignore
    update(data)
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

  return (
    <form onSubmit={handleSubmit(isEditing ? onUpdate : onSubmit)}>
      <Box>
        <Heading size="lg" mb="6">
          {isEditing ? 'Editing Applicant' : 'Add New Applicant'}
        </Heading>
      </Box>
      <SimpleGrid columns={[1, 1, 3]} spacing={10} mb={8}>
        <Box>
          <FormControl id="firstName">
            <FormLabel>First Name</FormLabel>
            <Input
              defaultValue={(isEditing && applicantsData?.firstName) || ''}
              type="text"
              name="firstName"
              placeholder="First Name"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="jobShortTitle">
            <FormLabel>Short Title</FormLabel>
            <Input
              defaultValue={(isEditing && applicantsData?.jobShortTitle) || ''}
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
              defaultValue={(isEditing && applicantsData?.jobSlug) || ''}
              type="text"
              name="jobSlug"
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
              defaultValue={
                (isEditing && applicantsData?.jobContractNumber) || ''
              }
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
            <Input
              defaultValue={(isEditing && applicantsData?.jobAgency) || ''}
              type="text"
              name="jobAgency"
              placeholder="Agency Name"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="jobContractName">
            <FormLabel>Contract Name</FormLabel>
            <Controller
              defaultValue={
                (isEditing && applicantsData?.jobContractName) || ''
              }
              as={Select}
              name="jobContractName"
              options={_contractNameOptions}
              control={control}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 5]} spacing={10} mb={8}>
        <Box>
          <FormControl id="jobEducation">
            <FormLabel>Education</FormLabel>
            <Controller
              defaultValue={(isEditing && applicantsData?.jobEducation) || ''}
              as={Select}
              name="jobEducation"
              options={_educationData}
              control={control}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="jobHours">
            <FormLabel>Job Hours</FormLabel>
            <Controller
              defaultValue={(isEditing && applicantsData?.jobHours) || ''}
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
              defaultValue={(isEditing && applicantsData?.jobDuration) || ''}
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
              defaultValue={(isEditing && applicantsData?.jobSalary) || ''}
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
              defaultValue={
                (isEditing && applicantsData?.jobSalaryFrequency) || ''
              }
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
              defaultValue={
                (isEditing && applicantsData?.jobStreetAddress) || ''
              }
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
              defaultValue={
                (isEditing && applicantsData?.jobStreetAddress2) || ''
              }
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
              defaultValue={(isEditing && applicantsData?.jobCity) || ''}
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
              defaultValue={(isEditing && applicantsData?.jobState) || ''}
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
              defaultValue={(isEditing && applicantsData?.jobZipCode) || ''}
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
              defaultValue={(isEditing && applicantsData?.jobRegion) || ''}
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
              defaultValue={(isEditing && applicantsData?.jobStartDate) || ''}
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
              defaultValue={(isEditing && applicantsData?.jobEndDate) || ''}
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
              defaultValue={(isEditing && applicantsData?.jobPostDate) || ''}
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
                onChange={(jobAdditionalInformation: any) =>
                  onChange(jobAdditionalInformation)
                }
                value={value || ''}
              />
            )}
          />
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="agencyDescription">
          <FormLabel>Agency Description</FormLabel>
          <Controller
            control={control}
            name="agencyDescription"
            defaultValue=""
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                onChange={(agencyDescription: any) =>
                  onChange(agencyDescription)
                }
                value={value || ''}
              />
            )}
          />
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="jobIsRemote">
          <FormLabel>Remote?</FormLabel>
          <Controller
            defaultValue={(isEditing && applicantsData?.jobIsRemote) || ''}
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
            defaultValue={(isEditing && applicantsData?.jobIsVisa) || ''}
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
        <FormControl id="jobStatus">
          <FormLabel>Job Status</FormLabel>
          <Controller
            defaultValue={(isEditing && applicantsData?.jobStatus) || ''}
            as={
              <RadioGroup name="jobStatus">
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="green" value="open">
                    Open
                  </Radio>
                  <Radio colorScheme="red" value="closed">
                    Closed
                  </Radio>
                </Stack>
              </RadioGroup>
            }
            name="jobStatus"
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
        <Button mt={4} bg={bg} color={color} type="submit">
          {isEditing ? 'Update' : 'Post'} Job
        </Button>
      </Box>
    </form>
  );
};
