import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { fromJS } from 'immutable';
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
        width: '100vw',
        height: '100vh',
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

  loadData(data) {
    const mapStyle = defaultMapStyle
      .setIn(['sources', 'points'], fromJS({ type: 'geojson', data }))
      .set('layers', defaultMapStyle.get('layers').push(dataLayer));
    this.setState({ mapStyle });
  }

  render() {
    const { mapStyle, viewport } = this.state;
    return (
      <ReactMapGL
        {...viewport}
        mapStyle={mapStyle}
        mapboxApiAccessToken={TOKEN} // eslint-disable-next-line no-shadow
        onViewportChange={viewport => this.setState({ viewport })}
      >
        <div style={{ position: 'absolute', right: 0 }}>
          <NavigationControl />
        </div>
      </ReactMapGL>
    );
  }
}

Map.propTypes = {
  data: mapsProps.data,
};

Map.defaultProps = {
  data: {
    features: [],
    type: '',
  },
};
