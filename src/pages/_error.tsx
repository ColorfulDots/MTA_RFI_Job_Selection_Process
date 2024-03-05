import { Text, Heading } from '@chakra-ui/react';
import { Layout } from '@/components/Layout';

export const Error = (props: any) => {
  return (
    <Layout
      title="Error!"
      description="Colorful Dots, LLC is a full service software development agency focused on creating custom software products for Fortune 500's, State & Federal Government agencies, and high-growth startups."
      bg={props.bg}
      color={props.color}
    >
      <Heading>Error! OH MY!</Heading>
      <Text>
        {props.statusCode
          ? `An error ${props.statusCode} occurred on server`
          : 'An error occurred on client'}
      </Text>
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
