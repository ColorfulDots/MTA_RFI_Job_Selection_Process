import { Stack, Center, Img } from '@chakra-ui/react';

export const AwardSection: React.FC = () => {
  return (
    <Stack
      justify="center"
      mt={12}
      mb={[3, 8, 8, 8]}
      spacing={[3, 20, 28, 40]}
      direction={{ base: 'row', md: 'row' }}
    >
      <Center>
        <Img
          boxSize={[115, 140, 160, 160]}
          loading="lazy"
          src="https://colorfuldots.s3.amazonaws.com/cd-assets/images/ny_nyc_mobile-app-development_2020_transparent.svg"
          objectFit="contain"
          alt="Colorful Dots, LLC - Best Mobile App Development Company 2020"
          title="Colorful Dots, LLC - Best Mobile App Development Company 2020"
        />
      </Center>

      <Center>
        <Img
          loading="lazy"
          src="https://digital.com/wp-content/uploads/Mobile-App-Developers-in-New-York-City.png?x53026"
          objectFit="contain"
          boxSize={[100, 140, 160, 160]}
          alt="Colorful Dots, LLC - Best Mobile App Development Company in New York City 2020 - 2021"
          title="Colorful Dots, LLC - Best Mobile App Development Company in New York City 2020 - 2021"
        />
      </Center>

      <Center>
        <Img
          boxSize={[115, 140, 160, 160]}
          loading="lazy"
          src="https://colorfuldots.s3.amazonaws.com/cd-assets/images/ny_nyc_mobile-app-development_2021_transparent.svg"
          objectFit="contain"
          alt="Colorful Dots, LLC - Best Mobile App Development Company 2021"
          title="Colorful Dots, LLC - Best Mobile App Development Company 2021"
        />
      </Center>
    </Stack>
  );
};
