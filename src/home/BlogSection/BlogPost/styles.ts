import styled from 'styled-components';
import { BodyS, HeadingMBold } from '$/styles/typography';
import DefaultArrow from '$/assets/icons/arrow-link.svg';

export const Container = styled.article`
  padding-block: 1.5rem 2.75rem;
  border-block-end: 1px solid ${({ theme }) => theme.colors.ink}60;

  &:first-child {
    border-block-start: 1px solid ${({ theme }) => theme.colors.ink}60;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled(HeadingMBold).attrs({ as: 'h2' })`
  margin-block-end: 0.5rem;
  padding-inline-end: 1.5rem;
`;
export const DateText = styled(BodyS).attrs({ as: 'p' })``;

export const Arrow = styled(DefaultArrow)`
  flex-shrink: 0;
`;
