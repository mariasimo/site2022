import styled from 'styled-components';

export const Hidden = styled.span`
  /* from https://www.sarasoueidan.com/blog/accessible-icon-buttons/ */
  &:not(focus):not(active) {
    clip: rect(0 0 0 0);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;

export const Button = styled.button<{ $size?: string; disabled: boolean }>`
  background: transparent;
  padding: 0;
  border: 0;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  width: ${({ $size }) => $size ?? '1rem'};
  height: ${({ $size }) => $size ?? '1rem'};

  > * {
    width: 100%;
    height: 100%;
  }
`;
