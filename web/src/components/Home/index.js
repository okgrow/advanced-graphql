import React from 'react';
import Title from './Title';
import InfoDisk from './InfoDisk';
import styled from 'styled-components';
import Nav from './Nav';
import CurrentUserWrapper from '../shared/CurrentUserWrapper';

const Home = () => (
  <FlexWrapper>
    <Title>The Bucket List</Title>
    <CurrentUserWrapper
      render={currentUser => [
        <InfoDisk key="disk" currentUser={currentUser} />,
        <Nav key="nav" currentUser={currentUser} />,
      ]}
    />
  </FlexWrapper>
);

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  background-image: linear-gradient(
    135deg,
    var(--gradientGold) 10%,
    var(--gradientBlue) 100%
  );
`;

export default Home;
