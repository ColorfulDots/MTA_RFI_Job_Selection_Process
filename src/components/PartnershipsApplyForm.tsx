import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCollection } from '@nandorojo/swr-firestore';
import { useRouter } from 'next/router';
import { darken } from 'polished';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  SimpleGrid,
  Heading,
  Text,
  Divider,
} from '@chakra-ui/react';
import Select from 'react-select';
import { RichText } from '@/components/RichText';
import {
  _statesData,
  _countriesData,
  _companySizeOptions,
  _annualRevenueOptions,
  _industryOptions,
} from '@/components/index';

export interface PartnershipsApplyFormProps {
  bg: string;
  color: string;
}

export const PartnershipsApplyForm: React.FC<PartnershipsApplyFormProps> = ({
  bg,
  color,
}) => {
  const router = useRouter();

  const { add } = useCollection<any>('partnerships');

  const { register, handleSubmit, control, formState } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data: any) => {
    const dataObj = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    // @ts-ignore
    add(dataObj)
      .then(() => {
        router.push('/partnerships/apply/success');
      })
      .catch((errors) => {
        console.log('error', errors);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box bg={darken(0.035, bg.toString())} p={8} rounded={'md'} mt={8}>
        <Heading size="sm" mb="4">
          Contact Information
        </Heading>

        <SimpleGrid columns={[1, 1, 3]} spacing={10} mb={8}>
          <Box>
            <FormControl id="firstName">
              <FormLabel>First Name</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="text"
                name="firstName"
                placeholder="First Name"
                ref={register({ required: true })}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="middleName">
              <FormLabel>Middle Name</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="text"
                name="middleName"
                placeholder="Middle Name"
                ref={register}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="lastName">
              <FormLabel>Last Name</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="text"
                name="lastName"
                placeholder="Last Name"
                ref={register({ required: true })}
              />
            </FormControl>
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 2]} spacing={10} mb={8}>
          <Box>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="email"
                name="email"
                placeholder="Email"
                ref={register({ required: true })}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="phoneNumber">
              <FormLabel>Phone Number</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="tel"
                name="phoneNumber"
                placeholder="1-800-888-9876"
                ref={register()}
              />
            </FormControl>
          </Box>
        </SimpleGrid>
      </Box>

      <Box bg={darken(0.035, bg.toString())} p={8} rounded={'md'} mt={8}>
        <Heading size="sm" mb="4">
          Company Information
        </Heading>
        <SimpleGrid columns={[1, 1, 3]} spacing={10} mb={8}>
          <Box>
            <FormControl id="companyName">
              <FormLabel>Company Name</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="text"
                name="companyName"
                placeholder="Company Name"
                ref={register({ required: true })}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="dbaName">
              <FormLabel>DBA Company Name</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="text"
                name="dbaName"
                placeholder="DBA Company Name"
                ref={register}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="companyWebsite">
              <FormLabel>Company Website</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="url"
                name="companyWebsite"
                placeholder="https://yourcompany.com"
                ref={register}
              />
            </FormControl>
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 3]} spacing={10} mb={8}>
          <Box>
            <FormControl id="companySize">
              <FormLabel>Company Size</FormLabel>
              <Controller
                defaultValue=""
                as={Select}
                name="companySize"
                options={_companySizeOptions}
                control={control}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="annualRevenue">
              <FormLabel>Annual Revenue</FormLabel>
              <Controller
                defaultValue=""
                as={Select}
                name="annualRevenue"
                options={_annualRevenueOptions}
                control={control}
              />
            </FormControl>
          </Box>

          <Box>
            <FormControl id="industry">
              <FormLabel>Industry</FormLabel>
              <Controller
                defaultValue=""
                as={Select}
                name="industry"
                isMulti
                options={_industryOptions}
                control={control}
              />
            </FormControl>
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 2]} spacing={10} mb={8}>
          <Box>
            <FormControl id="streetAddress">
              <FormLabel>Street Address</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="text"
                name="streetAddress"
                placeholder="Street Address"
                ref={register({ required: true })}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="streetAddress2">
              <FormLabel>Street Address 2</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="text"
                name="streetAddress2"
                placeholder="Street Address 2"
              />
            </FormControl>
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 1, 2, 2]} spacing={10} mb={8}>
          <Box>
            <FormControl id="city">
              <FormLabel>City</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="text"
                name="city"
                placeholder="City"
                ref={register({ required: true })}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="state">
              <FormLabel>State</FormLabel>
              <Controller
                defaultValue=""
                as={Select}
                name="state"
                options={_statesData}
                control={control}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="zipcode">
              <FormLabel>Zipcode</FormLabel>
              <Input
                _placeholder={{ color: 'gray.600' }}
                bg="white"
                color="gray.900"
                type="text"
                name="zipcode"
                placeholder="ZipCode"
                ref={register()}
              />
            </FormControl>
          </Box>

          <Box>
            <FormControl id="country">
              <FormLabel>Country</FormLabel>
              <Controller
                defaultValue=""
                as={Select}
                name="country"
                options={_countriesData}
                control={control}
              />
            </FormControl>
          </Box>
        </SimpleGrid>
      </Box>
      <Box bg={darken(0.035, bg.toString())} p={8} rounded={'md'} mt={8}>
        <Heading size="sm" mb="4">
          Company Details
        </Heading>
        <Box my={4}>
          <FormControl id="description">
            <FormLabel>Company Description</FormLabel>
            <Controller
              control={control}
              name="description"
              defaultValue=""
              render={({ onChange, value }: { onChange: any; value: any }) => (
                <RichText
                  style={{
                    background: 'white',
                    borderRadius: 10,
                    color: 'gray.900',
                  }}
                  placeholder="Describe the history of your company, mission statement, culture, industry specifics, key clients, etc."
                  onChange={(description: any) => onChange(description)}
                  value={value || ''}
                />
              )}
            />
          </FormControl>
        </Box>

        <Box my={4}>
          <FormControl id="capabilities">
            <FormLabel>Company Capabilities</FormLabel>
            <Controller
              control={control}
              name="capabilities"
              defaultValue=""
              render={({ onChange, value }: { onChange: any; value: any }) => (
                <RichText
                  style={{
                    background: 'white',
                    borderRadius: 10,
                    color: 'gray.900',
                  }}
                  placeholder="Please describe your company's strengths, areas of expertise, certifications, awards, etc."
                  onChange={(capabilities: any) => onChange(capabilities)}
                  value={value || ''}
                />
              )}
            />
          </FormControl>
        </Box>

        <Box my={4}>
          <Divider
            aria-hidden
            my="4"
            borderWidth="1px"
            borderStyle="dashed"
            borderColor={color}
          />
          <Text>
            What happens next? Once you submit your application, our team will
            review your details and discuss the next steps. Please allow up to
            24 hours for a response.
          </Text>
          <Divider
            aria-hidden
            my="4"
            borderWidth="1px"
            borderStyle="dashed"
            borderColor={color}
          />
          <Button
            mr={2}
            mt={4}
            bg="gray.300"
            color="gray.800"
            onClick={() => router.push('/dashboard/partnerships')}
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
            Submit Application
          </Button>
        </Box>
      </Box>
    </form>
  );
};
