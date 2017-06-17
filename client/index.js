(function () {
  'use strict';

  wolkenkit.connect({ host: 'local.wolkenkit.io', port: 3000 }).
    then(chat => {
      dom.sendMessageForm.addEventListener('submit', event => {
        event.preventDefault();

        chat.communication.message().send({ text: dom.newMessage.value }).
          failed(err => console.error(err)).
          delivered(() => {
            dom.newMessage.value = '';
            dom.newMessage.focus();
          });
      });

      dom.messages.addEventListener('click', event => {
        if (!event.target.classList.contains('likes')) {
          return;
        }

        const messageId = event.target.getAttribute('data-message-id');

        chat.communication.message(messageId).like().
          failed(err => console.error(err));
      });

      chat.lists.messages.readAndObserve({
        orderBy: { timestamp: 'descending' },
        take: 50
      }).
        failed(err => console.error(err)).
        started(dom.render).
        updated(dom.render);

      dom.newMessage.focus();
    }).
    catch(err => {
      console.error(err);
    });
})();
