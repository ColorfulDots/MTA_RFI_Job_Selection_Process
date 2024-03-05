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
import NextLink from 'next/link';
import { RichText } from '@/components/RichText';

export interface TechnologyGlossaryFormProps {}

export const TechnologyGlossaryForm: React.FC<any> = (props: any) => {
  const toast = useToast();
  const router = useRouter();

  const { add } = useCollection<any>('glossaries');
  const { data: technologyGlossaryData, update } = useDocument<any>(
    `glossaries/${router.query.id}`,
  );

  const { register, handleSubmit, control, reset, formState } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    reset(technologyGlossaryData);
  }, [reset, technologyGlossaryData]);

  const onSubmit = (data: any) => {
    const dataObj = {
      ...data,
      createdAt: new Date().toISOString(),
    };
    // @ts-ignore
    add(dataObj)
      .then(() => {
        toast({
          title: 'Technology Glossary Added!',
          description: "You've successfully added a new faq!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/pages/technology-glossary');
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
          title: 'Technology Glossary Updated!',
          description: "You've successfully updated an faq!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/pages/technology-glossary');
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
    <form onSubmit={handleSubmit(props.isEditing ? onUpdate : onSubmit)}>
      <Box>
        <Heading size="lg" mb="6">
          {props.isEditing
            ? 'Editing Technology Glossary'
            : 'Add New Technology Glossary'}
          <Text fontSize="md" mt={2} color="gray.500">
            <NextLink
              href={`/technology-glossary/${technologyGlossaryData?.slug}`}
            >
              <a target="_blank" rel="noreferrer">
                {props.isEditing && technologyGlossaryData?.term}
              </a>
            </NextLink>
          </Text>
        </Heading>
      </Box>
      <SimpleGrid columns={[1, 1, 3]} spacing={10} mb={8}>
        <Box>
          <FormControl id="term">
            <FormLabel>Term</FormLabel>
            <Input
              defaultValue={
                (props.isEditing && technologyGlossaryData?.term) || ''
              }
              type="text"
              name="term"
              placeholder="Technology Glossary Term"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="slug">
            <FormLabel>Slug (URL)</FormLabel>
            <Input
              defaultValue={
                (props.isEditing && technologyGlossaryData?.slug) || ''
              }
              type="text"
              name="slug"
              placeholder="Technology Glossary Slug"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <Box my={4}>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
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
            defaultValue={
              (props.isEditing && technologyGlossaryData?.visibility) || ''
            }
            as={
              <RadioGroup name="visibility">
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="green" value="Public">
                    Public
                  </Radio>
                  <Radio colorScheme="red" value="Private">
                    Private
                  </Radio>
                  <Radio colorScheme="red" value="Draft">
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
      <Box my={4}>
        <Button
          mr={2}
          mt={4}
          bg="gray.300"
          color="gray.800"
          onClick={() => router.push('/dashboard/pages/technology-glossary')}
        >
          Cancel
        </Button>
        <Button
          mt={4}
          bg={props.bg}
          color={props.color}
          type="submit"
          isLoading={formState.isSubmitting}
          loadingText="Submitting..."
        >
          {props.isEditing ? 'Update' : 'Post'} Technology Glossary
        </Button>
      </Box>
    </form>
  );
};
