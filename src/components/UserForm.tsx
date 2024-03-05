import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDocument } from '@nandorojo/swr-firestore';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Box,
  SimpleGrid,
  Avatar,
  Center,
  Text,
} from '@chakra-ui/react';
import { roleCheck, slugify } from '@/helpers/index';
import { UserDataProps } from 'types';
import { RichText } from './RichText';

export const UserForm: React.FC<UserDataProps> = (props: any) => {
  const { userData } = props;
  const toast = useToast();
  const router = useRouter();

  const { update } = useDocument<any>(`users/${userData?.id}`);

  const { register, handleSubmit, control, reset, watch, formState } = useForm({
    mode: 'onChange',
  });

  const [fileUrl, setFileUrl] = useState(
    props.isEditing ? userData?.avatar : null,
  );

  // IMAGE UPLOAD
  const onFileChange = async (e: any) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref(`users/${userData?.id}`);
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  useEffect(() => {
    reset({ ...userData });
  }, [reset, userData]);

  const onUpdate = (data: any) => {
    const dataObj = {
      ...data,
      modifiedAt: new Date().toISOString(),
    };
    // @ts-ignore
    update(dataObj)
      .then(() => {
        toast({
          title: 'Profile Updated!',
          description: "You've successfully updated your profile!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .then(() => {
        update({
          avatar: fileUrl,
        });
        router.push('/dashboard');
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
    <form onSubmit={handleSubmit(onUpdate)}>
      <Center mt={-16} py={10}>
        <Box>
          <FormControl id="avatar">
            <FormLabel htmlFor="file">
              <Avatar
                cursor="pointer"
                size="2xl"
                src={
                  (props.isEditing && userData?.avatar) ||
                  fileUrl ||
                  'https://cdn2.iconfinder.com/data/icons/bubbles-phone-interface/100/avatar_blank_human_face_contact_user_app-512.png'
                }
                borderWidth={8}
                borderColor="gray.100"
              />
              <Controller
                control={control}
                name="avatar"
                defaultValue=""
                render={({}) => (
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
          <Text>{roleCheck(userData)}</Text>
        </Box>
      </Center>
      <SimpleGrid columns={[1, 1, 1, 2, 3]} spacing={10} mb={8}>
        <Box>
          <FormControl id="firstName">
            <FormLabel>First Name</FormLabel>
            <Input
              defaultValue={(props.isEditing && userData?.firstName) || ''}
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
              defaultValue={(props.isEditing && userData?.middleName) || ''}
              type="text"
              name="middleName"
              placeholder="Middle Name"
              ref={register({ required: false })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="lastName">
            <FormLabel>Last Name</FormLabel>
            <Input
              defaultValue={(props.isEditing && userData?.lastName) || ''}
              type="text"
              name="lastName"
              placeholder="Last Name"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              defaultValue={(props.isEditing && userData?.email) || ''}
              type="email"
              name="email"
              placeholder="Email"
              ref={register({ required: true })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="username">
            <FormLabel>Username / Display Name</FormLabel>
            <Input
              defaultValue={(props.isEditing && userData?.username) || ''}
              type="text"
              name="username"
              placeholder="Username"
              ref={register({ required: false })}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl id="slug">
            <FormLabel>Slug (URL)</FormLabel>
            <Input
              // defaultValue={(props.isEditing && userData?.slug) || ''}
              type="text"
              name="slug"
              placeholder="User Slug /username"
              onChange={() => {
                console.log('asdasd');
              }}
              value={(watch('username') && slugify(watch('username'))) || ''}
              ref={register({ required: false })}
            />
          </FormControl>
        </Box>
      </SimpleGrid>

      <Box my={4}>
        <FormControl id="aboutMe">
          <FormLabel>About Me</FormLabel>
          <Controller
            control={control}
            name="aboutMe"
            defaultValue=""
            render={({ onChange, value }: { onChange: any; value: any }) => (
              <RichText
                isAdmin
                placeholder="about me..."
                onChange={(aboutMe: any) => onChange(aboutMe)}
                value={value || ''}
              />
            )}
          />
        </FormControl>
      </Box>

      <Box my={4}>
        <Button
          mr={2}
          mt={4}
          bg="gray.300"
          color="gray.800"
          onClick={() => router.push('/dashboard')}
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
          Update
        </Button>
      </Box>
    </form>
  );
};
