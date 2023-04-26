import styled from 'styled-components';
import { BodyS } from '../../../styles/typography';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const Emoji = styled.span`
  display: flex;
`;

export const Text = styled(BodyS)`
  font-variant-numeric: tabular-nums;
  width: 2rem;
  transition: color ease 0.15s;
`;

export const Button = styled.button`
  background: transparent;
  box-shadow: none;
  border: none;
  cursor: pointer;
  transition: transform ease 0.15s;

  &:hover {
    ${Emoji} {
      transform: scale(1.3);
      transition: transform ease 0.15s;
    }
  }
  &:active + * {
    color: var(--theme-inkHighContrast);
  }
`;
