(function () {
  'use strict';

  wolkenkit.connect({ host: 'local.wolkenkit.io', port: 3000 }).
    then(chat => {
      view.sendMessageForm.addEventListener('submit', event => {
        event.preventDefault();

        chat.communication.message().send({ text: view.newMessage.value }).
          failed(err => console.error(err)).
          delivered(() => {
            view.newMessage.value = '';
            view.newMessage.focus();
          });
      });

      view.messages.addEventListener('click', event => {
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
        started(view.render).
        updated(view.render);

      view.newMessage.focus();
    }).
    catch(err => {
      console.error(err);
    });
})();
