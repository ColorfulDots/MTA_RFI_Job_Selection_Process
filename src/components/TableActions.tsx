import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react';
import * as React from 'react';
import { BsSearch } from 'react-icons/bs';
import { RiAddFill } from 'react-icons/ri';
import { useRouter } from 'next/router';
// import { CSVLink } from 'react-csv';
import { useCSVDownloader } from 'react-papaparse';

export const TableActions = (props: any) => {
  const router = useRouter();
  const { CSVDownloader, Type } = useCSVDownloader();

  return (
    <Stack
      spacing="4"
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
    >
      <HStack>
        <FormControl minW={{ md: '320px' }} id="search">
          <InputGroup size="sm">
            <FormLabel srOnly>Filter by title or description</FormLabel>
            <InputLeftElement pointerEvents="none" color="gray.400">
              <BsSearch />
            </InputLeftElement>
            <Input
              rounded="base"
              type="search"
              placeholder="Filter by title or description..."
              onChange={props.onChange}
            />
          </InputGroup>
        </FormControl>
      </HStack>
      <ButtonGroup size="sm" variant="outline">
        {props.newLink && (
          <Button
            onClick={() => router.push(props.newLink)}
            iconSpacing="1"
            leftIcon={<RiAddFill fontSize="1.25em" />}
          >
            Add {props.type}
          </Button>
        )}
        {props.csvData && (
          <CSVDownloader
            type={Type.Button}
            filename={'filename'}
            bom={true}
            config={{
              delimiter: ';',
            }}
            data={[
              {
                'Column 1': '1-1',
                'Column 2': '1-2',
                'Column 3': '1-3',
                'Column 4': '1-4',
              },
              {
                'Column 1': '2-1',
                'Column 2': '2-2',
                'Column 3': '2-3',
                'Column 4': '2-4',
              },
              {
                'Column 1': '3-1',
                'Column 2': '3-2',
                'Column 3': '3-3',
                'Column 4': '3-4',
              },
              {
                'Column 1': 4,
                'Column 2': 5,
                'Column 3': 6,
                'Column 4': 7,
              },
            ]}
          >
            Download
          </CSVDownloader>

          // <Button
          //   iconSpacing="1"
          //   leftIcon={<RiArrowRightUpLine fontSize="1.25em" />}
          // >
          //   {/* <CSVLink data={props.csvData} headers={props.csvHeaders}>
          //     Export CSV
          //   </CSVLink> */}
          // </Button>
        )}
      </ButtonGroup>
    </Stack>
  );
};
