import Document, {
  Html,
  Head,
  Main,
  // NextScript,
  DocumentContext,
} from 'next/document';
import { GA_TRACKING_ID } from '@/lib/gtag';
import Script from 'next/script';
import DeferNextScript from '@/components/DeferNextScript';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="icon"
            href="https://colorfuldots.com/favicons/favicon.ico"
          />
          <link
            rel="apple-touch-icon"
            href="https://colorfuldots.com/favicons/apple-touch-icon.png"
            sizes="180x180"
          />
          <link rel="manifest" href="https://colorfuldots.com/manifest.json" />
          <link rel="author" href="https://colorfuldots.com/humans.txt" />
          <link rel="robots" href="https://colorfuldots.com/robots.txt" />
          <link rel="preconnect" href="https://colorfuldots.s3.amazonaws.com" />
          <link
            rel="preconnect"
            href="https://firebasestorage.googleapis.com"
          />
          <link rel="preconnect" href="https://www.google-analytics.com" />
          <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
          <link rel="preconnect" href="https://cdn.jsdelivr.net" />
          <link rel="preconnect" href="https://cdn.quilljs.com" />

          {this.props.__NEXT_DATA__.page === '/technologies' && (
            <>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/devicons/1.8.0/css/devicons.min.css"
              />
              <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.10.1/devicon.min.css"
              />
            </>
          )}

          {this.props.__NEXT_DATA__.page ===
            '/dashboard/pages/technologies' && (
            <>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/devicons/1.8.0/css/devicons.min.css"
              />
              <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.10.1/devicon.min.css"
              />
            </>
          )}

          {this.props.__NEXT_DATA__.page === '/technologies/[slug]' && (
            <>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/devicons/1.8.0/css/devicons.min.css"
              />
              <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.10.1/devicon.min.css"
              />
            </>
          )}

          <link rel="sitemap" href="https://colorfuldots.com/sitemap.xml" />

          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy="afterInteractive"
          />

          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GA_TRACKING_ID}');
            `}
          </Script>
        </Head>
        <body>
          <Main />
          <DeferNextScript />
        </body>
      </Html>
    );
  }
}
