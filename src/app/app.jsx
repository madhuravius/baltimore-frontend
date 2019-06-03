import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { mapsActions } from '../actions';
import { mapsProps } from '../props';
import { Map } from './containers';

import 'mapbox-gl/dist/mapbox-gl.css';


class App_ extends Component {
  componentDidMount() {
    const { getArrestData } = this.props;
    getArrestData();
  }

  render() {
    const { arrests } = this.props;
    return (
      <Map.default
        data={arrests}
      />
    );
  }
}

const mapStateToProps = state => ({
  arrests: state.maps.arrests,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getArrestData: mapsActions.getArrestData,
}, dispatch);

App_.propTypes = {
  arrests: mapsProps.data,
  getArrestData: PropTypes.func,
};
App_.defaultProps = {
  arrests: {
    features: [],
    type: '',
  },
  getArrestData: () => {},
};

const App = connect(mapStateToProps, mapDispatchToProps)(App_);
export default App;
