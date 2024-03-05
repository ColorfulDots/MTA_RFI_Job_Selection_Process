import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
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
import Select from 'react-select/creatable';
import { RichText } from '@/components/RichText';
import { slugify } from '@/helpers/index';
import { _statesData, _jobRegionOptions } from '@/components/index';
import { UserDataProps } from '../types';

export interface AgencyFormProps {
  userData: UserDataProps;
  isEditing: boolean;
  bg: string;
  color: string;
}

export const AgencyForm: React.FC<AgencyFormProps> = ({
  userData,
  isEditing,
  bg,
  color,
}) => {
  const toast = useToast();
  const router = useRouter();

  const { add } = useCollection<any>('agencies');
  const { data: agenciesData, update } = useDocument<any>(
    `agencies/${router.query.id}`,
  );

  const { register, handleSubmit, control, reset, watch, formState } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    watch('agencyName');
  }, [watch]);

  // effect runs when user state is updated
  useEffect(() => {
    // reset form with user data
    reset(agenciesData);
  }, [agenciesData, reset]);

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
          title: 'Agency Added!',
          description: "You've successfully added a new client!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/agencies');
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
          title: 'Agency Updated!',
          description: "You've successfully updated your client!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/agencies');
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
          {isEditing ? 'Editing Agency' : 'Add New Agency'}
          <Text fontSize="md" mt={2} color="gray.500">
            <NextLink
              href={`/agencies/new-york/government/${agenciesData?.slug}`}
            >
              <a target="_blank" rel="noreferrer">
                {isEditing && agenciesData?.agencyName}
              </a>
            </NextLink>
          </Text>
        </Heading>
      </Box>

      <SimpleGrid columns={[1, 1, 3]} spacing={10} mb={8}>
        <Box>
          <FormControl id="agencyName">
            <FormLabel>Agency Name</FormLabel>
            <Input
              defaultValue={isEditing && agenciesData?.agencyName}
              type="text"
              name="agencyName"
              placeholder="Agency Name"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="agencyAcronym">
            <FormLabel>Agency Acronym</FormLabel>
            <Input
              defaultValue={isEditing && agenciesData?.agencyAcronym}
              type="text"
              name="agencyAcronym"
              placeholder="Agency Acronym"
              ref={register()}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="slug">
            <FormLabel>Slug (URL)</FormLabel>
            <Input
              // defaultValue={(isEditing && agenciesData?.jobSlug) || ''}
              type="text"
              name="slug"
              onChange={() => {
                console.log('asdasd');
              }}
              value={
                (watch('agencyName') && slugify(watch('agencyName'))) || ''
              }
              placeholder=" /some-job-title-thing"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="website">
            <FormLabel>Agency Website</FormLabel>
            <Input
              defaultValue={isEditing && agenciesData?.website}
              type="text"
              name="website"
              placeholder="https://kywrd.com"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 2]} spacing={10} mb={8}>
        <Box>
          <FormControl id="emailAddress">
            <FormLabel>Email Address</FormLabel>
            <Input
              defaultValue={(isEditing && agenciesData?.emailAddress) || ''}
              type="text"
              name="emailAddress"
              placeholder="Email Address"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="phoneNumber">
            <FormLabel>Phone Number</FormLabel>
            <Input
              defaultValue={(isEditing && agenciesData?.phoneNumber) || ''}
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              ref={register}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 2]} spacing={10} mb={8}>
        <Box>
          <FormControl id="streetAddress">
            <FormLabel>Street Address *</FormLabel>
            <Input
              defaultValue={(isEditing && agenciesData?.streetAddress) || ''}
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
              defaultValue={(isEditing && agenciesData?.streetAddress2) || ''}
              type="text"
              name="streetAddress2"
              placeholder="Street Address 2"
              ref={register}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 4]} spacing={10} mb={8}>
        <Box>
          <FormControl id="city">
            <FormLabel>City</FormLabel>
            <Input
              defaultValue={(isEditing && agenciesData?.city) || ''}
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
              defaultValue={(isEditing && agenciesData?.state) || ''}
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
              defaultValue={(isEditing && agenciesData?.zipcode) || ''}
              type="text"
              name="zipcode"
              placeholder="ZipCode"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="region">
            <FormLabel>Region</FormLabel>
            <Controller
              defaultValue={(isEditing && agenciesData?.region) || ''}
              as={Select}
              name="region"
              options={_jobRegionOptions}
              control={control}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <Box my={4}>
        <FormControl id="intro">
          <FormLabel>Page Intro</FormLabel>
          <Controller
            control={control}
            name="intro"
            defaultValue={(isEditing && agenciesData?.intro) || ''}
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                placeholder="intro..."
                onChange={(intro: any) => onChange(intro)}
                value={value || ''}
              />
            )}
          />
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Controller
            control={control}
            name="description"
            defaultValue={agenciesData?.description || ''}
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                placeholder="description..."
                onChange={(description: any) => onChange(description)}
                value={value || ''}
              />
            )}
          />
        </FormControl>
      </Box>

      <SimpleGrid columns={[1, 1, 6]} spacing={10} mb={8}>
        <Box>
          <FormControl id="visibility">
            <FormLabel>Visibility</FormLabel>
            <Controller
              defaultValue={(isEditing && agenciesData?.status) || ''}
              as={
                <RadioGroup name="visibility">
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="green" value="Public">
                      Public
                    </Radio>
                    <Radio colorScheme="red" value="Private">
                      Private
                    </Radio>
                    <Radio colorScheme="gray" value="Draft">
                      Draft
                    </Radio>
                  </Stack>
                </RadioGroup>
              }
              name="visibility"
              control={control}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <Box my={4}>
        <Button
          mr={2}
          mt={4}
          bg="gray.300"
          color="gray.800"
          onClick={() => router.push('/dashboard/agencies')}
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
          {isEditing ? 'Update' : 'Add'} Agency
        </Button>
      </Box>
    </form>
  );
};
