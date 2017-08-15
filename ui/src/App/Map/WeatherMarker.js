/* global google */
import React from 'react';
import styled from 'styled-components';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';

const WeatherMarker = ({ latitude, longitude, icon, temperature }) => (
  <InfoBox
    defaultPosition={new google.maps.LatLng(latitude, longitude)}
    options={{ closeBoxURL: '', enableEventPropagation: true }}
  >
    <WeatherTooltip>
      <Container>
        <Icon>{icon}</Icon> <Temperature>{temperature}</Temperature>
      </Container>
    </WeatherTooltip>
  </InfoBox>
);

const WeatherTooltip = styled.div`
  background-color: var(--midnightBlue);
  color: white;
  padding: 1.2rem 2.4rem;
  border-radius: 1rem;
  font-size: 2rem;
  opacity: 0.8;
`;

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: flex-end;
`;

const Icon = styled.div`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  font-size: 3rem;
`;

const Temperature = styled.div`
   display: flex;
   flex: 1;
   flex-direction: row;
   align-items: center
   ;
}
  width: 6rem;
`;

export default WeatherMarker;
