import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { useRouter } from 'next/router';
import {
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  useToast,
  Box,
  Radio,
  RadioGroup,
  Stack,
  SimpleGrid,
  Heading,
  Text,
  FormHelperText,
} from '@chakra-ui/react';
import Select from 'react-select';
import { RichText } from '@/components/RichText';
import NextLink from 'next/link';

export interface TechnologiesFormProps {
  isEditing: boolean;
  bg: string;
  color: string;
}

export const TechnologiesForm: React.FC<TechnologiesFormProps> = ({
  isEditing,
  bg,
  color,
}) => {
  const toast = useToast();
  const router = useRouter();

  const { add } = useCollection<any>('technologies');
  const { data: technologiesData, update } = useDocument<any>(
    `technologies/${router.query.id}`,
  );

  const { register, handleSubmit, control, reset, formState } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    reset(technologiesData);
  }, [reset, technologiesData]);

  const onSubmit = (data: any) => {
    const dataObj = {
      ...data,
      createdAt: new Date().toISOString(),
    };
    // @ts-ignore
    add(dataObj)
      .then(() => {
        toast({
          title: 'Technology Posted!',
          description: "You've successfully posted a new technology!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/pages/technologies');
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
          title: 'Technology Updated!',
          description: "You've successfully updated a technology!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/pages/technologies');
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

  const technologiesSkillLevelOptions = [
    { value: 'Novice', label: 'Novice' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'Competent', label: 'Competent' },
    { value: 'Proficient', label: 'Proficient' },
    { value: 'Expert', label: 'Expert' },
  ];

  const _avgCostPer = [
    { value: 'Hour', label: 'Hour' },
    { value: 'Project', label: 'Project' },
    { value: 'Setup', label: 'Setup' },
    { value: 'Configuration', label: 'Configuration' },
    { value: 'App', label: 'App' },
    { value: 'File', label: 'File' },
  ];

  const technologiesRatingOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A', label: 'A' },
    { value: 'A-', label: 'A-' },

    { value: 'B+', label: 'B+' },
    { value: 'B', label: 'B' },
    { value: 'B-', label: 'B-' },

    { value: 'C+', label: 'C+' },
    { value: 'C', label: 'C' },
    { value: 'C-', label: 'C-' },

    { value: 'D+', label: 'D+' },
    { value: 'D', label: 'D' },
    { value: 'D-', label: 'D-' },

    { value: 'F+', label: 'F+' },
    { value: 'F', label: 'F' },
    { value: 'F-', label: 'F-' },
  ];

  return (
    <form onSubmit={handleSubmit(isEditing ? onUpdate : onSubmit)}>
      <Box>
        <Heading size="lg" mb="6">
          {isEditing ? 'Editing Technology' : 'Add New Technology'}
          <Text fontSize="md" mt={2} color="gray.500">
            <NextLink href={`/technologies/${technologiesData?.slug}`}>
              <a target="_blank" rel="noreferrer">
                {isEditing && technologiesData?.title}
              </a>
            </NextLink>
          </Text>
        </Heading>
      </Box>

      <SimpleGrid columns={[1, 1, 3]} spacing={10} mb={8}>
        <Box>
          <FormControl id="title">
            <FormLabel>Title</FormLabel>
            <Input
              defaultValue={(isEditing && technologiesData?.title) || ''}
              type="text"
              name="title"
              placeholder="Technology Title"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="slug">
            <FormLabel>Slug (URL)</FormLabel>
            <Input
              defaultValue={(isEditing && technologiesData?.slug) || ''}
              type="text"
              name="slug"
              placeholder="Technology Slug /some-job-techno-thing"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="icon">
            <FormLabel>Icon</FormLabel>
            <Input
              defaultValue={(isEditing && technologiesData?.icon) || ''}
              type="text"
              name="icon"
              placeholder="devicon-nodejs-plain-wordmark"
              ref={register({ required: true })}
            />
            <FormHelperText>Icons: https://devicon.dev/</FormHelperText>
          </FormControl>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 4]} spacing={10} mb={8}>
        <Box>
          <FormControl id="link">
            <FormLabel>Outbound Link</FormLabel>
            <Input
              defaultValue={(isEditing && technologiesData?.link) || ''}
              type="text"
              name="link"
              placeholder="Outbound Link https://some-job-techno-thing.com"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="avgCost">
            <FormLabel>Average Cost</FormLabel>
            <Input
              defaultValue={(isEditing && technologiesData?.avgCost) || ''}
              type="text"
              name="avgCost"
              placeholder="$100 / hour"
              ref={register()}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="avgCostPer">
            <FormLabel>Average Cost Per</FormLabel>

            <Controller
              defaultValue={(isEditing && technologiesData?.avgCostPer) || ''}
              as={Select}
              name="avgCostPer"
              options={_avgCostPer}
              control={control}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="teamExpYears">
            <FormLabel>Team Experience (Years)</FormLabel>
            <Controller
              defaultValue={(isEditing && technologiesData?.teamExpYears) || ''}
              as={
                <NumberInput
                  name="teamExpYears"
                  min={0}
                  max={30}
                  defaultValue={
                    (isEditing && technologiesData?.teamExpYears) || ''
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              }
              name="teamExpYears"
              control={control}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="teamSkillLevel">
            <FormLabel>Team Skill Level</FormLabel>
            <Controller
              defaultValue={
                (isEditing && technologiesData?.teamSkillLevel) || ''
              }
              as={Select}
              name="teamSkillLevel"
              options={technologiesSkillLevelOptions}
              control={control}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="rating">
            <FormLabel>Team Rating</FormLabel>
            <Controller
              defaultValue={(isEditing && technologiesData?.rating) || ''}
              as={Select}
              name="rating"
              options={technologiesRatingOptions}
              control={control}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <Box my={4}>
        <FormControl id="description">
          <FormLabel>Technology Description</FormLabel>
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
          <FormLabel>Technology Up Sell Message</FormLabel>
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
        <FormControl id="status">
          <FormLabel>Technology Status</FormLabel>
          <Controller
            defaultValue={(isEditing && technologiesData?.status) || ''}
            as={
              <RadioGroup name="status">
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
            name="status"
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
          onClick={() => router.push('/dashboard/pages/technologies')}
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
          {isEditing ? 'Update' : 'Post'} Technology
        </Button>
      </Box>
    </form>
  );
};
