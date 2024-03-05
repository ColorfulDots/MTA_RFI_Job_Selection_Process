import { Box } from '@chakra-ui/react';

export const MainWrapper = (props: any) => {
  return <Box {...props}>{props.children}</Box>;
};
