import React from 'react';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import Weather from '../shared/Weather';

class Place extends React.Component {
  handleClick = () => this.props.toggleVisited(this.props.place);

  renderCaption = () => {
    const { name, visited, user: { username } } = this.props.place;
    const verb = visited ? 'went to' : 'wants to go to';

    return `${username} ${verb} ${name}`;
  };

  render() {
    const { place } = this.props;

    return (
      <Cell onClick={this.handleClick}>
        <NameContainer>
          <Icon visited={place.visited}>
            <StyledFontAwesome
              name={place.visited ? 'check-square' : 'square-o'}
            />
          </Icon>
          <Name>{this.renderCaption()}</Name>
        </NameContainer>
        {place.location.weather && (
          <Weather
            icon={place.location.weather.icon}
            temperature={place.location.weather.temperature}
          />
        )}
      </Cell>
    );
  }
}

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin: 1rem;
  height: 6rem;
  background-color: var(--white);
  box-shadow: 0 0.2rem 0.4rem var(--shadow);
  border-radius: 0.2rem;
  border: 0.1rem solid var(--white);
  font-size: 2rem;
  transition: all 0.1s ease-out;
  &:active {
    opacity: 0.2;
    transition: all 0.1s ease-in;
  }

  &:focus {
    outline: none;
  }
`;

const NameContainer = styled.div`display: flex;`;

const Name = styled.div`
  font-size: 1.8rem;
  color: var(--grey);
`;

const Icon = styled.span`
  color: var(--${props => (props.visited ? 'paleGreen' : 'paleRed')});
`;

const StyledFontAwesome = styled(FontAwesome)`
  width: 2rem;
  margin-right: 2rem;
  transition: color 0.1s ease-in-out;
`;

export default Place;
