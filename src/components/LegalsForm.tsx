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
import { RichText } from '@/components/RichText';
import NextLink from 'next/link';

export interface LegalsFormProps {
  isEditing: boolean;
}

export const LegalsForm: React.FC<LegalsFormProps> = ({ isEditing }) => {
  const toast = useToast();
  const router = useRouter();

  const { add } = useCollection<any>('legals');
  const { data: legalsData, update } = useDocument<any>(
    `legals/${router.query.id}`,
  );

  const { register, handleSubmit, reset, control, formState } = useForm();

  useEffect(() => {
    reset(legalsData);
  }, [legalsData, reset]);

  const onSubmit = async (data: any) => {
    const dataObj = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    // @ts-ignore
    await add(dataObj)
      .then(() => {
        toast({
          title: 'Posted!',
          description: "You've successfully posted a new legal post!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/pages/legal');
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
      modifiedAt: new Date().toISOString(),
    };

    // @ts-ignore
    await update(dataObj)
      .then(() => {
        toast({
          title: 'Updated!',
          description: "You've successfully updated your legal post!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/pages/legal');
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
          {isEditing ? 'Editing Legal Post' : 'Add New Legal Post'}
          <Text fontSize="md" mt={2} color="gray.500">
            <NextLink href={`/legal/${legalsData?.slug}`}>
              <a target="_blank" rel="noreferrer">
                {isEditing && legalsData?.title}
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
              defaultValue={(isEditing && legalsData?.title) || ''}
              type="text"
              name="title"
              placeholder="Legal Title"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="shortTitle">
            <FormLabel>Short Title</FormLabel>
            <Input
              defaultValue={(isEditing && legalsData?.shortTitle) || ''}
              type="text"
              name="shortTitle"
              placeholder="Legal Short Title"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="slug">
            <FormLabel>Slug (URL)</FormLabel>
            <Input
              defaultValue={(isEditing && legalsData?.slug) || ''}
              type="text"
              name="slug"
              placeholder="Legal Slug /some-title-thing"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <Box my={4}>
        <FormControl id="description">
          <FormLabel>Legal Description</FormLabel>
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
        <FormControl id="visibility">
          <FormLabel>Legal Status</FormLabel>
          <Controller
            defaultValue={(isEditing && legalsData?.visibility) || ''}
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
          onClick={() => router.push('/dashboard/pages/legal')}
        >
          Cancel
        </Button>
        <Button
          mt={4}
          type="submit"
          isLoading={formState.isSubmitting}
          loadingText="Submitting..."
        >
          {isEditing ? 'Update' : 'Post'} Legal
        </Button>
      </Box>
    </form>
  );
};
