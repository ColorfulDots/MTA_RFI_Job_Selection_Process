import { NextSeo } from 'next-seo';
import { FC } from 'react';
import { truncateString } from '@/helpers/index';
import Head from 'next/head';

export interface MetaProps {
  title: string;
  description?: string;
  canonical?: string;
  postImage?: any;
  structuredData?: string;
}

export const Meta: FC<MetaProps> = ({
  title,
  description,
  canonical,
  postImage,
  structuredData,
}) => {
  const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
  return (
    <>
      <NextSeo
        title={`${title && title} | Colorful Dots, LLC`}
        description={
          description &&
          truncateString(description.replace(/<[^>]*>?/gm, ' '), 145)
        }
        openGraph={{
          url: `https://colorfuldots.com${canonical && canonical}`,
          title: title + ' | Colorful Dots, LLC',
          description:
            description &&
            truncateString(description.replace(/<[^>]*>?/gm, ' '), 145),
          images: [
            {
              url:
                postImage && postImage
                  ? postImage
                  : 'https://colorfuldots.s3.amazonaws.com/cd-assets/images/og-share-card-v2021-1200x630.jpg',
              width: 1200,
              height: 630,
              alt: title && title,
            },
          ],
          site_name: 'ColorfulDots',
        }}
        twitter={{
          handle: '@colorfuldotsHQ',
          site: '@colorfuldotsHQ',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'viewport',
            content:
              'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
          },
          {
            name: 'theme-color',
            content: '#7000ff',
          },
          {
            name: 'msapplication-config',
            content: 'https://colorfuldots.com/favicons/browserconfig.xml',
          },
          {
            name: 'author',
            content: 'Eric David Smith',
          },
          {
            property: 'og:publish_date',
            content: `${utc}`, // fake it, use today's date
          },
        ]}
        facebook={{
          appId: '2054368228145418',
        }}
      />
      <Head>
        {/* STRUCTURED DATA */}
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: structuredData,
            }}
          />
        )}
      </Head>
    </>
  );
};
