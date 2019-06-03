import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app/app';
import { store } from './store';

import './static/stylesheets/styles.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, // eslint-disable-next-line comma-dangle
  document.getElementById('root')
);
