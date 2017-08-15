import React from 'react';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import ClientApp from './src/client';

const renderApp = () =>
  hydrate(
    <AppContainer>
      <ClientApp />
    </AppContainer>,
    document.getElementById('root')
  );

renderApp();

if (module.hot) {
  module.hot.accept('./src/client', () => {
    // renderApp()
    // Anyone wanna help for improving this? 😳
    window.location.reload();
  });
}
