import { useEffect, useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import firebase from 'firebase/app';
import 'firebase/storage';
import Link from 'next/link';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Box,
  Img,
  Radio,
  RadioGroup,
  Stack,
  SimpleGrid,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  // Popover,
  // PopoverContent,
  // PopoverHeader,
  // PopoverBody,
  // PopoverFooter,
  // PopoverArrow,
  // PopoverCloseButton,
  // ButtonGroup,
} from '@chakra-ui/react';
import Select from 'react-select';
import { RichText } from '@/components/RichText';
import {
  _clientTypeOptions,
  _agencyOptions,
  _jobDurationOptions,
  _jobHoursOptions,
  _contractNameOptions,
  _educationData,
  _statesData,
  _jobRegionOptions,
  _jobSalaryFrequencyOptions,
  _richTextFormatAdmin,
  _richTextModulesAdmin,
  _tagsOptionsAdmin,
  _industryOptions,
  _fontOptions,
} from '@/components/index';
import { slugify } from '@/helpers/index';

export interface ClientFormProps {}

export const ClientForm: React.FC<any> = (props: any) => {
  const toast = useToast();
  const router = useRouter();

  const { add } = useCollection<any>('clients');

  const { data: clientsData, update } = useDocument<any>(
    `clients/${router.query.id}`,
  );

  const { data: technologiesData } = useCollection<any>('technologies', {
    listen: false,
  });

  const { data: tagsData } = useCollection<any>('tags', {
    listen: false,
  });

  const [fileUrl, setFileUrl] = useState(clientsData && clientsData?.logo);

  // const [isOpen, setIsOpen] = useState(false);
  // const open = () => setIsOpen(!isOpen);
  // const close = () => setIsOpen(false);

  const { register, handleSubmit, control, reset, watch, formState } = useForm({
    defaultValues: clientsData,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'colors',
  });

  // IMAGE UPLOAD
  const onFileChange = async (e: any) => {
    const file = e.target.files[0];
    const storageRef = firebase
      .storage()
      .ref(`clients/${watch('slug') && watch('slug')}`);
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  const handleChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  useEffect(() => {
    watch('name');
    watch('slug');
    watch('file');
    watch('logo');
    reset(clientsData);
  }, [clientsData, reset, watch]);

  const onSubmit = async (data: any) => {
    const dataObj = {
      ...data,
      logo: fileUrl,
      createdAt: new Date().toISOString(),
    };
    // @ts-ignore
    await add(dataObj)
      .then(() => {
        toast({
          title: 'Client Added!',
          description: "You've successfully added a new client!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/clients');
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
      logo: fileUrl,
      modifiedAt: new Date().toISOString(),
    };
    // @ts-ignore
    await update(dataObj)
      .then(() => {
        toast({
          title: 'Client Updated!',
          description: "You've successfully updated your client!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard/clients');
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
          {props.isEditing ? 'Editing Client' : 'Add New Client'}
          <Text fontSize="md" mt={2} color="gray.500">
            <NextLink href={`/clients/project/${clientsData?.slug}`}>
              <a target="_blank" rel="noreferrer">
                {props.isEditing && clientsData?.name}
              </a>
            </NextLink>
          </Text>
        </Heading>
      </Box>

      <SimpleGrid columns={[1, 1, 4]} spacing={10} mb={8}>
        <Box>
          <FormControl id="name">
            <FormLabel>Client Name</FormLabel>
            <Input
              defaultValue={(props.isEditing && clientsData?.name) || ''}
              type="text"
              name="name"
              placeholder="Client Name"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="clientTypeMain">
            <FormLabel>Client Type</FormLabel>
            <Controller
              defaultValue={
                (props.isEditing && clientsData?.clientTypeMain) || ''
              }
              as={Select}
              name="clientTypeMain"
              options={_clientTypeOptions}
              control={control}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="slug">
            <FormLabel>Client (URL)</FormLabel>
            <Input
              defaultValue={(props.isEditing && clientsData?.slug) || ''}
              type="text"
              name="slug"
              value={watch('name') && slugify(watch('name'))}
              placeholder="Client Slug /kywrd"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="website">
            <FormLabel>Client Website</FormLabel>
            <Input
              defaultValue={(props.isEditing && clientsData?.website) || ''}
              type="url"
              name="website"
              placeholder="https://kywrd.com"
              ref={register()}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 3]} spacing={10} mb={8}>
        <Box>
          <FormControl id="budget">
            <FormLabel>Client Budget</FormLabel>
            <Input
              defaultValue={(props.isEditing && clientsData?.budget) || ''}
              type="text"
              name="budget"
              placeholder="Client Budget"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="timeline">
            <FormLabel>Client Timeline</FormLabel>
            <Input
              defaultValue={(props.isEditing && clientsData?.timeline) || ''}
              type="text"
              name="timeline"
              placeholder="Client Timeline"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="industry">
            <FormLabel>Client Industry</FormLabel>
            <Controller
              defaultValue={(props.isEditing && clientsData?.industry) || ''}
              as={Select}
              name="industry"
              isMulti
              options={_industryOptions}
              onChange={handleChange}
              control={control}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 3]} spacing={10} mb={8}>
        <Box>
          <Heading size="md">Logo &amp; Brand</Heading>
          <FormControl id="logo">
            <FormLabel htmlFor="file">
              <Img
                loading="lazy"
                cursor="pointer"
                src={
                  fileUrl || 'http://cdn.onlinewebfonts.com/svg/img_175730.png'
                }
                boxSize={200}
                objectFit="contain"
                alt="LOGO"
              />
              <Controller
                control={control}
                name="logo"
                defaultValue=""
                render={() => (
                  <Input
                    id="file"
                    onChange={onFileChange}
                    type="file"
                    style={{ display: 'none' }}
                  />
                )}
              />
            </FormLabel>
          </FormControl>
          <Box>
            <FormControl id="logoBg">
              <FormLabel>Logo Bg Color</FormLabel>
              <Input
                defaultValue={(props.isEditing && clientsData?.logoBg) || ''}
                type="color"
                name="logoBg"
                mb={{ base: '2', lg: '2' }}
                outline="none"
                borderWidth="0"
                borderColor="transparent"
                size="md"
                maxW="sm"
                cursor="pointer"
                _focus={{ shadow: 'none', outline: 'none' }}
                ref={register({ required: true })}
              />
            </FormControl>
          </Box>
        </Box>
        <Box>
          {/* <Heading size="md" mb="6">
            Colors{' '}
            {fields.length > 1 && (
              <Button
                size="sm"
                outline="none"
                type="button"
                mr={2}
                onClick={open}
                // onClick={() => remove()}
              >
                Clear Colors
              </Button>
            )}
          </Heading>

          <Popover
            returnFocusOnClose={false}
            isOpen={isOpen}
            onClose={close}
            placement="right"
            closeOnBlur={false}
          >
            <PopoverContent>
              <PopoverHeader fontWeight="semibold">Clear Colors</PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>Are you sure?</PopoverBody>
              <PopoverFooter d="flex" justifyContent="flex-end">
                <ButtonGroup size="sm">
                  <Button variant="outline" onClick={close}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={() => remove()}>
                    Apply
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Popover> */}

          {fields.map((item, index) => (
            <InputGroup key={item.id}>
              <Input
                type="color"
                name={`colors[${index}].color`}
                ref={register()}
                defaultValue={item['color']}
                mb={{ base: '2', lg: '2' }}
                outline="none"
                borderWidth="0"
                borderColor="transparent"
                size="md"
                cursor="pointer"
                _focus={{ shadow: 'none', outline: 'none' }}
              />
              <InputRightElement>
                <Button
                  size="sm"
                  outline="none"
                  type="button"
                  onClick={() => remove(index)}
                >
                  -
                </Button>
              </InputRightElement>
            </InputGroup>
          ))}

          <Box textAlign="right">
            <Button
              size="sm"
              outline="none"
              type="button"
              onClick={() => append({ color: '#f8f8f8' })}
            >
              + Add Color
            </Button>
          </Box>
        </Box>
        <Box>
          <Heading size="md" mb="6">
            Typography
          </Heading>
          <FormControl id="typography">
            <Controller
              defaultValue={(props.isEditing && clientsData?.typography) || ''}
              as={Select}
              isMulti
              rules={{ required: true }}
              name="typography"
              options={_fontOptions}
              control={control}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 2]} spacing={10} mb={8}>
        <Box>
          <FormControl id="tags">
            <FormLabel>
              Tags -{' '}
              <Link href="/dashboard/pages/tags/new">
                <a target="_blank" rel="noreferrer">
                  Add New Tag
                </a>
              </Link>
            </FormLabel>
            <Controller
              defaultValue={(props.isEditing && clientsData?.tags) || ''}
              as={Select}
              name="tags"
              isMulti
              rules={{ required: true }}
              options={tagsData?.map((tag) => ({
                label: tag.title,
                value: tag.title,
              }))}
              onChange={handleChange}
              control={control}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="technologiesUsed">
            <FormLabel>
              Technologies Used -{' '}
              <Link href="/dashboard/pages/technologies/new">
                <a target="_blank" rel="noreferrer">
                  Add New Technology
                </a>
              </Link>
            </FormLabel>
            <Controller
              defaultValue={
                (props.isEditing && clientsData?.technologiesUsed) || ''
              }
              as={Select}
              name="technologiesUsed"
              isMulti
              rules={{ required: true }}
              options={technologiesData?.map((technology) => ({
                label: technology.title,
                value: technology.title,
              }))}
              onChange={handleChange}
              control={control}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      {/* <Box>
        <Heading size="md">Gallery</Heading>

        {fields.map((item, index) => (
          <InputGroup key={item.id}>
            <Input
              type="file"
              name={`galleries[${index}].image`}
              ref={register()}
              defaultValue={item['image']}
              mb={{ base: '2', lg: '2' }}
              outline="none"
              borderWidth="0"
              borderColor="transparent"
              size="md"
              cursor="pointer"
              _focus={{ shadow: 'none', outline: 'none' }}
            />
            <InputRightElement>
              <Button
                size="sm"
                outline="none"
                type="button"
                onClick={() => remove(index)}
              >
                -
              </Button>
            </InputRightElement>
          </InputGroup>
        ))}

        <Box textAlign="right">
          <Button
            size="sm"
            outline="none"
            type="button"
            onClick={() =>
              append({
                image: 'http://cdn.onlinewebfonts.com/svg/img_175730.png',
              })
            }
          >
            + Add Color
          </Button>
        </Box>

        <FormControl id="gallery">
          <FormLabel htmlFor="file">
            <Img
              loading="lazy"
              cursor="pointer"
              src={
                fileUrl || 'http://cdn.onlinewebfonts.com/svg/img_175730.png'
              }
              boxSize={200}
              objectFit="contain"
              alt="GALLERY"
            />
            <Controller
              control={control}
              name="gallery"
              defaultValue=""
              render={() => (
                <Input
                  id="gallery_file"
                  onChange={onFileChange}
                  type="file"
                  style={{ display: 'none' }}
                />
              )}
            />
          </FormLabel>
        </FormControl>
        <Box>
          <FormControl id="galleryBg">
            <FormLabel>Gallery Bg Color</FormLabel>
            <Input
              defaultValue={(props.isEditing && clientsData?.galleryBg) || ''}
              type="color"
              name="galleryBg"
              mb={{ base: '2', lg: '2' }}
              outline="none"
              borderWidth="0"
              borderColor="transparent"
              size="md"
              maxW="sm"
              cursor="pointer"
              _focus={{ shadow: 'none', outline: 'none' }}
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
      </Box> */}

      <SimpleGrid columns={[1, 1, 2]} spacing={10} mb={8}>
        <Box>
          <FormControl id="videoLink">
            <FormLabel>Video Link (Vimeo / YouTube)</FormLabel>
            <Input
              defaultValue={(props.isEditing && clientsData?.videoLink) || ''}
              type="url"
              name="videoLink"
              placeholder="Client Video Link"
              ref={register()}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="videoLink2">
            <FormLabel>Video Link 2 (Vimeo / YouTube)</FormLabel>
            <Input
              defaultValue={(props.isEditing && clientsData?.videoLink2) || ''}
              type="url"
              name="videoLink2"
              placeholder="Client Video Link 2"
              ref={register()}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <Box my={4}>
        <FormControl id="intro">
          <FormLabel>Client Intro (Tagline)</FormLabel>
          <Controller
            control={control}
            name="intro"
            defaultValue=""
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                placeholder="intro..."
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

      <Box my={4}>
        <FormControl id="problem">
          <FormLabel>The Problem</FormLabel>
          <Controller
            control={control}
            name="problem"
            defaultValue=""
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                placeholder="problem..."
                isAdmin
                onChange={(problem: any) => onChange(problem)}
                value={value || ''}
              />
            )}
          />
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="solution">
          <FormLabel>The Solution</FormLabel>
          <Controller
            control={control}
            name="solution"
            defaultValue=""
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                placeholder="solution..."
                isAdmin
                onChange={(solution: any) => onChange(solution)}
                value={value || ''}
              />
            )}
          />
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="result">
          <FormLabel>The Result</FormLabel>
          <Controller
            control={control}
            name="result"
            defaultValue=""
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                placeholder="result..."
                isAdmin
                onChange={(result: any) => onChange(result)}
                value={value || ''}
              />
            )}
          />
        </FormControl>
      </Box>

      <Box my={4}>
        <FormControl id="testimony">
          <FormLabel>Client Testimony</FormLabel>
          <Controller
            control={control}
            name="testimony"
            defaultValue=""
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                placeholder="testimony..."
                isAdmin
                onChange={(testimony: any) => onChange(testimony)}
                value={value || ''}
              />
            )}
          />
        </FormControl>
      </Box>

      <SimpleGrid columns={[1, 1, 1]} spacing={10} mb={8}>
        <Box>
          <FormControl id="projectStatus">
            <FormLabel>Project Status</FormLabel>
            <Controller
              name="projectStatus"
              defaultValue={
                (props.isEditing && clientsData?.projectStatus) || ''
              }
              as={
                <RadioGroup>
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="green" value="Completed">
                      Completed
                    </Radio>
                    <Radio colorScheme="gray" value="In Development">
                      In Development
                    </Radio>
                    <Radio colorScheme="gray" value="Planning Phase">
                      Planning Phase
                    </Radio>
                    <Radio colorScheme="gray" value="Design Phase">
                      Design Phase
                    </Radio>
                  </Stack>
                </RadioGroup>
              }
              control={control}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 6]} spacing={10} mb={8}>
        <Box>
          <FormControl id="visibility">
            <FormLabel>Visibility</FormLabel>
            <Controller
              defaultValue={(props.isEditing && clientsData?.visibility) || ''}
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
      </SimpleGrid>

      <Box my={4}>
        <Button
          mr={2}
          mt={4}
          bg="gray.300"
          color="gray.800"
          onClick={() => router.push('/dashboard/clients')}
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
          {props.isEditing ? 'Update' : 'Add'} Client
        </Button>
      </Box>
    </form>
  );
};
