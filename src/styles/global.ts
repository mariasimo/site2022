import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const styled = { createGlobalStyle };

const GlobalStyle = styled.createGlobalStyle`
  ${normalize};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Neue Haas Grotesk Display Pro', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
      'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.colors.paper};
    color: ${({ theme }) => theme.colors.ink};
    font-size: 16px;
    transition: background-color 300ms ease-in-out,
      color 300ms ease-in-out 200ms;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  #__next {
    display: flex;
    min-height: 100vh;

    > * {
      flex: 1;
    }
  }

  ::-moz-selection {
    color: ${({ theme }) => theme.colors.selectedText};
    background: ${({ theme }) => theme.colors.selectedTextBg};
  }

  ::selection {
    color: ${({ theme }) => theme.colors.selectedText};
    background: ${({ theme }) => theme.colors.selectedTextBg};
  }
`;

export default GlobalStyle;
