import type { AppProps } from 'next/app';

import GlobalStyle from '$/styles/global';
import '$/styles/fonts.css';
import { ThemeProvider } from '$/styles/themes/ThemeContext';
import ErrorBoundary from '$/common/components/ErrorBoundary';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
