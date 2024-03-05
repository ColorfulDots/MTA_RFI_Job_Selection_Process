import {
  Stack,
  Box,
  Heading,
  SimpleGrid,
  Divider,
  UnorderedList,
  ListItem,
  Skeleton,
  SkeletonCircle,
  Text,
} from '@chakra-ui/react';
import { darken } from 'polished';
import * as React from 'react';
import dynamic from 'next/dynamic';
import { randomColor } from '@/helpers/index';
import { Layout } from '@/components/Layout';

const PartnershipsApplyForm = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.PartnershipsApplyForm),
  {
    ssr: false,
    loading: () => (
      <Stack>
        <Skeleton height="800px" />
      </Stack>
    ),
  },
);

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

export const PartnershipPage = (props: any) => {
  return (
    <Layout
      title="Partnerships"
      description="We connect the dots with complimentary companies that can assist us in completing larger bodies of work or that require additional expertise. If you're interested in working with us, please complete the application below. <br /><br />We look forward to working with you and your company!"
      bg={props.bg}
      color={props.color}
    >
      <HeroTop
        maxW="4xl"
        title="Partnerships"
        tagline="We connect the dots with complimentary companies that can assist us in completing larger bodies of work or that require additional expertise. If you're interested in working with us, please complete the application below. <br /><br />We look forward to working with you and your company!"
      />
      <SimpleGrid columns={[1, 1, 1, 1, 1, 2]}>
        <Box p={10}>
          <Heading fontWeight="medium" color={props.color} mb={8}>
            PARTNER BENEFITS
          </Heading>

          <SimpleGrid columns={[1, 1, 1, 1, 1, 1, 2]} spacing={10}>
            <Stat
              title=""
              value="EXTENDED NETWORK"
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
                When our partnership is formed, we immediately begin to help
                complete common goals and work together towards finding
                additional opportunities.
              </Text>
            </Stat>
            <Stat
              title=""
              value="INCREASED REVENUE"
              color={props.color}
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
                Our partnership program is to help you increase your revenue. We
                are continually expanding our network and connecting the dots
                with companies that are made for a particular body of work or
                project.
              </Text>
            </Stat>
            <Stat
              title=""
              value="INDIRECT SALES"
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
                Our partnership program can help your company elevate your
                affiliate and reseller programs by providing you with an
                enterprise, Government sales pipeline for your goods and
                services.
              </Text>
            </Stat>
            <Stat
              title=""
              value="SHARED KNOWLEDGE"
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
                Our partnership program encourages a shared and open knowledge
                transfer. We often have quarterly technology discussion panels
                to project the current and future state of technology. We focus
                on best practices, avoiding pitfalls, leadership, legalities,
                opportunities and more.
              </Text>
            </Stat>
          </SimpleGrid>
          <Stat
            title=""
            value="SUPPLIER DIVERSITY"
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
              We&apos;re continually expanding our network with corporations
              inside and outside of our scope. Below is a list of the companies
              we&apos;re currently engaged with through their corporate supplier
              diversity programs.
            </Text>
            <Divider
              aria-hidden
              borderWidth="1px"
              borderStyle="dashed"
              my={8}
              borderColor={darken(0.05, props.color?.toString())}
            />

            <SimpleGrid columns={[1, 2, 3, 2, 3, 3]} spacing={10}>
              <UnorderedList>
                <ListItem>Google</ListItem>
                <ListItem>Facebook</ListItem>
                <ListItem>Amazon</ListItem>
                <ListItem>Ford</ListItem>
                <ListItem>GM</ListItem>
                <ListItem>3M</ListItem>
                <ListItem>Walmart</ListItem>
                <ListItem>Raytheon</ListItem>
                <ListItem>AT&amp;T</ListItem>
                <ListItem>Verizon</ListItem>
                <ListItem>Microsoft</ListItem>
                <ListItem>Apple</ListItem>
                <ListItem>Staples</ListItem>
                <ListItem>Visa</ListItem>
              </UnorderedList>
              <UnorderedList>
                <ListItem>Capital One</ListItem>
                <ListItem>Disney</ListItem>
                <ListItem>Cisco</ListItem>
                <ListItem>IBM</ListItem>
                <ListItem>PSEG</ListItem>
                <ListItem>BMW</ListItem>
                <ListItem>General Dynamics</ListItem>
                <ListItem>Chase</ListItem>
                <ListItem>Lockheed Martin</ListItem>
                <ListItem>Johnson &amp; Johnson</ListItem>
                <ListItem>Coca-cola</ListItem>
                <ListItem>Starbucks</ListItem>
                <ListItem>Boeing</ListItem>
                <ListItem>Delta Airlines</ListItem>
              </UnorderedList>
              <UnorderedList>
                <ListItem>Bank of America</ListItem>
                <ListItem>Citi Group</ListItem>
                <ListItem>Comcast</ListItem>
                <ListItem>Dell</ListItem>
                <ListItem>Intel</ListItem>
                <ListItem>McDonalds</ListItem>
                <ListItem>Marriot</ListItem>
                <ListItem>Macy’s</ListItem>
                <ListItem>Xerox </ListItem>
                <ListItem>Wells Fargo</ListItem>
                <ListItem>Toyota </ListItem>
                <ListItem>Shell Oil</ListItem>
                <ListItem>PepisCo</ListItem>
                <ListItem>Johnson Controls</ListItem>
              </UnorderedList>
            </SimpleGrid>
          </Stat>
        </Box>
        <Box bg={props.bg} p={10}>
          <Heading fontWeight="medium" color={props.color} mb={8}>
            APPLY
          </Heading>
          <PartnershipsApplyForm {...props} />
        </Box>
      </SimpleGrid>
    </Layout>
  );
};

export default PartnershipPage;
