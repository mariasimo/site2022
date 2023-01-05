import styled from 'styled-components';
import { BodyL } from '$/styles/typography';
import { from } from '$/styles/responsive';
import { motion } from 'framer-motion';

export const Container = styled.div`
  line-height: 1.5;
  box-sizing: content-box;
  width: 100%;
  max-width: 75rem;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 0;
  height: calc(100vh - 1.5rem);
  overflow: hidden;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 87vh;

  ${from.mobile} {
    height: 84vh;
  }

  ${from.tabletPortrait} {
    height: 87vh;
  }
`;

export const Box = styled.div<{ $marginBottom?: string }>`
  margin-block-end: ${({ $marginBottom }) => $marginBottom ?? '0'};
  display: flex;
  flex-direction: column;
`;

export const BoxWithDetails = styled(Box)`
  flex-direction: row;
  gap: 4rem;
`;

export const Details = styled(BodyL)`
  display: flex;
  font-size: 1.15rem;
  flex-direction: column;
  justify-content: flex-end;
  padding-block: 0.5rem;

  ${from.tabletPortrait} {
    flex-direction: row;
    align-items: flex-end;
    gap: 3rem;
    font-size: 1.5rem;
  }
`;
export const Trigger = styled.div`
  position: absolute;
  bottom: -1px;
  height: 1px;
  width: 1px;
  visibility: hidden;
`;
