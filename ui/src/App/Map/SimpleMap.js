import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { Query } from 'react-apollo';

import WeatherMarker from './WeatherMarker';
// import weatherQuery from './weather.query.gql';

const SimpleMap = ({ currentPlace, places }) => {
  const { latitude, longitude } = currentPlace.location;
  return (
    <GoogleMap
      defaultZoom={7}
      defaultCenter={{
        lat: latitude,
        lng: longitude,
      }}
    >
      {places.filter(place => place.location).map(place => (
        <div key={place.id}>
          <Marker
            position={{
              lat: place.location.latitude,
              lng: place.location.longitude,
            }}
            key={place.id}
          />
        </div>
      ))}
      {/*
        Uncomment out the import statement above to enable
        a weather callout for the current location once the weather schema is
        available.
      */}
      {typeof weatherQuery !== 'undefined' && (
        <Query
          query={weatherQuery}
          variables={{
            coords: {
              latitude,
              longitude,
            },
          }}
        >
          {({ data, loading }) => {
            if (loading) return null;
            const { icon, temperature } = data.weather;
            return (
              <WeatherMarker
                latitude={latitude}
                longitude={longitude}
                icon={icon}
                temperature={temperature}
              />
            );
          }}
        </Query>
      )}
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(SimpleMap));
