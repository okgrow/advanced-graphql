import React from 'react';
import styled, { keyframes } from 'styled-components';
import { graphql, compose } from 'react-apollo';
import Input from './Input';
import Place from './Place';
import Button from '../shared/Button';
import { withLoadingSpinner } from '../shared/LoadingSpinner';

import LIST_QUERY from './List.query.graphql';
import LIST_MUTATION from './List.mutation.graphql';
// import LIST_SUBSCRIPTION_UPDATE from './List.subscription.update.graphql';

class List extends React.Component {
  componentWillMount() {
    // note: avoid the App to error when the client is not set for subscriptions
    if (typeof LIST_SUBSCRIPTION_UPDATE !== 'undefined') {
      this.props.subscribeToMore({
        document: LIST_SUBSCRIPTION_UPDATE,
        updateQuery: (prev, { subscriptionData }) => {
          const { placeUpdated } = subscriptionData;

          if (!placeUpdated) {
            return prev;
          }

          const index = prev.places.findIndex(
            place => place.id === placeUpdated.id
          );

          return {
            ...prev,
            places: [
              ...prev.places.slice(0, index),
              placeUpdated,
              ...prev.places.slice(index + 1),
            ],
          };
        },
      });
    }
  }

  render() {
    const { toggleVisited, places } = this.props;

    return (
      <Container>
        <Input />
        {!places.length && <NoPlaces>No places in your bucket list!</NoPlaces>}

        {places.length > 0 && (
          <ItemList>
            {places.map(place => (
              <Item key={place.id}>
                <Place place={place} toggleVisited={toggleVisited} />
                {place.location && (
                  <Button
                    small
                    label="View on Map"
                    goTo={{
                      path: 'map',
                      lat: place.location.latitude,
                      lng: place.location.longitude,
                    }}
                  />
                )}
              </Item>
            ))}
          </ItemList>
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  max-width: 120rem;
  width: 60vw;
`;

const NoPlaces = styled.div`
  text-align: center;
  font-size: 3rem;
  color: var(--darkBlue);
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1rem;

  opacity: 0;
  animation: ${fadeIn} ease 0.4s forwards;
`;

const withData = graphql(LIST_QUERY, {
  props: ({ data }) => ({
    places: data.places || [],
    loading: data.loading,
    error: data.error,
    subscribeToMore: data.subscribeToMore,
  }),
});

const withUpdatePlaceMutation = graphql(LIST_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    toggleVisited: async place => {
      await mutate({
        variables: { input: { id: place.id, visited: !place.visited } },
        optimisticResponse: {
          __typename: 'Mutation',
          updatePlace: {
            ...place,
            visited: !place.visited,
          },
        },
      });
    },
  }),
});

// prettier-ignore
export default compose(
  withData,
  withLoadingSpinner,
  withUpdatePlaceMutation
)(List);
