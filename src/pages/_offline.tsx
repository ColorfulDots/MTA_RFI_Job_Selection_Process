import { Text, Heading } from '@chakra-ui/react';
import { Layout } from '@/components/Layout';

export const Offline = (props: any) => {
  return (
    <Layout
      title="Colorful Dots, LLC - Offline!"
      description="You appear to be offline, please check your internet connection and try again"
      bg={props.bg}
      color={props.color}
    >
      <Heading>You&apos;re Offline</Heading>
      <Text>
        You appear to be offline, please check your internet connection and try
        again
      </Text>
    </Layout>
  );
};

Offline.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Offline;
