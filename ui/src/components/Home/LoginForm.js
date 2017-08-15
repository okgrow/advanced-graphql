import React from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import { graphql, withApollo, compose } from 'react-apollo';
import Button from '../shared/Button';

import CREATE_USER_MUTATION from './LoginForm.mutation.graphql';

class LoginForm extends React.Component {
  state = {
    inputValue: '',
  };

  onChange = event => this.setState({ inputValue: event.target.value });

  onClick = event => {
    event.preventDefault();

    // Ignore whitespace in the user field and prevent blank names
    const username = this.state.inputValue.trim();
    if (!username) return;

    // Either log in or join depending on which button was clicked
    const action = event.currentTarget.name;

    // join or login
    this[action](username);
  };

  login = async username => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      const { token, error } = await response.json();
      if (!token) {
        throw error;
      }

      localStorage.setItem('AUTH_TOKEN', token);

      this.props.client.resetStore();
    } catch (e) {
      throw e;
    }
  };

  join = async username => {
    try {
      await this.props.mutate({ variables: { input: { username } } });

      await this.login(username);
    } catch (e) {
      throw e;
    }
  };

  render() {
    return (
      <Form>
        <UsernameInput
          autoFocus
          placeholder="Enter your name"
          onChange={this.onChange}
          value={this.state.inputValue}
        />
        <LoginButtons>
          <Button label="Log in" name="login" small onClick={this.onClick} />
          <Button label="Join" name="join" small onClick={this.onClick} />
        </LoginButtons>
      </Form>
    );
  }
}

const Form = styled.form`
  display: flex;
  flex: 1;
  width: 30rem;
  flex-direction: column;
  justify-content: flex-start;
`;

const UsernameInput = styled.input`
  padding: 1rem;
  height: 4rem;
  color: var(--darkBlue);
  border: 0.1rem solid var(--greyBlue);
  border-radius: 0.4rem;
  font-size: 2.5rem;
`;

const LoginButtons = styled.div`
  height: 8vh;
  display: flex;
  justify-content: space-around;
`;

const withCreateUser = graphql(CREATE_USER_MUTATION);

export default compose(withApollo, withCreateUser)(LoginForm);
