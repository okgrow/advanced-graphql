import 'isomorphic-fetch';
import express from 'express';
import proxy from 'http-proxy-middleware';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import Html from './components/Html';
import ErrorOverlay from './components/ErrorOverlay';
import App from './App/App';

const API_HOST = 'http://localhost:4000';

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
    // to be used by react-apollo
    const component = (
      <StaticRouter location={req.url} context={context}>
        <StyleSheetManager sheet={sheet.instance}>
          <App />
        </StyleSheetManager>
      </StaticRouter>
    );

    const styleTags = sheet.getStyleElement();

    const html = <Html styleTags={styleTags} />;

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
