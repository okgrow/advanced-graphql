import 'isomorphic-fetch';
import express from 'express';
import proxy from 'http-proxy-middleware';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import Cache from 'apollo-cache-inmemory';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import Html from './components/Html';
import ErrorOverlay from './components/shared/ErrorOverlay';
import App from './components/App';

const API_HOST = 'http://localhost:8080';

const app = express();

const apiProxy = proxy({ target: API_HOST, changeOrigin: true });
app.use('/graphql', apiProxy);
app.use('/graphiql', apiProxy);
app.use('/login', apiProxy);
app.use('/logout', apiProxy);

app.use(async (req, res) => {
  const context = {};
  const sheet = new ServerStyleSheet();

  try {
    const cache = new Cache();

    const client = new ApolloClient({
      link: new HttpLink({
        uri: `${API_HOST}/graphql`,
      }),
      cache,
    });

    // to be used by react-apollo
    const component = (
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={context}>
          <StyleSheetManager sheet={sheet.instance}>
            <App />
          </StyleSheetManager>
        </StaticRouter>
      </ApolloProvider>
    );

    const content = await renderToStringWithData(component);

    const state = cache.extract();

    const styleTags = sheet.getStyleElement();

    const html = <Html styleTags={styleTags} content={content} state={state} />;

    res.status(200);
    res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
  } catch (e) {
    console.log(e);

    const component = (
      <StyleSheetManager sheet={sheet.instance}>
        <ErrorOverlay>
          Server-side rendering error... Check the logs!
        </ErrorOverlay>
      </StyleSheetManager>
    );

    const errorContent = ReactDOM.renderToString(component);
    const errorStyleTags = sheet.getStyleElement();

    const htmlError = (
      <Html styleTags={errorStyleTags} errorContent={errorContent} />
    );

    res.status(500);
    res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(htmlError)}`);
  }

  res.end();
});

export default app;
