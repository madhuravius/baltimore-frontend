import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import ReactMapGL, { NavigationControl } from 'react-map-gl';

import { commonConstants, mapsConstants } from '../../constants';
import { mapsProps } from '../../props';
import { defaultMapStyle, dataLayer } from '../../util/map';

const { TOKEN } = commonConstants;

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapStyle: defaultMapStyle,
      viewport: {
        width: '100%',
        height: '100%',
        latitude: mapsConstants.BALTIMORE_BASE_COORDS_LATITUDE,
        longitude: mapsConstants.BALTIMORE_BASE_COORDS_LONGITUDE,
        zoom: 11,
        bearing: 0,
        pitch: 0,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.loadData(nextProps.data);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // only fire if INTERNALLY updating OR from updateMap batch operation
    if (nextProps.updateMap || !isEqual(this.state.viewport, nextState.viewport)) return true;
    return false;
  }

  loadData(data) {
    const mapStyle = defaultMapStyle
      .setIn(['sources', 'points'], fromJS({ type: 'geojson', data }))
      .set('layers', defaultMapStyle.get('layers').push(dataLayer));
    this.setState({ mapStyle });
  }

  handleStyleLoad(map) {
    map.resize();
  }

  render() {
    const { mapStyle, viewport } = this.state;
    return (
      <div className="visualization">
        <ReactMapGL
          {...viewport}
          mapStyle={mapStyle}
          mapboxApiAccessToken={TOKEN} // eslint-disable-next-line no-shadow
          onViewportChange={viewport => this.setState({ viewport })}
          onStyleLoad={this.handleStyleLoad}
        >
          <div style={{ position: 'absolute', right: 0 }}>
            <NavigationControl />
          </div>
        </ReactMapGL>
      </div>
    );
  }
}

Map.propTypes = {
  updateMap: PropTypes.bool,
  data: mapsProps.data,
};

Map.defaultProps = {
  updateMap: true,
  data: {
    features: [],
    type: '',
  },
};
