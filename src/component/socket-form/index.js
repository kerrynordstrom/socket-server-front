import { connect } from 'react-redux';
import React, { Fragment, Component } from 'react';

import { setSocketAction } from '../../action/socket';

class SocketForm extends Component {
  state = {
    roomName: '',
    roomNameDirty: false,
    roomNameError: 'roomName is required',
  
    submitted: false,
  };

  emptyState = { ...this.state };

  generateClassName = (formField) => 
    (this.state[`${formField}Dirty`] &&
      this.state[`${formField}Error`] ? 'error' : null);

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: this.handleValidation(name, value),
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const { roomNameError, roomName } = this.state;

    if (!roomNameError) {
      // Rob - if the user doesn't have a socket open, open one
      // const socket = this.props.socket || this.props.socketConnect();
      this.props.onComplete(roomName);
      this.setState(this.emptyState);
    } else {
      this.setState({
        roomNameDirty: true,
        // Rob - I don't think we use submitted anywhere
        submitted: true,
      });
    }
  }

  handleValidation = (name, value) =>
    (value.length === 0 ? 'Room name is required.' : null);

  generateInput = formField => (
    <Fragment>
      <input
        className={this.generateClassName(formField)}
        name={formField}
        placeholder={`${formField}...`}
        type="text"
        value={this.state[formField]}
        onChange={this.handleChange}
      />
      {this.state[`${formField}Dirty`] ? <p>{this.state[`${formField}Error`]}</p> : null}
    </Fragment>
  );

  render() {
    // Rob - type should be either join or create
    const { type } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        {this.generateInput('roomName')}
        <button type="submit">{type}</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  socket: state.socket,
});

const mapDispatchToProps = dispatch => ({
  socketConnect: () => dispatch(setSocketAction(dispatch)),
  // TODO: Rob - pass dispatch as payload to send to reducer to go to socket listeners...
});

export default connect(mapStateToProps, mapDispatchToProps)(SocketForm);
