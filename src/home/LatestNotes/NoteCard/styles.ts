import styled, { css } from 'styled-components';
import { BodyS, HeadingMBold } from '$/styles/typography';
import DefaultArrow from '$/assets/icons/arrow-link.svg';

export const Arrow = styled(DefaultArrow)`
  flex-shrink: 0;
  width: 1.5rem;
`;

export const Title = styled(HeadingMBold).attrs({ as: 'h2' })`
  margin-block-end: 0.5rem;
  padding-inline-end: 1.5rem;
`;

export const Container = styled.article<{ $disabled?: boolean }>`
  padding-block: 1.5rem 2.75rem;
  border-block-end: 1px solid var(--theme-line);

  &:first-child {
    border-block-start: 1px solid var(--theme-line);
  }
  ${Arrow}, ${Title} {
    color: ${({ $disabled }) =>
      $disabled ? 'var(--theme-disabledText)' : 'var(--theme-ink)'};
  }

  ${({ $disabled }) => {
    if (!$disabled) {
      return css`
        &:hover {
          cursor: pointer;
          ${Arrow}, ${Title} {
            color: var(--theme-interactive);
          }
        }
      `;
    }

    return null;
  }}
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Details = styled(BodyS).attrs({ as: 'p' })``;
