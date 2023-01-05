import { WordMask, Word, Row } from './styles';
import { useAnimation } from 'framer-motion';
import { ReactNode, RefObject, useCallback, useEffect, useState } from 'react';
import { useTheme } from '$/styles/themes/ThemeContext';

const clip = {
  animate: {
    y: ['10%', '-100%'],
    transition: { duration: 1 },
  },
};

export default function ClipWord({
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
