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
import NextLink from 'next/link';
import {
  _richTextFormatAdmin,
  _richTextModulesAdmin,
} from '@/components/index';
import { slugify } from '@/helpers/index';
import { RichText } from '@/components/RichText';

export interface AcronymsFormProps {
  isEditing: boolean;
  bg: string;
  color: string;
}

export const AcronymsForm: React.FC<AcronymsFormProps> = ({
  isEditing,
  bg,
  color,
}) => {
  const toast = useToast();
  const router = useRouter();

  const { add } = useCollection<any>('acronyms');
  const { data: acronymsData, update } = useDocument<any>(
    `acronyms/${router.query.id}`,
  );

  const { register, handleSubmit, watch, control, reset } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    reset(acronymsData);
  }, [acronymsData, reset]);

  const onSubmit = (data: any) => {
    const dataObj = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    // @ts-ignore
    add(dataObj)
      .then(() => {
        toast({
          title: 'Acronym Posted!',
          description: "You've successfully posted a new acronym!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/pages/acronyms');
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
          title: 'Acronym Updated!',
          description: "You've successfully updated the acronym!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/pages/acronyms');
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
          {isEditing ? 'Editing Acronym Post' : 'Add New Acronym Post'}
          <Text fontSize="md" mt={2} color="gray.500">
            <NextLink href={`/government-acronyms/${acronymsData?.slug}`}>
              <a target="_blank" rel="noreferrer">
                {isEditing && acronymsData?.term}
              </a>
            </NextLink>
          </Text>
        </Heading>
      </Box>
      <SimpleGrid columns={[1, 1, 3]} spacing={10} mb={8}>
        <Box>
          <FormControl id="title">
            <FormLabel>Term</FormLabel>
            <Input
              defaultValue={(isEditing && acronymsData?.term) || ''}
              type="text"
              name="title"
              placeholder="Acronym Term"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="slug">
            <FormLabel>Slug (URL)</FormLabel>
            <Input
              defaultValue={(isEditing && acronymsData?.slug) || ''}
              type="text"
              name="slug"
              value={watch('title') && slugify(watch('title'))}
              placeholder="Acronym Slug /some-title-thing"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <Box my={4}>
        <FormControl id="into">
          <FormLabel>Acronym Intro</FormLabel>
          <Controller
            control={control}
            name="into"
            defaultValue=""
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                onChange={(into: any) => onChange(into)}
                value={value || ''}
              />
            )}
          />
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="description">
          <FormLabel>Acronym Description</FormLabel>
          <Controller
            control={control}
            name="description"
            defaultValue=""
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                onChange={(description: any) => onChange(description)}
                value={value || ''}
              />
            )}
          />
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="visibility">
          <FormLabel>Acronym Status</FormLabel>
          <Controller
            defaultValue={(isEditing && acronymsData?.visibility) || ''}
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
          onClick={() => router.push('/dashboard/pages/acronyms')}
        >
          Cancel
        </Button>
        <Button mt={4} bg={bg} color={color} type="submit">
          {isEditing ? 'Update' : 'Post'} Acronym
        </Button>
      </Box>
    </form>
  );
};
