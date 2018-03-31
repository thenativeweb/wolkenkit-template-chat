(function () {
  'use strict';

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

  window.view = view;
})();
