import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { ComponentType } from 'react';

const Container = styled(motion.span)`
  * {
    line-height: 1.4;
  }
`;

const WordMask = styled.span`
  clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
  display: inline-block;
`;

const Word = styled(motion.span)`
  display: inline-block;
  white-space: pre-wrap;
`;

const item = {
  hidden: {
    y: 70,
  },
  visible: ({ duration }: { duration: number }) => ({
    y: 0,
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration },
  }),
};

const container = {
  visible: ({ staggerWords }: { staggerWords: number }) => ({
    transition: {
      staggerChildren: staggerWords,
    },
  }),
};

const RevealedText = ({
  content,
  duration = 0.8,
  staggerWords = 0.01,
}: {
  content: { style?: ComponentType; text: string };
  duration?: number;
  staggerWords?: number;
}) => {
  const Style = content.style;
  const words = content.text.split(' ').map((w) => `${w} `);

  return (
    <Container
      initial="hidden"
      animate="visible"
      variants={container}
      custom={{ staggerWords }}
    >
      {words.map((word, index) => (
        <WordMask key={`${word}+${index}+${content.text}`}>
          <Word variants={item} custom={{ duration }}>
            {Style ? <Style>{word}</Style> : word}
          </Word>
        </WordMask>
      ))}
    </Container>
  );
};

export default RevealedText;
