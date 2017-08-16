import React from 'react';
import styled from 'styled-components';
import Header from '../shared/Header';
import List from './List';

const Bucket = () => (
  <FlexWrapper>
    <Header title="My Places" />
    <List />
  </FlexWrapper>
);

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Bucket;
