import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '$/styles/global';
import themes from '$/styles/themes';
import '$/styles/fonts.css';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={themes.light}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
