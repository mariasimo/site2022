import styled from 'styled-components';

export const Container = styled.div`
  line-height: 1.5;

  box-sizing: content-box;
  width: 100%;
  max-width: 75rem;
  margin: 0 auto;
  padding: 1.5rem;

  b {
    text-rendering: optimizelegibility;
    -webkit-font-smoothing: subpixel-antialiased;
    letter-spacing: 0.02rem;
    font-weight: 500;
  }

  p {
    max-width: 44rem;
  }
`;

export const ArrowLink = styled.a`
  display: flex;
  align-items: center;
`;
