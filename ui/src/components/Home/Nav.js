import React from 'react';
import { withApollo } from 'react-apollo';
import Button from '../shared/Button';
import styled from 'styled-components';
import LoginForm from './LoginForm';

const Nav = ({ places, currentUser, client }) =>
  currentUser ? (
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
  ) : (
    <LoginForm />
  );

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1;
`;

export default withApollo(Nav);
