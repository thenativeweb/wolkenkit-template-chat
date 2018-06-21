'use strict';

const wolkenkit = require('wolkenkit-client');

const view = {
  messages: document.querySelector('.messages'),
  newMessage: document.querySelector('.new-message'),
  sendMessageForm: document.querySelector('.send-message-form'),

  render (messages) {
    const html = messages.map(message =>
      `<li class="message">
        <div class="label">${message.text}</div>
        <div class="likes" data-message-id="${message.id}">
          <span class="button">👍</span>
          <span class="count">${message.likes || 0}</span>
        </div>
      </li>`
    ).join('');

    view.messages.innerHTML = html;
  }
};

const run = async function () {
  try {
    const chat = await wolkenkit.connect({ host: 'local.wolkenkit.io', port: 3000 });

    view.sendMessageForm.addEventListener('submit', event => {
      event.preventDefault();

      const text = view.newMessage.value;

      chat.communication.message().send({ text }).
        failed(err => console.error(err)).
        delivered(() => {
          view.newMessage.value = '';
          view.newMessage.focus();
        });
    });

    view.newMessage.focus();

    chat.lists.messages.readAndObserve({
      orderBy: { timestamp: 'descending' },
      take: 50
    }).
      failed(err => console.error(err)).
      started(view.render).
      updated(view.render);

    view.messages.addEventListener('click', event => {
      if (!event.target.classList.contains('likes')) {
        return;
      }

      const messageId = event.target.getAttribute('data-message-id');

      chat.communication.message(messageId).like().
        failed(err => console.error(err));
    });
  } catch (ex) {
    console.error(ex);
  }
};

run();
