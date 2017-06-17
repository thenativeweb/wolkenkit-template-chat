'use strict';

const initialState = {
  text: '',
  likes: 0,
  isAuthorized: {
    commands: {
      send: { forPublic: true },
      like: { forPublic: true }
    },
    events: {
      sent: { forPublic: true },
      liked: { forPublic: true }
    }
  }
};

const commands = {
  send (message, command, mark) {
    if (!command.data.text) {
      return mark.asRejected('Text is missing.');
    }

    message.events.publish('sent', {
      text: command.data.text
    });

    mark.asDone();
  },

  like (message, command, mark) {
    message.events.publish('liked', {
      likes: message.state.likes + 1
    });

    mark.asDone();
  }
};

const events = {
  sent (message, event) {
    message.setState({
      text: event.data.text
    });
  },

  liked (message, event) {
    message.setState({
      likes: event.data.likes
    });
  }
};

module.exports = { initialState, commands, events };
