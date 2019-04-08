import $ from 'jquery';
import md5 from 'crypto-js/md5';
import moment from 'moment'

function createGravatarUrl (username) {
  let userhash = md5(username);
  return `http://www.gravatar.com/avatar/${userhash.toString()}`;
}

export function promptForUsername () {
  let username = prompt('Enter a username');
  return username.toLowerCase();
}

export class ChatForm {
  constructor (form_selector, input_selector) {
    this.$form = $(form_selector);
    this.$input = $(input_selector);
  }

  init (submit_callback) {
    this.$form.submit((event) => {
      event.preventDefault();
      let val = this.$input.val();
      submit_callback(val);
      this.$input.val('');
    });

    this.$form.find('button').on('click', () => this.$form.submit());
  }
}

export class ChatList {
  constructor (list_selector, username) {
    this.$list = $(list_selector);
    this.username = username;
  }

  init () {
    this.timer = setInterval(() => {
      $('[data-time]').each((idx, element) => {
        let $element = $(element);
        let timestamp = new Date().setTime($element.attr('data-time'));
        let ago = moment(timestamp).fromNow();
        $element.html(ago);
      });
    }, 1000);
  }

  drawMessage ({user: u, timestamp: t, message: m}) {
    let $message_row = $('<li>', {'class': 'message-row'});

    if (this.username === u) $message_row.addClass('me');

    let $message = $('<p>');
    $message.append($('<span>', {'class': 'message-username', text: u}));
    $message.append($('<span>', {
      'class': 'timestamp',
      'data-time': t,
      text: moment(t).fromNow()
    }));
    $message.append($('<span>', {'class': 'message-message', text: m}));

    let $img = $('<img>', {src: createGravatarUrl(u), title: u});

    $message_row.append($img);
    $message_row.append($message);
    this.$list.append($message_row);
    $message_row.get(0).scrollIntoView();
  }
}
