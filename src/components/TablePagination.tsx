import {
  Button,
  ButtonGroup,
  Flex,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import * as React from 'react';
// import { data } from './jobsData';

export const TablePagination = (props: any) => {
  return (
    <Flex align="center" justify="space-between">
      <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
        {props.count} {props.count === 1 ? 'Record' : 'Records'} | Page:{' '}
        {props.currentPage} of {props.lastPage} | Per Page: {props.perPage}
      </Text>
      <ButtonGroup variant="outline" size="sm">
        <Button
          // rel="prev"
          onClick={props.onClickPrevious}
          disabled={props.pageIndex === 0 ? true : false}
        >
          Previous
        </Button>
        <Button
          // rel="next"
          onClick={props.onClickNext}
          disabled={props.pageIndex === props.totalRecords ? true : false}
        >
          Next
        </Button>
      </ButtonGroup>
    </Flex>
  );
};
