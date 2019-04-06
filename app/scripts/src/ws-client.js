let socket;

function init (url) {
  socket = new WebSocket(url);
  console.log('connecting...');
}

function registerOpenHandler (handler_fn) {
  socket.onopen = () => {
    console.log('open');
    handler_fn();
  };
}

function registerMessageHandler (handler_fn) {
  socket.onmessage = (e) => {
    console.log('message', e.data);
    let data = JSON.parse(e.data);
    handler_fn(data);
  };
}

function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

export default {
  init,
  registerOpenHandler,
  registerMessageHandler,
  sendMessage
}
