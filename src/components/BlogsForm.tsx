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
  Text,
} from '@chakra-ui/react';
import Select from 'react-select';
import { RichText } from '@/components/RichText';
import NextLink from 'next/link';
import { _blogCategories } from '@/components/index';
import { slugify } from '@/helpers/index';

export interface BlogsFormProps {
  isEditing: boolean;
  bg: string;
  color: string;
}

export const BlogsForm: React.FC<BlogsFormProps> = ({
  isEditing,
  bg,
  color,
}) => {
  const toast = useToast();
  const router = useRouter();

  const { add } = useCollection<any>('blogs');
  const { data: blogsData, update } = useDocument<any>(
    `blogs/${router.query.id}`,
  );

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
    watch('title');
    reset(blogsData);
  }, [blogsData, reset, watch]);

  const onSubmit = (data: any) => {
    const dataObj = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    // @ts-ignore
    add(dataObj)
      .then(() => {
        toast({
          title: 'Blog Posted!',
          description: "You've successfully posted a new blog post!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/pages/blog');
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
          title: 'Blog Updated!',
          description: "You've successfully updated your blog post!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/pages/blog');
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
          {isEditing ? 'Editing Blog Post' : 'Add New Blog Post'}
          <Text fontSize="md" mt={2} color="gray.500">
            <NextLink href={`/blog/${blogsData?.slug}`}>
              <a target="_blank" rel="noreferrer">
                {isEditing && blogsData?.title}
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
              defaultValue={(isEditing && blogsData?.title) || ''}
              type="text"
              name="title"
              placeholder="Blog Title"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="slug">
            <FormLabel>Slug (URL)</FormLabel>
            <Input
              defaultValue={(isEditing && blogsData?.slug) || ''}
              type="text"
              name="slug"
              value={watch('title') && slugify(watch('title'))}
              placeholder="Blog Slug /some-title-thing"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 2]} spacing={10} mb={8}>
        <Box>
          <FormControl id="category">
            <FormLabel>Category</FormLabel>
            <Controller
              defaultValue={(isEditing && blogsData?.category) || ''}
              as={Select}
              name="category"
              options={_blogCategories}
              control={control}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <Box my={4}>
        <FormControl id="intro">
          <FormLabel>Blog Tagline (Intro)</FormLabel>
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
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="description">
          <FormLabel>Blog Description</FormLabel>
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
          <FormLabel>Blog Status</FormLabel>
          <Controller
            defaultValue={(isEditing && blogsData?.visibility) || ''}
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
          onClick={() => router.push('/dashboard/pages/blog')}
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
          {isEditing ? 'Update' : 'Post'} Blog
        </Button>
      </Box>
    </form>
  );
};
