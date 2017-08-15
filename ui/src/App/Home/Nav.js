import React from 'react';
import { withApollo } from 'react-apollo';
import Button from '../../components/Button';
import styled from 'styled-components';

const Nav = ({ client }) => (
  <Container>
    <Button label="Explore" goTo={{ path: 'bucket' }} />
    <Button
      label="Log out"
      small
      onClick={() => {
        localStorage.removeItem('AUTH_TOKEN');
        client.resetStore();
      }}
    />
  </Container>
);

const Container = styled.div`
  display: flex;
  height: 10rem;
  flex-direction: column;
  justify-content: space-around;
  flex: 1;
`;

export default withApollo(Nav);
