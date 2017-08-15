import React from 'react';
import styled from 'styled-components';
import Header from '../shared/Header';
import Button from '../shared/Button';
import SimpleMap from './SimpleMap';

const Map = ({ match: { params: { lat, lng } } }) => (
  <FlexColumn>
    <Header title="A Place" />
    <Button label="Back to the Bucket" goTo={{ path: 'bucket' }} small />
    <SimpleMap
      containerElement={<MapContainer />}
      mapElement={<div style={{ height: '100%' }} />}
      coords={{ latitude: Number(lat), longitude: Number(lng) }}
    />
  </FlexColumn>
);

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MapContainer = styled.div`
  margin: 5vw;
  border: 1rem solid var(--lightBlue);
  border-radius: 1rem;
  width: 90vw;
  height: 60vh;
`;

export default Map;
