import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { ThreeBounce } from 'better-react-spinkit';

import Title from './Title';
import InfoDisk from './InfoDisk';
import Nav from './Nav';
import LoginForm from './LoginForm';

import currentUserQuery from './currentUser.query.gql';

const Home = ({ places }) => (
  <Query query={currentUserQuery}>
    {({ data: { currentUser }, loading, error }) => {
      const controls = currentUser ? <Nav /> : <LoginForm />;
      return (
        <Container>
          <Wrapper>
            <Title>My Bucket List</Title>
            <InfoDisk count={places.length} />
            {loading ? (
              <Spinner>
                <ThreeBounce size={20} color="#2F81B7" />
              </Spinner>
            ) : (
              controls
            )}
          </Wrapper>
        </Container>
      );
    }}
  </Query>
);

const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 5rem 5rem 7rem 5rem;
  border-radius: 1rem;
  border: 3px solid #eee;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Spinner = styled.div`
  display: flex;
  height: 10rem;
  justify-content: center;
  align-items: center;
  width: 100%
  flex: 1;
`;

export default Home;
