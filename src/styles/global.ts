import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const styled = { createGlobalStyle };

const GlobalStyle = styled.createGlobalStyle`
  ${normalize};

  html.not-found {
    ::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Neue Haas Grotesk Display Pro', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
      'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    font-size: 16px;
    transition: background-color 100ms ease-out;
    background: var(--theme-paper);
    color: var(--theme-ink);
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
    transition: color ease-in-out 0.25s;
    color: var(--theme-ink);
  }

  #__next {
    display: flex;
    min-height: 100vh;

    > * {
      flex: 1;
    }
  }

  ::-moz-selection {
    background: var(--theme-selectedTextBg);
    color: var(--theme-selectedText);
  }

  ::selection {
    background: var(--theme-selectedTextBg);
    color: var(--theme-selectedText);
  }
`;

export default GlobalStyle;
