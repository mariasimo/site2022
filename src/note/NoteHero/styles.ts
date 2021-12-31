import styled from 'styled-components';
import { BodyL, BodyXS, HeadingLBold } from '$/styles/typography';

export const Container = styled.section`
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  border-block-end: 1px solid var(--theme-line);
`;

export const Title = styled(HeadingLBold).attrs({ as: 'h1' })`
  max-width: 36rem;
  margin-block-end: 3rem;
`;

export const Summary = styled(BodyL).attrs({ as: 'p' })`
  max-width: 36rem;
  margin-block-end: 4.5rem;
`;

export const Meta = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  padding-block: 2.5rem;
`;

export const Block = styled.div`
  grid-column: span 2;
`;

export const DateInfo = styled(Block)``;
export const StatusInfo = styled(Block)`
  fill: var(--theme-ink);
`;

export const Text = styled(BodyXS).attrs({ as: 'p' })``;

export const Status = styled(Text)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;
