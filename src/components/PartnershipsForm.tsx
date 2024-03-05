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
  _statesData,
  _countriesData,
  _companySizeOptions,
  _annualRevenueOptions,
  _industryOptions,
} from '@/components/index';

export interface PartnershipsFormProps {
  isEditing: boolean;
  bg: string;
  color: string;
}

export const PartnershipsForm: React.FC<PartnershipsFormProps> = ({
  isEditing,
  bg,
  color,
}) => {
  const toast = useToast();
  const router = useRouter();

  const { add } = useCollection<any>('partnerships');
  const { data: partnershipsData, update } = useDocument<any>(
    `partnerships/${router.query.id}`,
  );

  const { register, handleSubmit, control, reset, formState } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    reset(partnershipsData);
  }, [partnershipsData, reset]);

  const onSubmit = (data: any) => {
    const dataObj = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    // @ts-ignore
    add(dataObj)
      .then(() => {
        toast({
          title: 'Partnership Posted!',
          description: "You've successfully posted a new partner!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/partnerships');
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

  const onUpdate = (data: any) => {
    const dataObj = {
      ...data,
      modifiedAt: new Date().toISOString(),
    };

    // @ts-ignore
    update(dataObj)
      .then(() => {
        toast({
          title: 'Partnership Updated!',
          description: "You've successfully updated a partnership!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/partnerships');
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
          {isEditing ? 'Editing Partner' : 'Add New Partner'}
          <Text fontSize="md" mt={2} color="gray.500">
            <NextLink href={`/partnerships/${partnershipsData?.jobSlug}`}>
              <a target="_blank" rel="noreferrer">
                {isEditing && partnershipsData?.jobTitle}
              </a>
            </NextLink>
          </Text>
        </Heading>
      </Box>

      <SimpleGrid columns={[1, 1, 3]} spacing={10} mb={8}>
        <Box>
          <FormControl id="companyName">
            <FormLabel>Company Name</FormLabel>
            <Input
              defaultValue={(isEditing && partnershipsData?.companyName) || ''}
              type="text"
              name="companyName"
              placeholder="Company Name"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="dbaName">
            <FormLabel>DBA Company Name</FormLabel>
            <Input
              defaultValue={(isEditing && partnershipsData?.dbaName) || ''}
              type="text"
              name="dbaName"
              placeholder="DBA Company Name"
              ref={register}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="companyWebsite">
            <FormLabel>Company Website</FormLabel>
            <Input
              defaultValue={
                (isEditing && partnershipsData?.companyWebsite) || ''
              }
              type="url"
              name="companyWebsite"
              placeholder="https://yourcompany.com"
              ref={register}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 3]} spacing={10} mb={8}>
        <Box>
          <FormControl id="firstName">
            <FormLabel>First Name</FormLabel>
            <Input
              defaultValue={(isEditing && partnershipsData?.firstName) || ''}
              type="text"
              name="firstName"
              placeholder="First Name"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="middleName">
            <FormLabel>Middle Name</FormLabel>
            <Input
              defaultValue={(isEditing && partnershipsData?.middleName) || ''}
              type="text"
              name="middleName"
              placeholder="Middle Name"
              ref={register}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="lastName">
            <FormLabel>Last Name</FormLabel>
            <Input
              defaultValue={(isEditing && partnershipsData?.lastName) || ''}
              type="text"
              name="lastName"
              placeholder="Last Name"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 2]} spacing={10} mb={8}>
        <Box>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              defaultValue={(isEditing && partnershipsData?.email) || ''}
              type="email"
              name="email"
              placeholder="Email"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="phoneNumber">
            <FormLabel>Phone Number</FormLabel>
            <Input
              defaultValue={(isEditing && partnershipsData?.phoneNumber) || ''}
              type="tel"
              name="phoneNumber"
              placeholder="1-800-888-9876"
              ref={register()}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="companySize">
            <FormLabel>Company Size</FormLabel>
            <Controller
              defaultValue={(isEditing && partnershipsData?.companySize) || ''}
              as={Select}
              name="companySize"
              options={_companySizeOptions}
              control={control}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="annualRevenue">
            <FormLabel>Annual Revenue</FormLabel>
            <Controller
              defaultValue={
                (isEditing && partnershipsData?.annualRevenue) || ''
              }
              as={Select}
              name="annualRevenue"
              options={_annualRevenueOptions}
              control={control}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="industry">
            <FormLabel>Industry</FormLabel>
            <Controller
              defaultValue={(isEditing && partnershipsData?.industry) || ''}
              as={Select}
              name="industry"
              isMulti
              options={_industryOptions}
              control={control}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      {/* <SimpleGrid columns={[1, 1, 5]} spacing={10} mb={8}>
        <Box>
          <FormControl id="jobEducation">
            <FormLabel>Education</FormLabel>
            <Controller
              defaultValue={
                (isEditing && partnershipsData?.jobEducation) || ''
              }
              as={Select}
              name="jobEducation"
              options={_educationData}
              control={control}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="jobHours">
            <FormLabel>Partnership Hours</FormLabel>
            <Controller
              defaultValue={
                (isEditing && partnershipsData?.jobHours) || ''
              }
              as={Select}
              name="jobHours"
              options={_jobHoursOptions}
              control={control}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="jobDuration">
            <FormLabel>Partnership Duration</FormLabel>
            <Controller
              defaultValue={
                (isEditing && partnershipsData?.jobDuration) || ''
              }
              as={Select}
              name="jobDuration"
              options={_jobDurationOptions}
              control={control}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="jobSalary">
            <FormLabel>Partnership Salary (USD)</FormLabel>
            <Input
              defaultValue={
                (isEditing && partnershipsData?.jobSalary) || ''
              }
              type="text"
              name="jobSalary"
              placeholder="Partnership Salary"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="jobSalaryFrequency">
            <FormLabel>Partnership Salary Frequency</FormLabel>
            <Controller
              defaultValue={
                (isEditing && partnershipsData?.jobSalaryFrequency) || ''
              }
              as={Select}
              name="jobSalaryFrequency"
              options={_jobSalaryFrequencyOptions}
              control={control}
            />
          </FormControl>
        </Box>
      </SimpleGrid> */}

      <SimpleGrid columns={[1, 1, 2]} spacing={10} mb={8}>
        <Box>
          <FormControl id="streetAddress">
            <FormLabel>Street Address</FormLabel>
            <Input
              defaultValue={
                (isEditing && partnershipsData?.streetAddress) || ''
              }
              type="text"
              name="streetAddress"
              placeholder="Street Address"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="streetAddress2">
            <FormLabel>Street Address 2</FormLabel>
            <Input
              defaultValue={
                (isEditing && partnershipsData?.streetAddress2) || ''
              }
              type="text"
              name="streetAddress2"
              placeholder="Street Address 2"
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 1, 2, 2]} spacing={10} mb={8}>
        <Box>
          <FormControl id="city">
            <FormLabel>City</FormLabel>
            <Input
              defaultValue={(isEditing && partnershipsData?.city) || ''}
              type="text"
              name="city"
              placeholder="City"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="state">
            <FormLabel>State</FormLabel>
            <Controller
              defaultValue={(isEditing && partnershipsData?.state) || ''}
              as={Select}
              name="state"
              options={_statesData}
              control={control}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="zipcode">
            <FormLabel>Zipcode</FormLabel>
            <Input
              defaultValue={(isEditing && partnershipsData?.zipcode) || ''}
              type="text"
              name="zipcode"
              placeholder="ZipCode"
              ref={register()}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="country">
            <FormLabel>Country</FormLabel>
            <Controller
              defaultValue={(isEditing && partnershipsData?.country) || ''}
              as={Select}
              name="country"
              options={_countriesData}
              control={control}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <Box my={4}>
        <FormControl id="description">
          <FormLabel>Partnership Description</FormLabel>
          <Controller
            control={control}
            name="description"
            defaultValue=""
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                isAdmin
                onChange={(description: any) => onChange(description)}
                value={value || ''}
              />
            )}
          />
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="capabilities">
          <FormLabel>Partnership Capabilities</FormLabel>
          <Controller
            control={control}
            name="capabilities"
            defaultValue=""
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                isAdmin
                onChange={(capabilities: any) => onChange(capabilities)}
                value={value || ''}
              />
            )}
          />
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="internalNotes">
          <FormLabel>Partnership Internal Notes</FormLabel>
          <Controller
            control={control}
            name="internalNotes"
            defaultValue=""
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                isAdmin
                onChange={(internalNotes: any) => onChange(internalNotes)}
                value={value || ''}
              />
            )}
          />
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="companyStatus">
          <FormLabel>Company Status</FormLabel>
          <Controller
            defaultValue={(isEditing && partnershipsData?.companyStatus) || ''}
            as={
              <RadioGroup name="companyStatus">
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="gray" value="Public">
                    Public
                  </Radio>
                  <Radio colorScheme="gray" value="Private">
                    Private
                  </Radio>
                </Stack>
              </RadioGroup>
            }
            name="companyStatus"
            control={control}
          />
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="visibility">
          <FormLabel>Visibility Status</FormLabel>
          <Controller
            defaultValue={(isEditing && partnershipsData?.visibility) || ''}
            as={
              <RadioGroup name="visibility">
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="green" value="Public">
                    Public
                  </Radio>
                  <Radio colorScheme="red" value="Private">
                    Private
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
          onClick={() => router.push('/dashboard/partnerships')}
        >
          Cancel
        </Button>
        <Button
          mt={4}
          bg={bg}
          color={color}
          type="submit"
          isLoading={formState.isSubmitting}
          loadingText="Submitting..."
        >
          {isEditing ? 'Update' : 'Post'} Partnership
        </Button>
      </Box>
    </form>
  );
};
