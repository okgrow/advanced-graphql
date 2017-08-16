// Taken from MDG, to be abstracted in a styled-component + svg :)
import React from 'react';
import { branch, renderComponent } from 'recompose';

const TICK_COUNTS = { small: 16, medium: 24, large: 32 };

const LoadingSpinner = ({ size = 'medium' }) => {
  const ticks = [];
  for (let i = 0; i < (TICK_COUNTS[size] || 24); i++) {
    ticks.push(<div key={i} className="spinner-tick" />);
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className={`loading-spinner ${size}`}>
        <div className="spinner-wheel" />
        <div className="spinner-ticks">{ticks}</div>
      </div>
    </div>
  );
};

export const withLoadingSpinner = branch(
  props => props.loading || (props.data && props.data.loading),
  renderComponent(LoadingSpinner)
);

export default LoadingSpinner;
