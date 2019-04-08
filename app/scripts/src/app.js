import socket from './ws-client';
import {UserStore} from './storage';
import {ChatForm, ChatList, promptForUsername} from './dom';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

let user_store = new UserStore('x-chatjs/u');
let username = user_store.get();
if (!username) {
  username = promptForUsername();
  user_store.set(username);
}

class ChatApp {
  constructor () {
    this.chat_form = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
    this.chat_list = new ChatList(LIST_SELECTOR, username);

    socket.init('ws://localhost:3001');

    socket.registerOpenHandler(() => {
      this.chat_form.init((data) => {
        let message = new ChatMessage({message: data});
        socket.sendMessage(message.serialize());
      });
      this.chat_list.init();
    });

    socket.registerMessageHandler((data) => {
      console.log(data);
      let message = new ChatMessage(data);
      this.chat_list.drawMessage(message.serialize());
    });
  }
}

class ChatMessage {
  constructor ({
    message: m,
    user: u=username,
    timestamp: t=(new Date()).getTime()
  }) {
    this.message = m;
    this.user = u;
    this.timestamp = t;
  }

  serialize() {
    return {
      user: this.user,
      message: this.message,
      timestamp: this.timestamp
    };
  }
}

export default ChatApp;
