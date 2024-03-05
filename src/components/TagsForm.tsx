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
import { slugify } from '@/helpers/index';

export interface TagsFormProps {
  isEditing: boolean;
  bg: string;
  color: string;
}

export const TagsForm: React.FC<TagsFormProps> = ({ isEditing, bg, color }) => {
  const toast = useToast();
  const router = useRouter();

  const { add } = useCollection<any>('tags');
  const { data: tagsData, update } = useDocument<any>(
    `tags/${router.query.id}`,
  );

  const { register, handleSubmit, control, reset, watch, formState } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    watch('title');
    reset(tagsData);
  }, [reset, tagsData, watch]);

  const onSubmit = (data: any) => {
    const dataObj = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    // @ts-ignore
    add(dataObj)
      .then(() => {
        toast({
          title: 'Tag Posted!',
          description: "You've successfully added a new tag!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/pages/tags');
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
          title: 'Tag Updated!',
          description: "You've successfully updated a tag!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/pages/tags');
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
          {isEditing ? 'Editing Tag' : 'Add New Tag'}
          <Text fontSize="md" mt={2} color="gray.500">
            <NextLink href={`/tags/${tagsData?.slug}`}>
              <a target="_blank" rel="noreferrer">
                {isEditing && tagsData?.title}
              </a>
            </NextLink>
          </Text>
        </Heading>
      </Box>
      <SimpleGrid columns={[1, 1, 2]} spacing={10} mb={8}>
        <Box>
          <FormControl id="title">
            <FormLabel>Title</FormLabel>
            <Input
              defaultValue={(isEditing && tagsData?.title) || ''}
              type="text"
              name="title"
              placeholder="Tag Title"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="slug">
            <FormLabel>Slug (URL)</FormLabel>
            <Input
              defaultValue={(isEditing && tagsData?.slug) || ''}
              type="text"
              name="slug"
              placeholder="Tag Slug /some-title-thing"
              value={watch('title') && slugify(watch('title'))}
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <Box my={4}>
        <FormControl id="description">
          <FormLabel>Tag Description</FormLabel>
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
          <FormLabel>Visibility</FormLabel>
          <Controller
            defaultValue={(isEditing && tagsData?.visibility) || ''}
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
          onClick={() => router.push('/dashboard/pages/tags')}
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
          {isEditing ? 'Update' : 'Post'} Tag
        </Button>
      </Box>
    </form>
  );
};
