import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  Header, MapVisualization, RawData, SourcesAndMethods, Summary,
} from './containers';
import { commonConstants } from '../constants';

import 'mapbox-gl/dist/mapbox-gl.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="content">
          <Switch>
            <Route exact path={commonConstants.BASE_ROUTE} component={Summary} />
            <Route path={commonConstants.MAP_ROUTE} component={MapVisualization} />
            <Route path={commonConstants.DATA_VIEW_ROUTE} component={RawData} />
            <Route
              path={commonConstants.SOURCES_AND_METHODS_ROUTE}
              component={SourcesAndMethods}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
