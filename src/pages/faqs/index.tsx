import {
  Box,
  Heading,
  Stack,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Skeleton,
  Badge,
} from '@chakra-ui/react';
import { lighten, darken, transparentize } from 'polished';
import { FC } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import db from '@/lib/firebase';
import { GetStaticProps } from 'next';
import { useCollection } from '@nandorojo/swr-firestore';
import parse from 'html-react-parser';
import NextLink from 'next/link';
import { isAdmin } from '@/helpers/index';
import { Layout } from '@/components/Layout';
import { FAQPageJsonLd, BreadcrumbJsonLd } from 'next-seo';
import { FAQDataProps } from 'types';
import { useUser } from '@/hooks/useUser';

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
export interface FaqsPageProps {
  bg: string;
  color: string;
  faqsFBData: any;
}
export const FaqsPage: FC<FaqsPageProps> = ({ bg, color, faqsFBData }) => {
  const { userData } = useUser();
  const router = useRouter();

  const { data: faqsData } = useCollection<FAQDataProps>(
    'faqs',
    { listen: false },
    { initialData: faqsFBData },
  );

  const badgeEnum: Record<string, string> = {
    Clients: 'pink',
    'Government Contracting': 'red',
    'Pricing / Billing': 'green',
    Partnerships: 'blue',
    Careers: 'orange',
    'Software Development': 'purple',
    Legal: 'gray',
    Process: 'teal',
    Contact: 'cyan',
    Design: 'blue',
    'NA / Other': 'gray',
  };

  const faqSchema = faqsFBData.map(
    (faq: { question: string; answer: string }) => ({
      questionName: faq.question.toString(),
      acceptedAnswerText: faq.answer.toString().replace(/<[^>]*>?/gm, ' '),
    }),
  );

  return (
    <>
      {faqsData && faqSchema && userData && (
        <Layout
          title="FAQs"
          description="Below is a list of our most frequently asked questions. If you are unable to find the answer you're seeking, please don't hesitate to contact us."
          bg={bg}
          color={color}
        >
          <FAQPageJsonLd mainEntity={faqSchema} />
          <BreadcrumbJsonLd
            itemListElements={[
              {
                position: 1,
                name: 'Home',
                item: 'https://colorfuldots.com/',
              },
              {
                position: 2,
                name: 'FAQs',
                item: 'https://colorfuldots.com/faqs',
              },
            ]}
          />
          <HeroTop
            maxW="4xl"
            title="Frequently Asked Questions"
            tagline="Below is a list of our most frequently asked questions. If you are unable to find the answer you're seeking, please don't hesitate to contact us."
            breadcrumbs={
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>FAQs</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            }
            actionButton={
              <Button
                onClick={() => router.push('/contact')}
                w={{ base: 'full', md: 'auto' }}
                // colorScheme="whiteAlpha"
                color={color}
                bg={transparentize(0.2, 'hsl(0, 0%, 100%)')}
                borderWidth={0.5}
                borderStyle="dotted"
                boxShadow="base"
                rounded={{ xs: 'full', md: 'full' }}
                size="md"
                fontSize="md"
                fontWeight="bold"
                outline="none"
                _hover={{
                  outline: 'none',
                  bg: lighten(0.05, bg),
                  color: darken(0.05, color),
                  boxShadow: 'outline',
                  borderColor: lighten(0.05, bg),
                }}
                px="8"
              >
                Contact Us
              </Button>
            }
          />

          <Stack
            as="section"
            maxW="7xl"
            mx="auto"
            px={{ base: '6', md: '8' }}
            py={{ base: '5', md: '0' }}
            spacing="12"
          >
            <Accordion allowMultiple>
              {faqsData.map((faq) => (
                <AccordionItem key={faq.id} border="none">
                  <AccordionButton>
                    <Box flex="1" textAlign="left" color={color} py={4}>
                      <Heading as="h3" fontSize={18} mb={2}>
                        {faq.question}
                      </Heading>
                      <Badge
                        variant="outline"
                        fontSize="xs"
                        colorScheme={badgeEnum[faq.category.label]}
                      >
                        {faq.category.label}
                      </Badge>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} color={color} fontSize="lg">
                    <Box className="jobDescription" mt={4}>
                      {parse(faq.answer)}
                    </Box>
                    <Box my={4} alignItems="right">
                      {isAdmin(userData) && (
                        <Button
                          onClick={() =>
                            router.push(`/dashboard/pages/faqs/edit/${faq.id}`)
                          }
                          w={{ base: 'full', md: 'auto' }}
                          // colorScheme="whiteAlpha"
                          color={color}
                          bg={transparentize(0.2, 'hsl(0, 0%, 100%)')}
                          borderWidth={0.5}
                          borderStyle="dotted"
                          boxShadow="base"
                          rounded={{ xs: 'full', md: 'full' }}
                          size="md"
                          fontSize="md"
                          fontWeight="bold"
                          outline="none"
                          _hover={{
                            outline: 'none',
                            bg: lighten(0.05, bg),
                            color: darken(0.05, color),
                            boxShadow: 'outline',
                            borderColor: lighten(0.05, bg),
                          }}
                          px="8"
                        >
                          Edit Faq
                        </Button>
                      )}
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Stack>
        </Layout>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let faqsFBData: {
    id: string;
    question: string;
    answer: string;
    category: { label: string; value: string };
    slug: string;
    visibility: string;
  }[] = [];
  try {
    const querySnapshot = await db
      .collection('faqs')
      .orderBy('category', 'desc')
      .get();

    querySnapshot.forEach((doc) => {
      faqsFBData.push({
        id: doc.id,
        question: doc.data().question,
        answer: doc.data().answer,
        category: doc.data().category,
        slug: doc.data().slug,
        visibility: doc.data().visibility,
      });
    });
  } catch (error) {
    console.log('Error getting documents: ', error);
  }

  return {
    props: {
      faqsFBData,
    },
    revalidate: 1,
  };
};

export default FaqsPage;
