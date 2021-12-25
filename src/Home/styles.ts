import styled from 'styled-components';
import DefaultBadge from '$/common/components/Badge';

export const Container = styled.div`
  width: 100%;
  padding: 20px;
  line-height: 1.5;

  b {
    text-rendering: optimizelegibility;
    -webkit-font-smoothing: subpixel-antialiased;
    letter-spacing: 0.02rem;
    font-weight: 500;
  }

  a {
    display: flex;
    align-items: center;
  }

  p {
    margin-block-end: 1rem;
    max-width: 44rem;
  }
`;

export const Badge = styled(DefaultBadge)`
  position: fixed;
  top: 1rem;
  right: 1rem;
`;
