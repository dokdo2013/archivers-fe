import { ColorModeScript, theme } from "@chakra-ui/react";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="아카이버스 - Archivers" />
        <link rel="icon" href="/Archivers_A.png" />

        {/* GTag (GA4) */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-FVFER73C3X`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FVFER73C3X');
            `,
          }}
        />

        {/* CodeNButter */}
        <script
          src="https://buttr.dev/butter.js"
          data-site-id="iwmpxkcmmf"
          async
        ></script>
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
