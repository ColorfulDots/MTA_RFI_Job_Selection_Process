import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FuegoProvider } from '@nandorojo/swr-firestore';
import { fuego } from '@/lib/fuego';
import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import { ProvideAuth } from '@/hooks/useAuth';
import theme from '@/themes/index';
import type { AppProps } from 'next/app';
import Progress from '@aldabil/next-progress';
import { randomColor } from '@/helpers/index';
import * as gtag from '@/lib/gtag';
import { DefaultSeo } from 'next-seo';

//Progress setup
Progress.configure({
  type: 'bar',
  background: randomColor(),
  height: 3,
  //svg: "used with type='fullpage' ",
});
// Router.events.on('routeChangeStart', () => Progress.start());
// Router.events.on('routeChangeComplete', () => Progress.complete());
// Router.events.on('routeChangeError', () => Progress.complete());

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const bgColor = '#f8f9fa';
  const fgColor = '#000000';

  // useEffect(() => {
  //   const handleRouteChange = (url: URL) => {
  //     gtag.pageview(url);
  //   };
  //   router.events.on('routeChangeComplete', handleRouteChange);
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //   };
  // }, [router.events]);

  useEffect(() => {
    const handleStart = (url: URL) => {
      // console.log(`Loading: ${url}`);
      gtag.pageview(url);
      Progress.start();
    };
    const handleStop = () => {
      Progress.complete();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  function ForceLightMode(props: { children: JSX.Element }) {
    const { colorMode, toggleColorMode } = useColorMode();

    useEffect(() => {
      if (colorMode === 'light') return;
      toggleColorMode();
    }, [colorMode, toggleColorMode]);

    return props.children;
  }

  const canonicalUrl = (
    `https://colorfuldots.com` + (router.asPath === '/' ? '' : router.asPath)
  ).split('?')[0];

  return (
    <>
      <DefaultSeo canonical={canonicalUrl} />
      <FuegoProvider fuego={fuego}>
        <ChakraProvider resetCSS theme={theme}>
          <ForceLightMode>
            <ProvideAuth>
              <Component bg={bgColor} color={fgColor} {...pageProps} />
            </ProvideAuth>
          </ForceLightMode>
        </ChakraProvider>
      </FuegoProvider>
    </>
  );
}

export default MyApp;
