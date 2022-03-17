import {
  Container,
  Wrapper,
  Box,
  Details,
  BoxWithDetails,
  WordMask,
  Word,
  Trigger,
} from './styles';
import Head from 'next/head';
import Header from '$/common/components/Header';
import ArrowLink from '$/common/components/ArrowLink';
import { motion, useAnimation } from 'framer-motion';
import {
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { useTheme } from '$/styles/themes/ThemeContext';

const clip = {
  animate: {
    y: ['10%', '-100%'],
    transition: { duration: 1 },
  },
};

const Row = styled(motion.div)`
  width: 100%;
  display: flex;
  gap: 4rem;
`;

function ClipWord({
  children,
  label,
  scrollRef,
}: {
  children?: ReactNode;
  label: string | ReactNode;
  scrollRef?: RefObject<HTMLDivElement>;
}) {
  const { themeName } = useTheme();
  const [hasTriggered, setHasTriggered] = useState(false);

  const animationControls = useAnimation();

  const handleAnimation = useCallback(() => {
    void animationControls.start(clip.animate);
  }, [animationControls]);

  useEffect(() => {
    handleAnimation();
  }, [handleAnimation, themeName]);

  useEffect(() => {
    if (hasTriggered) {
      setHasTriggered(false);
      handleAnimation();
    }

    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [handleAnimation, hasTriggered]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    );
    if (scrollRef?.current) {
      observer.observe(scrollRef?.current);
    }
  }, [scrollRef, handleAnimation]);

  return (
    <Row onHoverStart={handleAnimation}>
      <WordMask>
        <Word animate={animationControls} variants={clip}>
          {label}
        </Word>
        <Word animate={animationControls} variants={clip}>
          {label}
        </Word>
      </WordMask>
      {children}
    </Row>
  );
}

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
