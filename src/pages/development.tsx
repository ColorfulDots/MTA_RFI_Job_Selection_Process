import {
  Box,
  Text,
  Stack,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  Heading,
} from '@chakra-ui/react';
import * as React from 'react';
import dynamic from 'next/dynamic';
import { randomColor } from '@/helpers/index';
import { Layout } from '@/components/Layout';

const Stat = dynamic<any>(
  () => import('@/components/Stat').then((mod) => mod.Stat),
  {
    ssr: false,
    loading: () => (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    ),
  },
);

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
export const DevelopmentPage = (props: {
  bg: string;
  color: string;
  blogsData: any;
}) => {
  return (
    <Layout
      title="Development"
      description="We've been developing custom software for nearly two decades. Throughout our time, we have seen the industry explode. It is our role to stay current with technology and provide our clients with our collected knowledge to help them leverage the number one seat in their respective markets."
      bg={props.bg}
      color={props.color}
    >
      <HeroTop
        maxW="4xl"
        title="Development"
        tagline="We've been developing custom software for nearly two decades. Throughout our time, we have seen the industry explode. It is our role to stay current with technology and provide our clients with our collected knowledge to help them leverage the number one seat in their respective markets."
      />

      <Stack
        as="section"
        mx="auto"
        px={{ base: '6', md: '8' }}
        py={{ base: '12', md: '20' }}
        spacing="12"
      >
        <Box>
          <Heading fontWeight="medium" color={props.color} mb={4}>
            Our Development Process
          </Heading>
          <Text fontSize="lg" fontWeight="normal" mb={4}>
            We follow a software development process that works well for our
            team and clients.
          </Text>
          <SimpleGrid
            mx="auto"
            spacing={{ base: '10', md: '20' }}
            columns={{ base: 1, md: 1, lg: 1, xl: 2, '2xl': 2 }}
          >
            <Stat
              title=""
              value="REQUIREMENT ANALYSIS"
              color={props.color}
              mb={4}
              position="relative"
            >
              <DotIcon
                position="absolute"
                top={12}
                left={-5}
                boxSize={10}
                bg={`${randomColor()}`}
              />
              <Text fontSize="lg" fontWeight="normal">
                In the requirement analysis phase we will ask some difficult
                questions, so be prepared to know your business and industry
                inside and out. These questions will help us better understand
                your industry, product, service, risks, legalities, audience,
                timeline, budget, competition, expectations and more.
              </Text>
              <Text fontSize="lg" fontWeight="normal" mt={4}>
                Once we have these questions answered and fully understood, we
                will then create a Product Requirement Document that will serve
                as a guideline for all stake holders to follow.
              </Text>
            </Stat>

            <Stat
              title=""
              value="SOFTWARE DEVELOPMENT"
              color={props.color}
              mb={4}
              position="relative"
            >
              <DotIcon
                position="absolute"
                top={12}
                left={-5}
                boxSize={10}
                bg={`${randomColor()}`}
              />
              <Text fontSize="lg" fontWeight="normal">
                Once we have reached the Software Development Phase in our
                process our clients will start to see less engagement from our
                team in terms of directly interfacing our clients and their
                teams. Naturally, software development requires complete focus,
                attention to detail, and developers work best with a fully
                prepared Product Requirement Document which guides them through
                the process which at this point shouldn&apos;t introduce changes
                to the product scope.
              </Text>
              <Text fontSize="lg" fontWeight="normal" mt={4}>
                Throughout this phase, we may ask our clients to test, review,
                and provide feedback on progress that will be visible on private
                staging and development environments.
              </Text>
            </Stat>

            <Stat
              title=""
              value="TESTING"
              color={props.color}
              mb={4}
              position="relative"
            >
              <DotIcon
                position="absolute"
                top={12}
                left={-5}
                boxSize={10}
                bg={`${randomColor()}`}
              />
              <Text fontSize="lg" fontWeight="normal">
                After the code is developed it is tested against the
                requirements to make sure that the product is actually solving
                the needs addressed and gathered during the requirements phase.
                During this phase all types of functional testing like unit
                testing, integration testing, system testing, acceptance testing
                are done as well as non-functional testing are also done.
              </Text>
            </Stat>

            <Stat
              title=""
              value="DEPLOYMENT"
              color={props.color}
              mb={4}
              position="relative"
            >
              <DotIcon
                position="absolute"
                top={12}
                left={-5}
                boxSize={10}
                bg={`${randomColor()}`}
              />
              <Text fontSize="lg" fontWeight="normal">
                After successful testing the product is delivered / deployed to
                the customer for their use.
              </Text>
              <Text fontSize="lg" fontWeight="normal" mt={4}>
                As soon as the product is given to the customers they will first
                do the beta testing. If any changes are required or if any bugs
                are caught, then they will report it to the engineering team.
                Once those changes are made or the bugs are fixed then the final
                deployment will happen.
              </Text>
            </Stat>

            <Stat
              title=""
              value="MAINTENANCE"
              color={props.color}
              mb={4}
              position="relative"
            >
              <DotIcon
                position="absolute"
                top={12}
                left={-5}
                boxSize={10}
                bg={`${randomColor()}`}
              />
              <Text fontSize="lg" fontWeight="normal">
                Once when the customers starts using the developed system then
                the actual problems comes up and needs to be solved from time to
                time. This process where the care is taken for the developed
                product is known as maintenance.
              </Text>
            </Stat>

            <Stat
              title=""
              value="REPEAT"
              color={props.color}
              mb={4}
              position="relative"
            >
              <DotIcon
                position="absolute"
                top={12}
                left={-5}
                boxSize={10}
                bg={`${randomColor()}`}
              />
              <Text fontSize="lg" fontWeight="normal">
                After the phases of software development have been completed, we
                now continue on to the top of the process again and make
                refinements based on user feedback and other gathered metrics.
              </Text>
            </Stat>
          </SimpleGrid>
        </Box>
      </Stack>
    </Layout>
  );
};

export default DevelopmentPage;
