import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Mask = styled.div`
  clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
  display: contents;
`;

export const Container = styled(motion.div)``;
