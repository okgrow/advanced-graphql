import React from 'react';
import styled from 'styled-components';

const ErrorOverlay = ({ children }) => (
  <Background>
    <Shocked>😵</Shocked>
    <Message marginBottom={2}>Oops!</Message>
    <Message>{children}</Message>
  </Background>
);

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: linear-gradient(
    135deg,
    var(--gradientGold) 10%,
    var(--paleRed) 100%
  );
`;

const Shocked = styled.span`font-size: 12rem;`;

const Message = styled.span`
  font-size: 4rem;
  font-weight: bold;
  color: var(--white);
  text-align: center;
  font-family: Operator Mono;
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}rem;`};
`;

export default ErrorOverlay;
