import React from 'react';
import { graphql } from 'react-apollo';

import LoadingSpinner from './LoadingSpinner';
import CURRENT_USER_QUERY from './CurrentUserWrapper.query.graphql';

class CurrentUserRender extends React.Component {
  render() {
    return this.props.loading ? (
      <LoadingSpinner />
    ) : (
      this.props.render(this.props.currentUser)
    );
  }
}

export const withCurrentUser = graphql(CURRENT_USER_QUERY, {
  props: ({ data }) => ({
    currentUser: data.currentUser,
    loading: data.loading,
    error: data.error,
  }),
});

export default withCurrentUser(CurrentUserRender);
