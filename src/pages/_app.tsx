import type { AppProps } from 'next/app';

import GlobalStyle from '$/styles/global';
import '$/styles/fonts.css';
import { ThemeProvider } from '$/common/hooks/ThemeContext';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
