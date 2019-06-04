import React, { Component } from 'react';
import { DateRangeInput } from '@blueprintjs/datetime';
import {
  Button, ButtonGroup, Checkbox, Divider, FormGroup, Radio, RadioGroup, Switch,
} from '@blueprintjs/core';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class MapControls extends Component {
  render() {
    return (
      <div>
        <FormGroup label="Start/End" labelFor="date-range-input" inline>
          <DateRangeInput
            formatDate={date => moment(date).format('MM-DD-YYYY')}
            value={[this.props.startDate, this.props.endDate]}
            parseDate={str => new Date(str)}
            includeTime={false}
            labelFor="date-range-input"
            onChange={this.props.handleFormChange}
          />
        </FormGroup>
        <Divider vertical="true" />
        <br />
        <div>
          <FormGroup inline label="Data Sources">
            <Checkbox checked={this.props.arrests} label="Arrests" name="input-arrests" onChange={this.props.handleFormChange} />
            <Checkbox checked={this.props.serviceCalls} label="Service Calls" name="input-serviceCalls" onChange={this.props.handleFormChange} />
            <Checkbox checked={this.props.victimCrimes} label="Victim-based Crimes" name="input-victimCrimes" onChange={this.props.handleFormChange} />
          </FormGroup>
        </div>
        <Divider vertical="true" />
        <br />
        <div>
          <FormGroup inline label="Map Type" for="map-type">
            <RadioGroup
              onChange={this.props.handleFormChange}
              selectedValue={this.props.mapType}
              id="map-type"
            >
              <Radio label="Points" name="input-points" value="points" />
              <Radio label="Heatmap" name="input-heatmap" value="heatmap" />
            </RadioGroup>
          </FormGroup>
          <FormGroup inline label="Additional Options">
            <Switch checked={this.props.animate} name="input-animate" label="Animate" onChange={this.props.handleFormChange} />
            <Switch checked={this.props.storeLocal} name="input-storeLocally" label="Store Locally" onChange={this.props.handleFormChange} />
          </FormGroup>
        </div>
        <Divider vertical="true" />
        <br />
        <div>
          <ButtonGroup fill>
            <Button icon="reset" className="bp3-button bp3-intent-danger">Reset</Button>
            <Button icon="arrow-right" className="bp3-button bp3-intent-success" onClick={this.props.handleMapUpdate}>Submit</Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

MapControls.propTypes = {
  arrests: PropTypes.bool,
  victimCrimes: PropTypes.bool,
  serviceCalls: PropTypes.bool,
  animate: PropTypes.bool,
  mapType: PropTypes.string,
  storeLocal: PropTypes.bool,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  handleFormChange: PropTypes.func,
  handleMapUpdate: PropTypes.func,
};

MapControls.defaultProps = {
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
  handleFormChange: () => {},
  handleMapUpdate: () => {},
};
