import { FC, useEffect } from 'react';
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
import { RichText } from '@/components/RichText';
import Select from 'react-select';
import { _faqCategoryOptions } from '@/components/index';
import { slugify } from '../helpers';
import { FAQDataProps } from '../types';
export interface FaqsFormProps {
  isEditing: boolean;
  bg: string;
  color: string;
}

export const FaqsForm: FC<FaqsFormProps> = ({ isEditing, bg, color }) => {
  const toast = useToast();
  const router = useRouter();

  const { add } = useCollection<FAQDataProps>('faqs');
  const { data: faqsData, update } = useDocument<any>(
    `faqs/${router.query['id']}`,
  );

  const { register, handleSubmit, control, reset, formState, watch } = useForm({
    mode: 'onChange',
    defaultValues: faqsData,
  });

  useEffect(() => {
    reset(faqsData);
  }, [faqsData, reset]);

  const onSubmit = (data: any) => {
    const dataObj = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    // @ts-ignore
    add(dataObj)
      .then(() => {
        toast({
          title: 'Faq Added!',
          description: "You've successfully added a new faq!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/pages/faqs');
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
          title: 'Faq Updated!',
          description: "You've successfully updated an faq!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/pages/faqs');
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
          {isEditing ? 'Editing Faq' : 'Add New Faq'}
        </Heading>
      </Box>
      <SimpleGrid columns={[1, 1, 3]} spacing={10} mb={8}>
        <Box>
          <FormControl id="question">
            <FormLabel>Question</FormLabel>
            <Input
              type="text"
              name="question"
              placeholder="Faq Question"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="slug">
            <FormLabel>Slug (URL)</FormLabel>
            <Input
              type="text"
              name="slug"
              placeholder="Faq Slug"
              value={watch('question') && slugify(watch('question'))}
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="category">
            <FormLabel>Category</FormLabel>
            <Controller
              as={Select}
              name="category"
              options={_faqCategoryOptions}
              control={control}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <Box my={4}>
        <FormControl id="answer">
          <FormLabel>Faq Answer</FormLabel>
          <Controller
            control={control}
            name="answer"
            defaultValue=""
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                isAdmin
                onChange={(answer: any) => onChange(answer)}
                value={value || ''}
              />
            )}
          />
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="visibility">
          <FormLabel>Is Public</FormLabel>
          <Controller
            as={
              <RadioGroup>
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
          onClick={() => router.push('/dashboard/pages/faqs')}
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
          {isEditing ? 'Update' : 'Post'} Faq
        </Button>
      </Box>
    </form>
  );
};
