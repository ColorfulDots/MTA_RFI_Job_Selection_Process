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
import { _skillLevelOptions } from '@/components/index';
import { slugify } from '@/helpers/index';

export interface ServicesFormProps {
  isEditing: boolean;
  bg: string;
  color: string;
}

export const ServicesForm: React.FC<ServicesFormProps> = ({
  isEditing,
  bg,
  color,
}) => {
  const toast = useToast();
  const router = useRouter();

  const { add } = useCollection<any>('services');
  const { data: servicesData, update } = useDocument<any>(
    `services/${router.query.id}`,
  );

  const { register, handleSubmit, control, reset, watch, formState } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    reset(servicesData);
  }, [reset, servicesData]);

  const onSubmit = (data: any) => {
    const dataObj = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    // @ts-ignore
    add(dataObj)
      .then(() => {
        toast({
          title: 'Service Added!',
          description: "You've successfully added a new service!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/pages/services');
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
          title: 'Service Updated!',
          description: "You've successfully updated the services page!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/pages/services');
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

  const _avgCostPer = [
    { value: 'Hour', label: 'Hour' },
    { value: 'Project', label: 'Project' },
    { value: 'Setup', label: 'Setup' },
    { value: 'Configuration', label: 'Configuration' },
    { value: 'App', label: 'App' },
    { value: 'File', label: 'File' },
    { value: 'Month', label: 'Month' },
    { value: 'Day', label: 'Day' },
  ];

  return (
    <form onSubmit={handleSubmit(isEditing ? onUpdate : onSubmit)}>
      <Box>
        <Heading size="lg" mb="6">
          {isEditing ? 'Editing Service' : 'Add New Service'}
          <Text fontSize="md" mt={2} color="gray.500">
            <NextLink href={`/services/${servicesData?.slug}`}>
              <a target="_blank" rel="noreferrer">
                {isEditing && servicesData?.name}
              </a>
            </NextLink>
          </Text>
        </Heading>
      </Box>
      <SimpleGrid columns={[1, 1, 2]} spacing={10} mb={8}>
        <Box>
          <FormControl id="name">
            <FormLabel>Service Name</FormLabel>
            <Input
              defaultValue={(isEditing && servicesData?.name) || ''}
              type="text"
              name="name"
              placeholder="Service Name"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="slug">
            <FormLabel>Slug (URL)</FormLabel>
            <Input
              defaultValue={(isEditing && servicesData?.slug) || ''}
              type="text"
              name="slug"
              value={watch('name') && slugify(watch('name'))}
              placeholder="Service Slug /some-service-title-thing"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 4]} spacing={10} mb={8}>
        <Box>
          <FormControl id="priceRange">
            <FormLabel>Price Range</FormLabel>
            <Input
              defaultValue={(isEditing && servicesData?.priceRange) || ''}
              type="text"
              name="priceRange"
              placeholder="Service Price Range"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="avgCostPer">
            <FormLabel>Average Cost Per</FormLabel>

            <Controller
              defaultValue={(isEditing && servicesData?.avgCostPer) || ''}
              as={Select}
              name="avgCostPer"
              options={_avgCostPer}
              control={control}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="timeline">
            <FormLabel>Avg Timeline</FormLabel>
            <Input
              defaultValue={(isEditing && servicesData?.timeline) || ''}
              type="text"
              name="timeline"
              placeholder="Avg Timeline"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="skillLevel">
            <FormLabel>Our Skill Level</FormLabel>
            <Controller
              defaultValue={(isEditing && servicesData?.skillLevel) || ''}
              as={Select}
              name="skillLevel"
              options={_skillLevelOptions}
              control={control}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="projectScope">
            <FormLabel>Project Scope (Good for MVP - Series A)</FormLabel>
            <Input
              defaultValue={(isEditing && servicesData?.projectScope) || ''}
              type="text"
              name="projectScope"
              placeholder="Project Scope"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <Box my={4}>
        <FormControl id="intro">
          <FormLabel>Service Intro (Tagline)</FormLabel>
          <Controller
            control={control}
            name="intro"
            defaultValue=""
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                isAdmin
                onChange={(intro: any) => onChange(intro)}
                value={value || ''}
              />
            )}
          />

          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="description">
          <FormLabel>Service Description</FormLabel>
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

          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="upSellMessage">
          <FormLabel>Service UpSell Message</FormLabel>
          <Controller
            control={control}
            name="upSellMessage"
            defaultValue=""
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                isAdmin
                onChange={(upSellMessage: any) => onChange(upSellMessage)}
                value={value || ''}
              />
            )}
          />

          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="availability">
          <FormLabel>Availability</FormLabel>
          <Controller
            defaultValue={(isEditing && servicesData?.availability) || ''}
            as={
              <RadioGroup name="availability">
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
            name="availability"
            control={control}
          />

          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="requiresDeposit">
          <FormLabel>Requires Deposit</FormLabel>
          <Controller
            defaultValue={(isEditing && servicesData?.requiresDeposit) || ''}
            as={
              <RadioGroup name="requiresDeposit">
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="green" value="Yes">
                    Yes
                  </Radio>
                  <Radio colorScheme="red" value="No">
                    No
                  </Radio>
                  <Radio colorScheme="gray" value="Possibly">
                    Possibly
                  </Radio>
                </Stack>
              </RadioGroup>
            }
            name="requiresDeposit"
            control={control}
          />

          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="serviceStatus">
          <FormLabel>Service Status</FormLabel>
          <Controller
            defaultValue={(isEditing && servicesData?.serviceStatus) || ''}
            as={
              <RadioGroup name="serviceStatus">
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="green" value="active">
                    Active
                  </Radio>
                  <Radio colorScheme="red" value="inactive">
                    Inactive
                  </Radio>
                </Stack>
              </RadioGroup>
            }
            name="serviceStatus"
            control={control}
          />

          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>
      </Box>
      <Box my={4}>
        <Button
          mr={2}
          mt={4}
          bg="gray.300"
          color="gray.800"
          onClick={() => router.push('/dashboard/pages/services')}
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
          {isEditing ? 'Update' : 'Post'} Service
        </Button>
      </Box>
    </form>
  );
};
