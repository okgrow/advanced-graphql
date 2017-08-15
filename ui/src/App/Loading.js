import React from 'react';
import styled from 'styled-components';
import { ThreeBounce } from 'better-react-spinkit';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: '#eee';
  height: 100vh;
`;

const SpinnerContainer = styled.div`
  align-items: center;
  justify-content: center;
`;

export default () => (
  <Container>
    <SpinnerContainer>
      <ThreeBounce size={50} color="#2F81B7" />
    </SpinnerContainer>
  </Container>
);
