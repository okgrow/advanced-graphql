import React from 'react';

const Html = ({ content, state, styleTags, errorContent }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <title>Travel Bucket List</title>
      {styleTags}
    </head>
    <body>
      {errorContent && <div dangerouslySetInnerHTML={{ __html: errorContent }} />}
      {!errorContent && <div id="root" dangerouslySetInnerHTML={{ __html: content }} />}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state)};`,
        }}
        charSet="UTF-8"
      />
      {!errorContent && <script src="http://localhost:3001/client.js" charSet="UTF-8" />}
    </body>
  </html>
);

export default Html;
