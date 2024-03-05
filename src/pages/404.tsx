import {
  Box,
  Center,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { randomColor } from '@/helpers/index';
import { Layout } from '@/components/Layout';
import * as React from 'react';

const DotIcon = dynamic<any>(
  () => import('@/components/DotIcon').then((mod) => mod.DotIcon),
  { ssr: false, loading: () => <SkeletonCircle size="30" /> },
);

const HeroTop = dynamic<any>(
  () => import('@/components/HeroTop').then((mod) => mod.HeroTop),
  {
    ssr: false,
    loading: () => (
      <Stack>
        <Skeleton height="875px" />
      </Stack>
    ),
  },
);

export const Custom404 = (props: any) => {
  const errorFill = randomColor();
  return (
    <Layout
      title="Error 404!"
      description="There has been an error!"
      bg={props.bg}
      color={props.color}
    >
      <HeroTop
        maxW="4xl"
        title="ERROR 404!"
        tagline="The page you've requested could not be found. <br/><br/>Please check your
        spelling and try again."
      />
      <Center>
        <Stack direction={['column', 'row']} spacing={10}>
          <Box>
            <Text fontSize={[100, 160, 200, 240]} color={errorFill}>
              4
            </Text>
          </Box>
          <Box>
            <DotIcon
              boxSize={[100, 100, 200, 200]}
              rounded={[100, 100, 200, 200]}
              bg={errorFill}
              noLink
              mt={20}
            />
          </Box>
          <Box>
            <Text fontSize={[100, 160, 200, 240]} color={errorFill}>
              4
            </Text>
          </Box>
        </Stack>
      </Center>
    </Layout>
  );
};

export default Custom404;
