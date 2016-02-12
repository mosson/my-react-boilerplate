'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import App from 'components/sample2/app';
const global = Function("return this")();
const document = global.document;

if (document) {
  ReactDOM.render(<App/>, document.getElementById('App'));
} else {
  global.template = ReactDOMServer.renderToString(<App preState={global.preState || {}}/>);
}

