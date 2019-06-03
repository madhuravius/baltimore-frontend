import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import App from '../../src/app/app';
import { commonConstants, mapsConstants } from '../../src/constants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  common: {
    error: {},
  },
  maps: {
    arrests: {
      features: [],
      type: '',
    },
  },
});

describe('', () => {
  it('renders without crashing', () => {
    const mock = new MockAdapter(axios);
    const data = {
      features: [],
      type: 'FeatureCollection',
    };
    mock.onGet(`${commonConstants.BASE_URL}${mapsConstants.API_GET_ARRESTS_URL}`).reply(200, data);

    const div = document.createElement('div');
    ReactDOM.render(<App store={store} />, div);
  });
});
