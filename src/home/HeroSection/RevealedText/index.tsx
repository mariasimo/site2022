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
  visible: {
    y: 0,
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.8 },
  },
};

const container = {
  visible: {
    transition: {
      staggerChildren: 0.01,
    },
  },
};

const RevealedText = ({
  content,
}: {
  content: { style?: ComponentType; text: string };
}) => {
  const Style = content.style;

  const words = content.text.split(' ').map((w) => `${w} `);
  return (
    <Container initial="hidden" animate="visible" variants={container}>
      {words.map((word, index) => (
        <WordMask key={`${word}+${index}`}>
          <Word variants={item}>{Style ? <Style>{word}</Style> : word}</Word>
        </WordMask>
      ))}
    </Container>
  );
};

export default RevealedText;
