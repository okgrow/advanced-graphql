import React from 'react';
import Autocomplete from 'react-autocomplete';
import styled from 'styled-components';
import { withState, compose } from 'recompose';
import { graphql } from 'react-apollo';

import INPUT_QUERY from './Input.query.graphql';
import INPUT_MUTATION from './Input.mutation.graphql';
import LIST_QUERY from './List.query.graphql';

const Input = ({
  setInputValue,
  addPlace,
  inputValue,
  data = { locationSuggestion: { formattedAddress: '' } },
}) => {
  const { locationSuggestion = { formattedAddress: '' } } = data;

  return (
    <Autocomplete
      wrapperStyle={styles.wrapper}
      inputProps={{ style: styles.input }}
      menuStyle={styles.menu}
      // open
      getItemValue={item => item.formattedAddress}
      items={[locationSuggestion]}
      renderItem={(item, isHighlighted) => (
        <Item key={item.formattedAddress} isHighlighted={isHighlighted}>
          {item.formattedAddress}
        </Item>
      )}
      value={inputValue}
      shouldItemRender={(item, value) => item && value && value.length > 3}
      onChange={event => setInputValue(event.target.value)}
      onSelect={(value, item) => addPlace(item.formattedAddress)}
    />
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1rem',
  },
  input: {
    width: '100%',
    padding: '1rem',
    height: '4rem',
    color: 'var(--darkBlue)',
    border: '.1rem solid var(--greyBlue)',
    borderRadius: '.2rem',
    fontSize: '2rem',
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '.2rem',
    border: '.1rem dashed var(--greyBlue)',
  },
};

const Item = styled.div`
  cursor: pointer;
  margin: 0 0 0.2rem;
  padding: 0.2rem;
  font-size: 1.6rem;
  border: 0.1rem transparent;
  border-radius: 0.2rem;
  background: ${props =>
    props.isHighlighted ? 'var(--lightBlue)' : 'transparent'};
`;

const withInputState = withState('inputValue', 'setInputValue', '');

const withCreatePlaceMutation = graphql(INPUT_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    addPlace: async address => {
      await mutate({
        variables: { input: { address } },
        update: (store, { data: { createPlace } }) => {
          const data = store.readQuery({ query: LIST_QUERY });

          if (!data.places.find(place => place.id === createPlace.id)) {
            data.places.push(createPlace);
            store.writeQuery({ query: LIST_QUERY, data });
          }
        },
      });

      ownProps.setInputValue('');
    },
  }),
});

const withSuggestionsData = graphql(INPUT_QUERY, {
  options: props => ({
    variables: { search: props.inputValue },
    skip: props.inputValue.length <= 3,
  }),
});

export default compose(
  withInputState,
  withCreatePlaceMutation,
  withSuggestionsData
)(Input);
