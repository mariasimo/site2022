import styled, { keyframes } from 'styled-components';

export const Shine = keyframes`
    0% {
        transform: translateX(-100%);
    }
    10% {
        transform: translateX(100%);
    }    
`;

export const Container = styled.div`
  align-items: center;
  background-color: #ffbc00;
  border-radius: 0.75rem;
  display: inline-flex;
  font-size: 0.75rem;
  font-weight: 500;
  height: 1.5rem;
  overflow: hidden;
  padding: 0.3rem 0.5rem;
  position: relative;
  width: fit-content;

  > a {
    text-decoration: none;
  }

  &:after {
    /* Shine */
    content: '';
    top: 0;
    transform: translateX(100%);
    width: 100%;
    height: 220px;
    position: absolute;
    z-index: 1;
    animation: ${Shine} 6s infinite 3s;

    /* 
  CSS Gradient - complete browser support from http://www.colorzilla.com/gradient-editor/ 
  */
    background: -moz-linear-gradient(
      left,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(128, 186, 232, 0) 99%,
      rgba(125, 185, 232, 0) 100%
    ); /* FF3.6+ */
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(0%, rgba(255, 255, 255, 0)),
      color-stop(50%, rgba(255, 255, 255, 0.8)),
      color-stop(99%, rgba(128, 186, 232, 0)),
      color-stop(100%, rgba(125, 185, 232, 0))
    ); /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(
      left,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(128, 186, 232, 0) 99%,
      rgba(125, 185, 232, 0) 100%
    ); /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(
      left,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(128, 186, 232, 0) 99%,
      rgba(125, 185, 232, 0) 100%
    ); /* Opera 11.10+ */
    background: -ms-linear-gradient(
      left,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(128, 186, 232, 0) 99%,
      rgba(125, 185, 232, 0) 100%
    ); /* IE10+ */
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(128, 186, 232, 0) 99%,
      rgba(125, 185, 232, 0) 100%
    ); /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#007db9e8',GradientType=1 ); /* IE6-9 */
  }
`;
