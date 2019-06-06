import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core';
import { get } from 'lodash';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Contact } from '../components';
import { commonConstants } from '../../constants';

class Header_ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayIsOpen: false,
    };
    this.handleToggleOverlay = this.handleToggleOverlay.bind(this);
  }

  handleToggleOverlay() {
    this.setState(state => ({
      overlayIsOpen: !state.overlayIsOpen,
    }));
  }

  render() {
    const locationPath = get(this.props, 'location.pathname', '');
    return (
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>
            <Link to={commonConstants.BASE_ROUTE}>
              {commonConstants.PAGE_TITLE}
            </Link>
          </NavbarHeading>
          <NavbarDivider />
          <Link to={commonConstants.BASE_ROUTE}>
            <Button
              className={Classes.MINIMAL}
              active={locationPath === commonConstants.BASE_ROUTE}
              icon="home"
              text="Summary"
            />
          </Link>
          <Link to={commonConstants.MAP_ROUTE}>
            <Button
              className={Classes.MINIMAL}
              active={locationPath === commonConstants.MAP_ROUTE}
              icon="map"
              text="Map"
            />
          </Link>
          <Link to={commonConstants.DATA_VIEW_ROUTE}>
            <Button
              className={Classes.MINIMAL}
              active={locationPath === commonConstants.DATA_VIEW_ROUTE}
              icon="timeline-line-chart"
              text="Data"
            />
          </Link>
          <Link to={commonConstants.SOURCES_AND_METHODS_ROUTE}>
            <Button
              className={Classes.MINIMAL}
              active={locationPath === commonConstants.SOURCES_AND_METHODS_ROUTE}
              icon="list-detail-view"
              text="Sources &amp; Methods"
            />
          </Link>
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <Button
            className={Classes.MINIMAL}
            icon="envelope"
            text="Contact"
            onClick={this.handleToggleOverlay}
          />
          <Contact
            handleToggleOverlay={this.handleToggleOverlay}
            isOpen={this.state.overlayIsOpen}
          />
        </NavbarGroup>
      </Navbar>
    );
  }
}

export default withRouter(Header_);
