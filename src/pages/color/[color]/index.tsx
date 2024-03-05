import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Table,
  Skeleton,
  Tbody,
  Tr,
  Td,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Badge,
  SkeletonCircle,
  AspectRatio,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  Text,
  Box,
  Flex,
  Heading,
  Img,
  SimpleGrid,
  Stack,
  Wrap,
} from '@chakra-ui/react';
import {
  FaFacebook,
  FaLinkedinIn,
  FaReddit,
  FaTumblr,
  FaTwitter,
} from 'react-icons/fa';
import tinycolor from 'tinycolor2';
import { createRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { lighten, darken, transparentize } from 'polished';
import {
  DisplayAnalogousColors,
  DisplayMonochromaticColors,
  DisplaySplitComplimentColors,
  DisplayTriadColors,
  DisplayTetradColors,
  DisplayComplimentColors,
  DisplaySpinColors,
  DisplayLightenColors,
  DisplayDarkenColors,
  DisplayDesaturateColors,
  DisplaySaturateColors,
} from '@/helpers/colors';
import { Layout } from '@/components/Layout';
import { ProductJsonLd, BreadcrumbJsonLd } from 'next-seo';
import { useRandomName } from '@/hooks/useRandomName';
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TumblrShareButton,
  TwitterShareButton,
} from 'react-share';
import { useColors } from '@/hooks/useColors';
import { randomDate, getRandomIntInclusive } from '@/helpers/index';

const UX = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.UX),
  {
    ssr: false,
    loading: () => (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    ),
  },
);

const UX2 = dynamic<any>(
  () => import('@/components/index').then((mod) => mod.UX2),
  {
    ssr: false,
    loading: () => (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
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

const HeroTop = dynamic<any>(
  () => import('@/components/HeroTop').then((mod) => mod.HeroTop),
  {
    ssr: false,
    loading: () => (
      <Stack>
        <Skeleton height="801px" />
      </Stack>
    ),
  },
);

const DotIcon = dynamic<any>(
  () => import('@/components/DotIcon').then((mod) => mod.DotIcon),
  { ssr: false, loading: () => <SkeletonCircle size="30" /> },
);

export const ColorsDetailPage = (props: any) => {
  const router = useRouter();
  const dotRef = createRef();

  const { primaryColor, tinyPrimaryColor, fgColor, ColorName, cmyk_value } =
    useColors(router.query.color);

  const { register, handleSubmit } = useForm({});
  const onSubmit = (data: any) => {
    router.push(`/color/${data.colorInput.substring(1)}`);
  };

  const postImage = `https://cd-image-service-v2021.vercel.app/og.jpeg?title=${ColorName}&bgColor=${router.query.color}`;

  return (
    <>
      {primaryColor && ColorName && (
        <Layout
          title={`${ColorName} | Hex Color: ${tinyPrimaryColor.toHexString()}`}
          description={`Explore the color name: ${ColorName} | Hex: ${tinyPrimaryColor.toHexString()} | RGB: ${tinyPrimaryColor.toRgbString()}. Explore, mix, share, and analyze color combinations, color properties and more`}
          bg={props.bg}
          color={props.color}
          postImage={postImage}
        >
          <BreadcrumbJsonLd
            itemListElements={[
              {
                position: 1,
                name: 'Home',
                item: '/',
              },
              {
                position: 2,
                name: 'Labs',
                item: '/labs',
              },
              {
                position: 3,
                name: 'Colors',
                item: '/colors',
              },
              {
                position: 4,
                name: `Color ${ColorName} / ${router.query.color}`,
                item: `/color/${router.query.color}`,
              },
            ]}
          />
          <ProductJsonLd
            productName={`${ColorName} | Hex Color: ${tinyPrimaryColor.toHexString()}`}
            images={[postImage]}
            description={`Explore the color ${ColorName} | ${tinyPrimaryColor.toHexString()} | ${tinyPrimaryColor.toRgbString()}. Explore, mix, share, and analyze color combinations, color properties and more.`}
            brand="COLORFUL DOTS, LLC"
            color={`${ColorName} | Hex Color: ${tinyPrimaryColor.toHexString()}`}
            manufacturerName="Colorful Dots, LLC"
            manufacturerLogo="https://colorfuldots.s3.amazonaws.com/cd-assets/icons/2021/maskable_icon.png"
            material="digital"
            reviews={[
              {
                author: {
                  type: 'Person',
                  name:
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useRandomName() +
                    ' ' +
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useRandomName().toString().substring(0, 1) +
                    '.',
                },
                datePublished: `${randomDate(
                  new Date('10-10-2020 10:30'),
                  new Date('12-10-2021 02:10'),
                )}`, //  '2017-01-06T03:37:40Z',
                reviewBody: '',
                name: '',
                reviewRating: {
                  bestRating: `5`,
                  ratingValue: `${getRandomIntInclusive(0.5, 5).toString()}`,
                  worstRating: '0.5',
                },
                publisher: {
                  type: 'Organization',
                  name: 'Colorful Dots, LLC',
                },
              },
            ]}
            aggregateRating={{
              ratingValue: `${getRandomIntInclusive(1, 5).toString()}`,
              reviewCount: `${getRandomIntInclusive(1, 2000).toString()}`,
            }}
            offers={[
              {
                price: '0',
                priceCurrency: 'USD',
                priceValidUntil: '2023-01-01',
                itemCondition: 'https://schema.org/NewCondition',
                availability: 'https://schema.org/OnlineOnly',
                url: `/color/${router.query.color}`,
                seller: {
                  name: 'Colorful Dots, LLC',
                },
              },
            ]}
            mpn={`${router.query.color}`}
            sku={`COLOR_HEX_${router.query.color}`}
          />
          <HeroTop
            rootBgColor={tinyPrimaryColor.toHexString()}
            rootColor={fgColor}
            maxW="7xl"
            title={`${ColorName} / ${router.query.color}`}
            tagline={`Explore, mix, and design your products with beautiful and accurate colors`}
            badges={
              <Wrap spacing="10px" direction="row">
                <Badge
                  fontSize="md"
                  bg={lighten(0.05, tinyPrimaryColor.toHexString())}
                  color={fgColor}
                  borderColor={darken(0.05, tinyPrimaryColor.toHexString())}
                  borderWidth={3}
                  rounded="md"
                >
                  {ColorName}
                </Badge>
                <Badge
                  fontSize="md"
                  bg={lighten(0.05, tinyPrimaryColor.toHexString())}
                  color={fgColor}
                  borderColor={darken(0.05, tinyPrimaryColor.toHexString())}
                  borderWidth={3}
                  rounded="md"
                >
                  #{router.query.color}
                </Badge>
                <Badge
                  fontSize="md"
                  bg={lighten(0.05, tinyPrimaryColor.toHexString())}
                  color={fgColor}
                  borderColor={darken(0.05, tinyPrimaryColor.toHexString())}
                  borderWidth={3}
                  rounded="md"
                >
                  {tinyPrimaryColor.toRgbString()}
                </Badge>
              </Wrap>
            }
            actionButton={
              <>
                <Box
                  w="full"
                  bg={darken(0.05, tinyPrimaryColor.toHexString())}
                  p={4}
                  rounded="full"
                >
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup size="lg">
                      <Input
                        defaultValue={`#${primaryColor}`}
                        rounded="full"
                        pr="11.8rem"
                        type="color"
                        name="colorInput"
                        outline="none"
                        borderWidth="0"
                        borderColor="transparent"
                        cursor="pointer"
                        _focus={{ shadow: 'none', outline: 'none' }}
                        ref={register}
                      />
                      <InputRightElement width="11.8rem">
                        <Button
                          type="submit"
                          w={{ base: 'auto', md: 'auto' }}
                          color={props.color}
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
                            bg: lighten(0.05, props.bg),
                            color: darken(0.05, props.color),
                            boxShadow: 'outline',
                            borderColor: lighten(0.05, props.bg),
                          }}
                        >
                          COLOR SEARCH
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </form>
                </Box>
                {/* <Box>
                  <AdSense.Google
                    client="ca-pub-4634478525984454"
                    slot="9651910616"
                    style={{ display: 'block' }}
                    format="auto"
                    responsive="true"
                  />
                </Box> */}
              </>
            }
            breadcrumbs={
              <Breadcrumb mt={4}>
                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href="/colors">
                    Colors
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>
                    Color {ColorName} / {router.query.color}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            }
          />

          <SimpleGrid columns={[1, 1, 1, 2, 2]}>
            <Box p={8}>
              {/* left  */}
              <SimpleGrid columns={[1, 1, 1, 1, 1]}>
                <Box mb={8}>
                  <Stat as="h2" title="" value="RGB" color={props.color}>
                    {/* start color bar graph */}
                    <Box>
                      <Box w="full">
                        <Flex>
                          <Box bg="gray.200" p={2} minW="80px">
                            <Text color="black">
                              R{' '}
                              {parseInt(
                                tinyPrimaryColor.toPercentageRgb().r,
                                10,
                              )}
                              %
                            </Text>
                          </Box>

                          <Box
                            bg="#ff0000"
                            w={`${parseInt(
                              tinyPrimaryColor.toPercentageRgb().r,
                              10,
                            )}%`}
                            py={2}
                          ></Box>
                        </Flex>
                      </Box>
                    </Box>
                    {/* end color bar graph */}

                    {/* start color bar graph */}
                    <Box my={2}>
                      <Box w="full">
                        <Flex>
                          <Box bg="gray.200" p={2} minW="80px">
                            <Text color="black">
                              G{' '}
                              {parseInt(
                                tinyPrimaryColor.toPercentageRgb().g,
                                10,
                              )}
                              %
                            </Text>
                          </Box>

                          <Box
                            bg="#00ff00"
                            w={`${parseInt(
                              tinyPrimaryColor.toPercentageRgb().g,
                              10,
                            )}%`}
                            py={2}
                          ></Box>
                        </Flex>
                      </Box>
                    </Box>
                    {/* end color bar graph */}

                    {/* start color bar graph */}
                    <Box>
                      <Box w="full">
                        <Flex>
                          <Box bg="gray.200" p={2} minW="80px">
                            <Text color="black">
                              B{' '}
                              {parseInt(
                                tinyPrimaryColor.toPercentageRgb().b,
                                10,
                              )}
                              %
                            </Text>
                          </Box>

                          <Box
                            bg="#0000ff"
                            w={`${parseInt(
                              tinyPrimaryColor.toPercentageRgb().b,
                              10,
                            )}%`}
                            py={2}
                          ></Box>
                        </Flex>
                      </Box>
                    </Box>
                    {/* end color bar graph */}
                  </Stat>
                </Box>

                <Box>
                  <Stat as="h2" title="" value="CMYK" color={props.color}>
                    {/* start color bar graph */}
                    <Box>
                      <Box w="full">
                        <Flex>
                          <Box bg="gray.200" p={2} minW="80px">
                            <Text color="black">
                              C {cmyk_value.slice(0, 1)}%
                            </Text>
                          </Box>

                          <Box
                            bg="cyan"
                            w={`${cmyk_value.slice(0, 1)}%`}
                            py={2}
                          ></Box>
                        </Flex>
                      </Box>
                      {/* end color bar graph */}

                      {/* start color bar graph */}
                      <Box my={2}>
                        <Box w="full">
                          <Flex>
                            <Box bg="gray.200" p={2} minW="80px">
                              <Text color="black">
                                M {cmyk_value.slice(1, 2)}%
                              </Text>
                            </Box>

                            <Box
                              bg="magenta"
                              w={`${cmyk_value.slice(1, 2)}%`}
                              py={2}
                            ></Box>
                          </Flex>
                        </Box>
                      </Box>
                      {/* end color bar graph */}

                      {/* start color bar graph */}
                      <Box>
                        <Box w="full">
                          <Flex>
                            <Box bg="gray.200" p={2} minW="80px">
                              <Text color="black">
                                Y {cmyk_value.slice(2, 3)}%
                              </Text>
                            </Box>

                            <Box
                              bg="yellow"
                              w={`${cmyk_value.slice(2, 3)}%`}
                              py={2}
                            ></Box>
                          </Flex>
                        </Box>
                      </Box>
                      {/* end color bar graph */}

                      {/* start color bar graph */}
                      <Box mt={2}>
                        <Box w="full">
                          <Flex>
                            <Box bg="gray.200" p={2} minW="80px">
                              <Text color="black">
                                K {cmyk_value.slice(3, 4)}%
                              </Text>
                            </Box>

                            <Box
                              bg="black"
                              w={`${cmyk_value.slice(3, 4)}%`}
                              py={2}
                            ></Box>
                          </Flex>
                        </Box>
                      </Box>
                      {/* end color bar graph */}
                    </Box>
                  </Stat>
                </Box>
              </SimpleGrid>
              <Stat
                as="h2"
                title=""
                value="UI/UX EXAMPLES"
                color={props.color}
                mt={8}
              >
                <SimpleGrid columns={[1, 1, 1, 1, 2]} spacing={10} mt={8}>
                  <Box>
                    <AspectRatio>
                      <UX fill={tinyPrimaryColor.toHexString()} />
                    </AspectRatio>
                  </Box>

                  <Box>
                    <AspectRatio>
                      <UX2
                        fill={tinyPrimaryColor.toHexString()}
                        fill2={DisplayTetradColors(primaryColor)[0]}
                        fill3={DisplayTetradColors(primaryColor)[1]}
                        fill4={DisplayTetradColors(primaryColor)[2]}
                        fill5={DisplayTetradColors(primaryColor)[3]}
                      />
                    </AspectRatio>
                  </Box>
                </SimpleGrid>
              </Stat>

              {postImage && (
                <SimpleGrid columns={[1, 1, 1, 1, 1]} spacing={10} mt={8}>
                  <Box>
                    <Stat
                      as="h2"
                      title=""
                      value="SOCIAL SHARE"
                      color={props.color}
                    >
                      <Box
                        rounded="2xl"
                        overflow="hidden"
                        bg={tinyPrimaryColor.toHexString()}
                        p={4}
                      >
                        <Img
                          loading="lazy"
                          boxSize="100%"
                          objectFit="contain"
                          alt={ColorName}
                          src={postImage}
                        />
                      </Box>
                      <Box mt={4} textAlign="center">
                        <Text>Show off your true colors - share it!</Text>

                        <HStack mt={4} justify="center" align="center">
                          <TwitterShareButton
                            via="ColorfulDotsHQ"
                            hashtags={['colors']}
                            url={`https://colorfuldots.com/color/${router.query.color}`}
                            title={`${ColorName} | Hex Color: ${tinyPrimaryColor.toHexString()}`}
                          >
                            <FaTwitter size={24} color="#1DA1F2" />
                          </TwitterShareButton>

                          <FacebookShareButton
                            hashtag="colorfuldots"
                            url={`https://colorfuldots.com/color/${router.query.color}`}
                            title={`${ColorName} | Hex Color: ${tinyPrimaryColor.toHexString()}`}
                          >
                            <FaFacebook size={24} color="#3c5a99" />
                          </FacebookShareButton>

                          <LinkedinShareButton
                            url={`https://colorfuldots.com/color/${router.query.color}`}
                            title={`${ColorName} | Hex Color: ${tinyPrimaryColor.toHexString()}`}
                            summary={`Explore the color ${ColorName} | ${tinyPrimaryColor.toHexString()} | ${tinyPrimaryColor.toRgbString()}. Explore, mix, share, and analyze color combinations, color properties and more. `}
                          >
                            <FaLinkedinIn size={24} color="#0e76a8" />
                          </LinkedinShareButton>

                          <RedditShareButton
                            url={`https://colorfuldots.com/color/${router.query.color}`}
                            title={`${ColorName} | Hex Color: ${tinyPrimaryColor.toHexString()}`}
                          >
                            <FaReddit size={24} color="#FF4500" />
                          </RedditShareButton>

                          <TumblrShareButton
                            caption="ColorfulDotsHQ"
                            posttype="link"
                            tags={['colors']}
                            url={`https://colorfuldots.com/color/${router.query.color}`}
                            title={`${ColorName} | Hex Color: ${tinyPrimaryColor.toHexString()}`}
                          >
                            <FaTumblr size={24} color="#35465C" />
                          </TumblrShareButton>
                        </HStack>
                      </Box>
                    </Stat>
                  </Box>
                </SimpleGrid>
              )}

              <SimpleGrid columns={[1, 1, 1, 1, 1]} spacing={10} mt={8}>
                <Box>
                  <Stat
                    as="h2"
                    title=""
                    value="BOX EXAMPLES"
                    color={props.color}
                  >
                    <Box textAlign="center" bg={tinyPrimaryColor.toHexString()}>
                      <Text color={fgColor} p={4}>
                        Example with background color
                      </Text>
                    </Box>

                    <Box
                      textAlign="center"
                      borderColor={tinyPrimaryColor.toHexString()}
                      borderWidth={2}
                      my={4}
                    >
                      <Text p={4} color={props.color}>
                        Example with colored border
                      </Text>
                    </Box>
                  </Stat>
                </Box>
              </SimpleGrid>

              <SimpleGrid columns={[1, 1, 1, 1, 1]} spacing={10} mt={8}>
                <Box>
                  <Stat
                    as="h2"
                    title=""
                    value="ACCORDION EXAMPLE"
                    color={props.color}
                  >
                    <Accordion>
                      <AccordionItem bg={tinyPrimaryColor.toHexString()}>
                        <h2>
                          <AccordionButton
                            borderColor={tinyPrimaryColor.toHexString()}
                          >
                            <Box
                              flex="1"
                              textAlign="left"
                              color={fgColor}
                              p={4}
                            >
                              Example with background color
                            </Box>
                            <AccordionIcon color={fgColor} />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel p={4} color={fgColor}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </AccordionPanel>
                      </AccordionItem>

                      <AccordionItem mt={4}>
                        <h2>
                          <AccordionButton
                            borderColor={tinyPrimaryColor.toHexString()}
                            borderWidth={2}
                          >
                            <Box flex="1" textAlign="left" p={4}>
                              Example with border color
                            </Box>
                            <AccordionIcon color={fgColor} />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel
                          p={4}
                          borderColor={tinyPrimaryColor.toHexString()}
                          borderBottomWidth={2}
                          borderRightWidth={2}
                          borderLeftWidth={2}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Stat>
                </Box>
                {/* <Box>
                  <AdSense.Google
                    client="ca-pub-4634478525984454"
                    slot="9651910616"
                    style={{ display: 'block' }}
                    format="auto"
                    responsive="true"
                  />
                </Box> */}
              </SimpleGrid>
            </Box>
            <Box p={8}>
              {/* right */}
              <Box mb={8}>
                <Stat
                  as="h2"
                  title=""
                  value="COLOR CONVERSIONS"
                  color={props.color}
                >
                  <Table size="lg" variant="simple">
                    <Tbody>
                      <Tr>
                        <Td>
                          <Heading fontSize="md">Color Conversions</Heading>
                        </Td>
                        <Td>
                          <Heading fontSize="md">Color Values</Heading>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Hex</Td>
                        <Td>{tinyPrimaryColor.toHexString()}</Td>
                      </Tr>
                      <Tr>
                        <Td>RGB</Td>
                        <Td>{tinyPrimaryColor.toRgbString()}</Td>
                      </Tr>
                      <Tr>
                        <Td>RGB %</Td>
                        <Td>{tinyPrimaryColor.toPercentageRgbString()}</Td>
                      </Tr>
                      <Tr>
                        <Td>CMYK</Td>
                        <Td>
                          {cmyk_value.slice(0, 1)}, {cmyk_value.slice(1, 2)},{' '}
                          {cmyk_value.slice(2, 3)}, {cmyk_value.slice(3, 4)}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>HSL</Td>
                        <Td>{tinyPrimaryColor.toHslString()}</Td>
                      </Tr>
                      <Tr>
                        <Td>HSV (or HSB)</Td>
                        <Td>{tinyPrimaryColor.toHsvString()}</Td>
                      </Tr>
                      <Tr>
                        <Td>Brightness</Td>
                        <Td>{tinyPrimaryColor.getBrightness()}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Stat>
              </Box>

              <SimpleGrid columns={[1, 1, 1, 1, 3]} spacing={10} mb={8}>
                <Box>
                  <Stat
                    as="h2"
                    title=""
                    value="SPIN 90&deg;"
                    color={props.color}
                  >
                    <DotIcon
                      boxSize={10}
                      bg={DisplaySpinColors(primaryColor, 90)}
                      ref={dotRef}
                    />
                  </Stat>
                </Box>
                <Box>
                  <Stat
                    as="h2"
                    title=""
                    value="SPIN 180&deg;"
                    color={props.color}
                  >
                    <DotIcon
                      boxSize={10}
                      bg={DisplaySpinColors(primaryColor, 180)}
                      ref={dotRef}
                    />
                  </Stat>
                </Box>
                <Box>
                  <Stat
                    as="h2"
                    title=""
                    value="SPIN -90&deg;"
                    color={props.color}
                  >
                    <DotIcon
                      boxSize={10}
                      bg={DisplaySpinColors(primaryColor, -90)}
                      ref={dotRef}
                    />
                  </Stat>
                </Box>
              </SimpleGrid>

              <SimpleGrid columns={[1, 1, 1, 1, 1, 2]} spacing={10}>
                <Box>
                  <Stat
                    as="h2"
                    title=""
                    value="COMPLIMENTARY"
                    color={props.color}
                  >
                    <Box>
                      {/* <DotIcon
                        boxSize={10}
                        bg={`${tinyPrimaryColor.toHexString()}`}
                        ref={dotRef}
                      /> */}
                      <DotIcon
                        boxSize={10}
                        bg={DisplayComplimentColors(primaryColor)}
                        ref={dotRef}
                      />
                    </Box>
                  </Stat>
                </Box>

                <Box>
                  <Stat
                    as="h2"
                    title=""
                    value="SPLIT COMPLIMENT"
                    color={props.color}
                  >
                    <Box>
                      <DotIcon
                        boxSize={10}
                        bg={DisplaySplitComplimentColors(primaryColor)[1]}
                        ref={dotRef}
                      />
                      <DotIcon
                        boxSize={10}
                        bg={DisplaySplitComplimentColors(primaryColor)[2]}
                        ref={dotRef}
                      />
                    </Box>
                  </Stat>
                </Box>

                <Box>
                  <Stat as="h2" title="" value="ANALOGOUS" color={props.color}>
                    <Box>
                      <DotIcon
                        boxSize={10}
                        bg={DisplayAnalogousColors(primaryColor)[1]}
                        ref={dotRef}
                      />
                      <DotIcon
                        boxSize={10}
                        bg={DisplayAnalogousColors(primaryColor)[2]}
                        ref={dotRef}
                      />
                    </Box>
                  </Stat>
                </Box>

                <Box>
                  <Stat as="h2" title="" value="TRIAD" color={props.color}>
                    <Box>
                      <DotIcon
                        boxSize={10}
                        bg={DisplayTriadColors(primaryColor)[1]}
                        ref={dotRef}
                      />
                      <DotIcon
                        boxSize={10}
                        bg={DisplayTriadColors(primaryColor)[2]}
                        ref={dotRef}
                      />
                    </Box>
                  </Stat>
                </Box>

                <Box>
                  <Stat as="h2" title="" value="TETRAD" color={props.color}>
                    <Box>
                      <DotIcon
                        boxSize={10}
                        bg={DisplayTetradColors(primaryColor)[1]}
                        ref={dotRef}
                      />
                      <DotIcon
                        boxSize={10}
                        bg={DisplayTetradColors(primaryColor)[2]}
                        ref={dotRef}
                      />
                      <DotIcon
                        boxSize={10}
                        bg={DisplayTetradColors(primaryColor)[3]}
                        ref={dotRef}
                      />
                    </Box>
                  </Stat>
                </Box>

                <Box>
                  <Stat
                    as="h2"
                    title=""
                    value="MONOCHROMATIC"
                    color={props.color}
                  >
                    {DisplayMonochromaticColors(primaryColor).map(
                      (color, i) => {
                        return (
                          <DotIcon
                            key={i}
                            boxSize={10}
                            bg={`${color}`}
                            ref={dotRef}
                          />
                        );
                      },
                    )}
                  </Stat>
                </Box>

                <Box>
                  <Stat as="h2" title="" value="SHADE" color={props.color}>
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayDarkenColors(primaryColor, 0)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayDarkenColors(primaryColor, 5)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayDarkenColors(primaryColor, 10)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayDarkenColors(primaryColor, 15)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayDarkenColors(primaryColor, 20)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayDarkenColors(primaryColor, 25)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayDarkenColors(primaryColor, 30)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayDarkenColors(primaryColor, 35)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayDarkenColors(primaryColor, 40)}`}
                      ref={dotRef}
                    />
                  </Stat>
                </Box>

                <Box>
                  <Stat as="h2" title="" value="TINT" color={props.color}>
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayLightenColors(primaryColor, 0)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayLightenColors(primaryColor, 5)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayLightenColors(primaryColor, 10)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayLightenColors(primaryColor, 15)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayLightenColors(primaryColor, 20)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayLightenColors(primaryColor, 25)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayLightenColors(primaryColor, 30)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayLightenColors(primaryColor, 35)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayLightenColors(primaryColor, 40)}`}
                      ref={dotRef}
                    />
                  </Stat>
                </Box>

                <Box>
                  <Stat as="h2" title="" value="DESATURATE" color={props.color}>
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayDesaturateColors(primaryColor, 0)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayDesaturateColors(primaryColor, 5)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayDesaturateColors(primaryColor, 10)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayDesaturateColors(primaryColor, 15)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayDesaturateColors(primaryColor, 20)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayDesaturateColors(primaryColor, 25)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayDesaturateColors(primaryColor, 30)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayDesaturateColors(primaryColor, 35)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplayDesaturateColors(primaryColor, 40)}`}
                      ref={dotRef}
                    />
                  </Stat>
                </Box>

                <Box>
                  <Stat as="h2" title="" value="SATURATE" color={props.color}>
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplaySaturateColors(primaryColor, 0)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplaySaturateColors(primaryColor, 5)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplaySaturateColors(primaryColor, 10)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplaySaturateColors(primaryColor, 15)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplaySaturateColors(primaryColor, 20)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplaySaturateColors(primaryColor, 25)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplaySaturateColors(primaryColor, 30)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplaySaturateColors(primaryColor, 35)}`}
                      ref={dotRef}
                    />
                    <DotIcon
                      boxSize={10}
                      bg={`${DisplaySaturateColors(primaryColor, 40)}`}
                      ref={dotRef}
                    />
                  </Stat>
                </Box>

                <Box>
                  <Stat
                    as="h2"
                    title="BLACK"
                    value="CONTRAST RATIO"
                    color={props.color}
                  >
                    {tinycolor.readability(
                      tinyPrimaryColor.toHexString(),
                      '#000000',
                    )}
                  </Stat>
                </Box>

                <Box>
                  <Stat
                    as="h2"
                    title="WHITE"
                    value="CONTRAST RATIO"
                    color={props.color}
                  >
                    {tinycolor.readability(
                      tinyPrimaryColor.toHexString(),
                      '#ffffff',
                    )}
                  </Stat>
                </Box>
              </SimpleGrid>
            </Box>
          </SimpleGrid>
        </Layout>
      )}
    </>
  );
};

export default ColorsDetailPage;
