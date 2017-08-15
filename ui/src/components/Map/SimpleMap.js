import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { withLoadingSpinner } from '../shared/LoadingSpinner';
import Weather from '../shared/Weather';
import MAP_QUERY from './SimpleMap.query.graphql';

const SimpleMap = ({ data, coords: { latitude, longitude } }) => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={{
      lat: latitude,
      lng: longitude,
    }}
  >
    <Marker
      position={{
        lat: latitude,
        lng: longitude,
      }}
    />
    {data &&
      data.weather && (
        <InfoBox
          defaultPosition={new google.maps.LatLng(latitude, longitude)}
          options={{ closeBoxURL: ``, enableEventPropagation: true }}
        >
          <WeatherTooltip>
            <Weather
              icon={data.weather.icon}
              temperature={data.weather.temperature}
            />
          </WeatherTooltip>
        </InfoBox>
      )}
  </GoogleMap>
);

const WeatherTooltip = styled.div`
  background-color: var(--lightBlue);
  padding: 1.2rem;
  font-size: 2rem;
`;

export default compose(withLoadingSpinner, withGoogleMap)(SimpleMap);
