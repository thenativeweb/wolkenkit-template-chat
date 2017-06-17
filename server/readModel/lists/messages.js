'use strict';

const fields = {
  text: { initialState: '' },
  likes: { initialState: 0 },
  timestamp: { initialState: 0, fastLookup: true }
};

const when = {
  'communication.message.sent': (messages, event, mark) => {
    messages.add({
      text: event.data.text,
      timestamp: event.metadata.timestamp
    });
    mark.asDone();
  },

  'communication.message.liked': (messages, event, mark) => {
    messages.update({
      where: { id: event.aggregate.id },
      set: {
        likes: event.data.likes
      }
    });
    mark.asDone();
  }
};

module.exports = { fields, when };
