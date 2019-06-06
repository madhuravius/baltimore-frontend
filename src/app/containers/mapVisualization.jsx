import { get } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { mapsActions } from '../../actions';
import { MapControls, Map } from '../components';
import { mapsProps } from '../../props';

const DEFAULT_STATE = {
  arrests: true,
  victimCrimes: false,
  serviceCalls: false,
  animate: false,
  storeLocal: true,
  mapType: 'heatmap',
  startDate: moment()
    .add(-60, 'day')
    .toDate(),
  endDate: new Date(),
  updateMap: false,
};

class MapVisualization_ extends Component {
  constructor(props) {
    super(props);
    this.state = { ...DEFAULT_STATE };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleMapReset = this.handleMapReset.bind(this);
    this.handleMapUpdate = this.handleMapUpdate.bind(this);
  }

  componentDidMount() {
    const { getData } = this.props;
    getData();
  }

  // eslint-disable-next-line no-unused-vars
  componentWillReceiveProps(nextProps) {
    if (get(nextProps, 'data.features', []).length) this.handleMapUpdate();
  }

  handleMapReset() {
    this.setState({ ...DEFAULT_STATE }, () => {
      this.handleMapUpdate();
    });
  }

  handleMapUpdate() {
    // eslint-disable-next-line arrow-body-style
    this.setState({ updateMap: true }, () => {
      this.setState({
        updateMap: false,
      });
    });
  }

  handleFormChange(eventData) {
    const bools = ['arrests', 'victimCrimes', 'serviceCalls', 'animate', 'storeLocal'];
    if (Array.isArray(eventData)) {
      // handle daterange
    } else {
      // handle everything else
      const [, titleToEvaluate] = eventData.target.name.split('input-');
      if (bools.includes(titleToEvaluate)) {
        // handle bool fields on change
        const stateObjectToSet = {};
        stateObjectToSet[`${titleToEvaluate}`] = !this.state[`${titleToEvaluate}`];
        this.setState(stateObjectToSet);
      } else if (eventData.target.type === 'radio') {
        this.setState({ mapType: eventData.target.value });
      }
    }
  }

  render() {
    return (
      <div className="visualization-parent row">
        <div className="col-sm-4">
          <h1 className="bp4-heading">{this.props.title}</h1>
          <MapControls
            handleFormChange={this.handleFormChange}
            handleMapUpdate={this.handleMapUpdate}
            handleMapReset={this.handleMapReset}
            arrests={this.state.arrests}
            victimCrimes={this.state.victimCrimes}
            mapType={this.state.mapType}
            serviceCalls={this.state.serviceCalls}
            animate={this.state.animate}
            storeLocal={this.state.storeLocal}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
          />
        </div>
        <div className="col-sm-8">
          <Map
            data={this.props.data}
            mapType={this.state.mapType}
            updateMap={this.state.updateMap}
          />
        </div>
      </div>
    );
  }
}

MapVisualization_.propTypes = {
  title: PropTypes.string,
  data: mapsProps.data,
};
MapVisualization_.defaultProps = {
  title: '',
  data: {
    features: [],
    type: '',
  },
};


const mapStateToProps = state => ({
  data: state.maps.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getData: mapsActions.getData,
}, dispatch);

MapVisualization_.propTypes = {
  data: mapsProps.data,
  getData: PropTypes.func,
};
MapVisualization_.defaultProps = {
  data: {
    features: [],
    type: '',
  },
  getData: () => {},
};

const MapVisualization = connect(mapStateToProps, mapDispatchToProps)(MapVisualization_);
export default MapVisualization;
