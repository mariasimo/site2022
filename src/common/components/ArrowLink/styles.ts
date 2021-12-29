import styled from 'styled-components';
import DefaultArrow from '$/assets/icons/arrow-link.svg';

export const Link = styled.a`
  text-decoration: none;
  display: flex;
  align-items: flex-start;
  fill: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.ink};

  &:hover {
    transition: color 300ms ease-out, fill 300ms ease-out;
    color: ${({ theme }) => theme.colors.interactive};
    fill: ${({ theme }) => theme.colors.interactive};
  }
`;

export const Arrow = styled(DefaultArrow)`
  margin-inline-start: -0.35rem;
  margin-inline-end: 0.5rem;
  margin-block-start: 0.1rem;
  flex-shrink: 0;
`;
