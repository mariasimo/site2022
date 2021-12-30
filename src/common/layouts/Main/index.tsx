import { Container } from './styles';
import Head from 'next/head';
import Header from '$/common/components/Header';
import Footer from '$/common/components/Footer';
import type { ReactNode } from 'react';

function Layout({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}): JSX.Element {
  return (
    <Container>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      {children}
      <Footer />
    </Container>
  );
}

export default Layout;
