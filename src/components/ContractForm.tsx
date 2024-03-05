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
} from '@chakra-ui/react';
import { RichText } from '@/components/RichText';

export interface ContractFormProps {
  isEditing: boolean;
  bg: string;
  color: string;
}

export const ContractForm: React.FC<ContractFormProps> = ({
  isEditing,
  bg,
  color,
}) => {
  const toast = useToast();
  const router = useRouter();

  const { add } = useCollection<any>('contracts');
  const { data: contractsData, update } = useDocument<any>(
    `contracts/${router.query.id}`,
  );

  const { register, handleSubmit, control, reset, watch, formState } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    watch('contractName');
    reset(contractsData);
  }, [contractsData, reset, watch]);

  const onSubmit = (data: any) => {
    const dataObj = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    // @ts-ignore
    add(dataObj)
      .then(() => {
        toast({
          title: 'Contract Added!',
          description: "You've successfully added a new client!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/contracts');
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
          title: 'Contract Updated!',
          description: "You've successfully updated your client!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/contracts');
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
          {isEditing ? 'Editing Contract' : 'Add New Contract'}
        </Heading>
      </Box>

      <SimpleGrid columns={[1, 1, 3]} spacing={10} mb={8}>
        <Box>
          <FormControl id="contractName">
            <FormLabel>Contract Name</FormLabel>
            <Input
              defaultValue={isEditing && contractsData?.contractName}
              type="text"
              name="contractName"
              placeholder="Contract Name"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="contractNumber">
            <FormLabel>Contract Number</FormLabel>
            <Input
              defaultValue={isEditing && contractsData?.contractNumber}
              type="text"
              name="contractNumber"
              placeholder="Contract Number"
              ref={register()}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="website">
            <FormLabel>Contract Website</FormLabel>
            <Input
              defaultValue={isEditing && contractsData?.website}
              type="url"
              name="website"
              placeholder="https://kywrd.com"
              ref={register()}
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
                placeholder="description..."
                isAdmin
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
                  defaultValue={isEditing && contractsData?.status}
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
          onClick={() => router.push('/dashboard/contracts')}
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
          {isEditing ? 'Update' : 'Add'} Contract
        </Button>
      </Box>
    </form>
  );
};
