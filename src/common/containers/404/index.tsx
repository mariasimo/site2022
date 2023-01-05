import {
  Container,
  Wrapper,
  Box,
  Details,
  BoxWithDetails,
  Trigger,
} from './styles';
import Head from 'next/head';
import Header from '$/common/components/Header';
import ArrowLink from '$/common/components/ArrowLink';
import { useEffect, useRef } from 'react';
import ClipWord from '$/common/components/animation/ClipWord';

function ErrorView({ message }: { message?: string }): JSX.Element {
  const scrollRef = useRef(null);

  useEffect(() => {
    document.querySelector('html')?.classList.add('not-found');
  }, []);

  return (
    <>
      <Container>
        <Head>
          <title>María Simó Front—End Developer</title>
        </Head>
        <Header />
        <Wrapper>
          <Box $marginBottom="0">
            <ClipWord label="Guess whaǻäāāạt" scrollRef={scrollRef} />
            <ClipWord label="Someŧhiiíìĭng" scrollRef={scrollRef} />
            <BoxWithDetails>
              <ClipWord label="ẅeẹnt" scrollRef={scrollRef}>
                <Details>
                  <span>{message || 'Error 404 — Not Found'}</span>
                  <ArrowLink label="Go Home" link="/" />
                </Details>
              </ClipWord>
            </BoxWithDetails>
          </Box>
          <Box $marginBottom="4rem">
            <ClipWord label="wrrrróòøøǿong" scrollRef={scrollRef} />
          </Box>
        </Wrapper>
      </Container>
      <Trigger ref={scrollRef} />
    </>
  );
}

export default ErrorView;
