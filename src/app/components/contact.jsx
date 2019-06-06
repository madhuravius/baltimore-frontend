import {
  ButtonGroup, Button, Card, Classes, Elevation, FormGroup, InputGroup, Intent, TextArea, Overlay,
} from '@blueprintjs/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Contact extends Component {
  render() {
    return (
      <Overlay
        isOpen={this.props.isOpen}
        className={`${Classes.OVERLAY_SCROLL_CONTAINER} contact-form-overlay`}
        onClose={this.props.handleToggleOverlay}
      >
        <Card className="contact-form-container" elevation={Elevation.TWO}>
          <h1>Contact Form</h1>
          <FormGroup
            label="Name"
            inline
            labelFor="name-input"
            labelInfo="(required)"
          >
            <InputGroup id="name-input" intent={Intent.PRIMARY} placeholder="Your name" />
          </FormGroup>
          <FormGroup
            label="E-mail"
            inline
            labelFor="email-input"
            labelInfo="(required)"
          >
            <InputGroup id="email-input" intent={Intent.PRIMARY} placeholder="Your e-mail" />
          </FormGroup>
          <FormGroup
            label="Comments"
            inline
            labelFor="comments-input"
            labelInfo="(required)"
            className="comments-parent"
          >
            <TextArea
              id="comments-input"
              growVertically
              fill
              intent={Intent.PRIMARY}
              placeholder="Comments"
            />
          </FormGroup>
          <ButtonGroup className="comment-buttons">
            <Button intent={Intent.DANGER} onClick={this.props.handleToggleOverlay} icon="cross">Cancel</Button>
            <Button intent={Intent.SUCCESS} icon="envelope">Submit</Button>
          </ButtonGroup>
        </Card>
      </Overlay>
    );
  }
}

Contact.propTypes = {
  isOpen: PropTypes.bool,
  handleToggleOverlay: PropTypes.func,
};

Contact.defaultProps = {
  isOpen: false,
  handleToggleOverlay: () => {},
};
