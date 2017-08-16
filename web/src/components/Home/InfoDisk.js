import React from 'react';
import styled from 'styled-components';

const InfoDisk = ({ currentUser }) => (
  <Disk>
    <WelcomeMessage>
      Welcome{currentUser && ' ' + currentUser.username}!
    </WelcomeMessage>
  </Disk>
);

const Disk = styled.div`
  width: 25rem;
  max-height: 25rem;
  background: var(--lightBlue);
  border-radius: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-weight: bold;
  flex: 2;
  margin-bottom: 10rem;
`;

const WelcomeMessage = styled.div`
  font-size: 4rem;
  letter-spacing: 0.2rem;
  text-align: center;
  color: var(--darkBlue);
`;

export default InfoDisk;
