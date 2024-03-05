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
import { RichText } from '@/components/RichText';

export interface AccountFormProps {
  isEditing: boolean;
  bg: string;
  color: string;
}

export const AccountForm: React.FC<AccountFormProps> = ({
  isEditing,
  bg,
  color,
}) => {
  const toast = useToast();
  const router = useRouter();

  const { add } = useCollection<any>('accounts');
  const { data: accountsData, update } = useDocument<any>(
    `accounts/${router.query.id}`,
  );

  const { register, handleSubmit, control, reset, formState } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    reset(accountsData);
  }, [accountsData, reset]);

  const onSubmit = (data: any) => {
    const dataObj = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    // @ts-ignore
    add(dataObj)
      .then(() => {
        toast({
          title: 'Account Added!',
          description: "You've successfully added a new account!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/accounts');
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
          title: 'Account Updated!',
          description: "You've successfully updated your account!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/accounts');
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
          {isEditing ? 'Editing Account' : 'Add New Account'}
          <Text fontSize="md" mt={2} color="gray.500">
            <NextLink href={`/accounts/${accountsData?.slug}`}>
              <a target="_blank" rel="noreferrer">
                {isEditing && accountsData?.accountName}
              </a>
            </NextLink>
          </Text>
        </Heading>
      </Box>

      <SimpleGrid columns={[1, 1, 2]} spacing={10} mb={8}>
        <Box>
          <FormControl id="accountName">
            <FormLabel>Account Name</FormLabel>
            <Input
              defaultValue={isEditing && accountsData?.accountName}
              type="text"
              name="accountName"
              placeholder="Account Name"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="website">
            <FormLabel>Account Website</FormLabel>
            <Input
              defaultValue={isEditing && accountsData?.website}
              type="url"
              name="website"
              placeholder="https://kywrd.com"
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
              as={
                <RadioGroup
                  defaultValue={isEditing && accountsData?.visibility}
                  name="visibility"
                >
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
      </SimpleGrid>

      <Box my={4}>
        <Button
          mr={2}
          mt={4}
          bg="gray.300"
          color="gray.800"
          onClick={() => router.push('/dashboard/accounts')}
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
          {isEditing ? 'Update' : 'Add'} Account
        </Button>
      </Box>
    </form>
  );
};
