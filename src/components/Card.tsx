import {
  Text,
  Box,
  Stack,
  Divider,
  Heading,
  SkeletonCircle,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRandomColor } from '@/hooks/useRandomColor';
import { FC } from 'react';
import { lighten, darken } from 'polished';
import { truncateString } from '../helpers';
import dynamic from 'next/dynamic';
import parse from 'html-react-parser';

const DotIcon = dynamic<any>(
  () => import('@/components/DotIcon').then((mod) => mod.DotIcon),
  { ssr: false, loading: () => <SkeletonCircle size="30" /> },
);

export interface CardProps {
  data: any;
  color: string;
  bg: string;
  type: string;
}

export const Card: FC<CardProps> = ({ data, color, bg, type }) => {
  const { hex } = useRandomColor();

  return (
    <>
      {type === 'blog' && (
        <NextLink href={`/blog/${data.slug}`}>
          <a>
            <Box
              p={5}
              color={color}
              borderColor={bg}
              borderWidth={0.5}
              borderStyle="dotted"
              boxShadow="base"
              rounded={{ md: 'lg' }}
              // size="lg"
              fontSize="md"
              fontWeight="bold"
              outline="none"
              _hover={{
                outline: 'none',
                bg: lighten(0.05, bg),
                color: color,
                boxShadow: 'md',
                borderColor: bg,
              }}
              cursor="pointer"
              // boxShadow={`inherit inherit inherit inherit ${color}`}
            >
              <Heading as="h3" fontSize={18} mb={2} position="relative">
                <DotIcon
                  boxSize={10}
                  position="absolute"
                  top={-10}
                  left={-10}
                  bg={hex}
                />{' '}
                {data.title}
              </Heading>

              <Box mt={4} fontWeight="normal">
                {parse(truncateString(data.description.toString(), 100))}
              </Box>
              <Divider height={0.5} my={2} bg={darken(0.05, bg?.toString())} />
              <Stack direction={{ base: 'column', md: 'row' }}>
                <Text fontSize="sm" fontWeight="normal">
                  {data.category?.label}
                </Text>
              </Stack>
            </Box>
          </a>
        </NextLink>
      )}
      {type === 'clients' && (
        <NextLink href={`/clients/project/${data.slug}`}>
          <a>
            <Box
              p={5}
              color={color}
              borderColor={bg}
              borderWidth={0.5}
              borderStyle="dotted"
              boxShadow="base"
              rounded={{ md: 'lg' }}
              // size="lg"
              fontSize="md"
              fontWeight="bold"
              outline="none"
              _hover={{
                outline: 'none',
                bg: lighten(0.05, bg),
                color: color,
                boxShadow: 'md',
                borderColor: bg,
              }}
              cursor="pointer"
              // boxShadow={`inherit inherit inherit inherit ${color}`}
            >
              <Heading as="h3" fontSize={18} mb={2} position="relative">
                <DotIcon
                  boxSize={10}
                  position="absolute"
                  top={-10}
                  left={-10}
                  bg={data.colors[0].color.toString()}
                  // bg={hex}
                />{' '}
                {data.name}
              </Heading>

              <Box mt={4} fontWeight="normal">
                {parse(truncateString(data.description.toString(), 100))}
              </Box>
            </Box>
          </a>
        </NextLink>
      )}
      {type === 'technology-glossary' && (
        <NextLink href={`/technology-glossary/${data.slug}`}>
          <a>
            <Box
              p={5}
              color={color}
              borderColor={bg}
              borderWidth={0.5}
              borderStyle="dotted"
              boxShadow="base"
              rounded={{ md: 'lg' }}
              // size="lg"
              fontSize="md"
              fontWeight="bold"
              outline="none"
              _hover={{
                outline: 'none',
                bg: lighten(0.05, bg),
                color: color,
                boxShadow: 'md',
                borderColor: bg,
              }}
              cursor="pointer"
              // boxShadow={`inherit inherit inherit inherit ${color}`}
            >
              <Heading as="h4" fontSize={18} mb={2} position="relative">
                <DotIcon
                  boxSize={10}
                  position="absolute"
                  top={-10}
                  left={-10}
                  bg={hex}
                />{' '}
                {data.term}
              </Heading>

              <Box mt={4} fontWeight="normal">
                {parse(truncateString(data.description.toString(), 100))}
              </Box>
            </Box>
          </a>
        </NextLink>
      )}
      {type === 'services' && (
        <NextLink href={`/services/${data.slug}`}>
          <a>
            <Box
              p={5}
              color={color}
              borderColor={bg}
              borderWidth={0.5}
              borderStyle="dotted"
              boxShadow="base"
              rounded={{ md: 'lg' }}
              // size="lg"
              fontSize="md"
              fontWeight="bold"
              outline="none"
              _hover={{
                outline: 'none',
                bg: lighten(0.05, bg),
                color: color,
                boxShadow: 'md',
                borderColor: bg,
              }}
              cursor="pointer"
              // boxShadow={`inherit inherit inherit inherit ${color}`}
            >
              <Heading as="h2" fontSize={18} mb={2} position="relative">
                <DotIcon
                  boxSize={10}
                  position="absolute"
                  top={-10}
                  left={-10}
                  bg={hex}
                />{' '}
                {data.name}
              </Heading>

              <Box mt={4} fontWeight="normal">
                {parse(truncateString(data.description.toString(), 100))}
              </Box>

              <Divider height={0.5} my={2} bg={darken(0.05, bg?.toString())} />

              <Stack direction={{ base: 'column', md: 'row' }}>
                <Text fontSize="sm" fontWeight="normal">
                  Avg Cost {data.priceRange} / {data.avgCostPer?.label}
                </Text>
              </Stack>
            </Box>
          </a>
        </NextLink>
      )}
      {type === 'careers' && (
        <NextLink href={`/careers/${data.jobSlug}`}>
          <a>
            <Box
              p={5}
              color={color}
              borderColor={bg}
              borderWidth={0.5}
              borderStyle="dotted"
              boxShadow="base"
              rounded={{ md: 'lg' }}
              // size="lg"
              fontSize="md"
              fontWeight="bold"
              outline="none"
              _hover={{
                outline: 'none',
                bg: lighten(0.05, bg),
                color: color,
                boxShadow: 'md',
                borderColor: bg,
              }}
              cursor="pointer"
              // boxShadow={`inherit inherit inherit inherit ${color}`}
            >
              <Heading as="h3" fontSize={18} mb={2} position="relative">
                <DotIcon
                  boxSize={10}
                  position="absolute"
                  top={-10}
                  left={-10}
                  bg={hex}
                />{' '}
                {data.jobShortTitle}
              </Heading>
              <Text fontWeight="normal" fontSize="sm" mb={2}>
                @ {data.jobAgency?.label}
              </Text>
              <Text fontSize="sm">{data.jobContractNumber}</Text>
              {/* <Box mt={4} fontWeight="normal">
           {parse(
             truncateString(data.jobDescription.toString(), 30),
           )}
         </Box> */}
              <Divider height={0.5} my={2} bg={darken(0.05, bg?.toString())} />
              <Stack direction={{ base: 'column', md: 'row' }}>
                {/* <Text fontSize="sm" fontWeight="normal">
               {data.jobCity} &bull; {data.jobState?.label}{' '}
               &bull; {data.jobZipCode}
             </Text> */}

                <Text fontSize="sm" fontWeight="normal">
                  {data.jobHours?.label}
                </Text>
                {data.jobIsRemote === 'Yes' && (
                  <Text fontSize="sm" fontWeight="normal">
                    &bull; Remote
                  </Text>
                )}
                {data.jobIsVisa === 'Yes' && (
                  <Text fontSize="sm" fontWeight="normal">
                    &bull; Visa
                  </Text>
                )}
              </Stack>
            </Box>
          </a>
        </NextLink>
      )}
      {type === 'legal' && (
        <NextLink href={`/legal/${data.slug}`}>
          <a>
            <Box
              p={5}
              color={color}
              borderColor={bg}
              borderWidth={0.5}
              borderStyle="dotted"
              boxShadow="base"
              rounded={{ md: 'lg' }}
              // size="lg"
              fontSize="md"
              fontWeight="bold"
              outline="none"
              _hover={{
                outline: 'none',
                bg: lighten(0.05, bg),
                color: color,
                boxShadow: 'md',
                borderColor: bg,
              }}
              cursor="pointer"
              // boxShadow={`inherit inherit inherit inherit ${color}`}
            >
              <Heading as="h4" fontSize={18} mb={2} position="relative">
                <DotIcon
                  boxSize={10}
                  position="absolute"
                  top={-10}
                  left={-10}
                  bg={hex}
                />{' '}
                {data.title}
              </Heading>

              <Box mt={4} fontWeight="normal">
                {parse(truncateString(data.description.toString(), 100))}
              </Box>
            </Box>
          </a>
        </NextLink>
      )}
      {type === 'government-acronyms' && (
        <NextLink href={`/government-acronyms/${data.slug}`}>
          <a>
            <Box
              p={5}
              color={color}
              borderColor={bg}
              borderWidth={0.5}
              borderStyle="dotted"
              boxShadow="base"
              rounded={{ md: 'lg' }}
              // size="lg"
              fontSize="md"
              fontWeight="bold"
              outline="none"
              _hover={{
                outline: 'none',
                bg: lighten(0.05, bg),
                color: color,
                boxShadow: 'md',
                borderColor: bg,
              }}
              cursor="pointer"
              // boxShadow={`inherit inherit inherit inherit ${color}`}
            >
              <Heading as="h4" fontSize={18} mb={2} position="relative">
                <DotIcon
                  boxSize={10}
                  position="absolute"
                  top={-10}
                  left={-10}
                  bg={hex}
                />{' '}
                {data.term}
              </Heading>

              <Box mt={4} fontWeight="normal">
                {parse(truncateString(data.description.toString(), 100))}
              </Box>
            </Box>
          </a>
        </NextLink>
      )}
      {type === 'color-list' && (
        <NextLink href={`/color/${data.hex.substring(1)}`}>
          <a>
            <Box
              p={5}
              color={color}
              borderColor={bg}
              borderWidth={0.5}
              borderStyle="dotted"
              boxShadow="base"
              rounded={{ md: 'lg' }}
              // size="lg"
              fontSize="md"
              fontWeight="bold"
              outline="none"
              _hover={{
                outline: 'none',
                bg: lighten(0.05, bg),
                color: color,
                boxShadow: 'md',
                borderColor: bg,
              }}
              cursor="pointer"
              // boxShadow={`inherit inherit inherit inherit ${color}`}
            >
              <Heading as="h4" fontSize={18} mb={2} position="relative">
                <DotIcon
                  boxSize={10}
                  position="absolute"
                  top={-10}
                  left={-10}
                  bg={data.hex.toString()}
                />{' '}
                {data.name}
              </Heading>

              <Divider height={0.5} my={2} bg={darken(0.05, bg?.toString())} />
              <Text fontSize="sm" fontWeight="bold">
                {data.hex} &bull; rgb({data.rgb.r}, {data.rgb.g}, {data.rgb.b})
              </Text>
            </Box>
          </a>
        </NextLink>
      )}
      {type === 'agencies' && (
        <NextLink
          href={`/agencies/${data.state.label.toLowerCase()}/government/${
            data.slug
          }`}
        >
          <a>
            <Box
              p={5}
              color={color}
              borderColor={bg}
              borderWidth={0.5}
              borderStyle="dotted"
              boxShadow="base"
              rounded={{ md: 'lg' }}
              // size="lg"
              fontSize="md"
              fontWeight="bold"
              outline="none"
              _hover={{
                outline: 'none',
                bg: lighten(0.05, bg),
                color: color,
                boxShadow: 'md',
                borderColor: bg,
              }}
              cursor="pointer"
              // boxShadow={`inherit inherit inherit inherit ${color}`}
            >
              <Heading as="h3" fontSize={18} mb={2} position="relative">
                <DotIcon
                  boxSize={10}
                  position="absolute"
                  top={-10}
                  left={-10}
                  bg={hex}
                />{' '}
                {data.agencyName}
              </Heading>
              <Text fontWeight="normal" fontSize="sm" mb={2}>
                {parse(truncateString(data.intro.toString(), 100))}
              </Text>
              <Text fontWeight="normal" fontSize="sm" mb={2}>
                {data.agencyAcronym ? data.agencyAcronym + ' | ' : null}{' '}
                {data.city}, {data.state.label} {data.zipcode}
              </Text>
              <Text fontSize="sm">{data.jobContractNumber}</Text>
            </Box>
          </a>
        </NextLink>
      )}
    </>
  );
};
