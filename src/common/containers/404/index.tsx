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

function ErrorView(): JSX.Element {
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
            <ClipWord label="Guess whaaaaat" scrollRef={scrollRef} />
            <ClipWord label="Something" scrollRef={scrollRef} />
            <BoxWithDetails>
              <ClipWord label="went" scrollRef={scrollRef}>
                <Details>
                  <span>Error 404 — Not Found</span>
                  <ArrowLink label="Go Home" link="/" />
                </Details>
              </ClipWord>
            </BoxWithDetails>
          </Box>
          <Box $marginBottom="4rem">
            <ClipWord label="wrrrrrong" scrollRef={scrollRef} />
          </Box>
          <ClipWord label="Guesssss what" scrollRef={scrollRef} />
        </Wrapper>
      </Container>
      <Trigger ref={scrollRef} />
    </>
  );
}

export default ErrorView;
