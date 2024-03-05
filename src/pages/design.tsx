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

export const DesignPage = (props: {
  bg: string;
  color: string;
  blogsData: any;
}) => {
  return (
    <Layout
      title="Design"
      description="We create and deliver handcrafted designs and illustrations in the highest resolutions possible. We offer pixel perfect detail with every client and project"
      bg={props.bg}
      color={props.color}
    >
      <HeroTop
        maxW="4xl"
        title="Design"
        tagline="We create and deliver handcrafted designs and illustrations in the highest resolutions possible. We offer pixel perfect detail with every client and project"
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
            Our Design Process
          </Heading>
          <Text fontSize="lg" fontWeight="normal" mb={4}>
            We follow a design process that works well for our team and clients.
          </Text>
          <SimpleGrid
            mx="auto"
            spacing={{ base: '10', md: '20' }}
            columns={{ base: 1, md: 2, lg: 2, xl: 3, '2xl': 3 }}
          >
            <Stat
              title=""
              value="ENGAGE"
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
                During the Engage phase, we&apos;ll ask a lot of questions, do a
                lot of listening and ultimately learn about your business. We
                need to understand your hopes, fears, and vision for your
                product so we can co-create the best outcomes for you. As a team
                we&apos;ll collaborate on scope, project cadence, and any
                deliverables you&apos;ll need for success.
              </Text>
            </Stat>

            <Stat
              title=""
              value="EXPLORE"
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
                The Explore phase emphasizes collecting as much background
                information as possible by reviewing any relevant accounts,
                demos, and customer research. We&apos;ll fill in the gaps by
                conducting more research on your markets, users, and
                competitors.
              </Text>
            </Stat>

            <Stat
              title=""
              value="DEFINE"
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
                Drawing on what we&apos;ve learned in the Explore phase,
                we&apos;ll identify opportunities that will make the most impact
                on your business. This is where we&apos;ll discuss content you
                have or may need, technical requirements, and brand guidelines
                to consider during user experience and visual design activities
                to bring your project to life.
              </Text>
            </Stat>

            <Stat
              title=""
              value="SOLVE"
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
                Using the knowledge we gathered in the Define phase, we&apos;ll
                start challenging hypotheses, creating solutions, and testing
                them with your target users.
              </Text>
            </Stat>

            <Stat
              title=""
              value="REFINE"
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
                We take solutions from the Solve phase and continue to
                incorporate feedback from your team and user testing. We&apos;ll
                collaborate to make final decisions on UI elements, fine-tune
                UX, and perform QA to ensure the final outputs achieve your
                needs and your users&apos; needs.
              </Text>
            </Stat>

            <Stat
              title=""
              value="SOLVE"
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
                Using the knowledge we gathered in the Define phase, we&apos;ll
                start challenging hypotheses, creating solutions, and testing
                them with your target users.
              </Text>
            </Stat>

            <Stat
              title=""
              value="DELIVER"
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
                We&apos;ll tie up any loose ends and hand over deliverables
                during the Deliver phase. You&apos;ll give us the final sign off
                that you have everything you need after deliverable reviews. We
                understand our clients work with a number of code frameworks
                with different nuances. We&apos;ll make sure to include
                instructions on how to implement HTML, CSS, and JS into your
                existing framework.
              </Text>
            </Stat>

            <Stat
              title=""
              value="SUPPORT"
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
                Implementation can be a hectic time. We understand you need all
                hands on deck to get your product or website live. We&apos;ll be
                here to help you in any way we can from implementation and
                beyond. From ongoing QA to checking progress on achieving your
                KPIs, we want to see you succeed. We&apos;ll be in touch from
                time to time to get feedback about working with us and how we
                can help with your next product challenge.
              </Text>
            </Stat>

            <Stat
              title=""
              value="REFINE"
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
                We take solutions from the Solve phase and continue to
                incorporate feedback from your team and user testing. We&apos;ll
                collaborate to make final decisions on UI elements, fine-tune
                UX, and perform QA to ensure the final outputs achieve your
                needs and your users&apos; needs.
              </Text>
            </Stat>
          </SimpleGrid>
        </Box>
      </Stack>
    </Layout>
  );
};

export default DesignPage;
