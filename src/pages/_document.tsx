import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import { loadTheme } from '../styles/themes';

const fontsAssets = [
  'NeueHaasDisplay-Regular.woff2',
  'NeueHaasDisplay-Regular.woff',
  'NeueHaasDisplay-Medium.woff2',
  'NeueHaasDisplay-Medium.woff',
  'NeueHaasText-Medium.woff2',
  'NeueHaasText-Medium.woff',
  'NeueHaasText-Regular.woff',
  'NeueHaasText-Regular.woff2',
];

export default class AppDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      // eslint-disable-next-line no-param-reassign
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const { styles, ...initialProps } = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render = (): JSX.Element => (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/icon.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        {fontsAssets.map((font) => (
          <link
            key={font}
            rel="preload"
            href={`/fonts/${font}`}
            as="font"
            crossOrigin=""
            type="font/woff2"
          />
        ))}

        <script dangerouslySetInnerHTML={{ __html: loadTheme }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
