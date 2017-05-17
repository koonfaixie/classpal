import WebSocket from 'reconnecting-websocket';

// import actions from './actions'

const socketMiddleware = (function(){ 
  var socket_list = {};
  var domain = window.location.host;

  const onOpen = (ws,store,label) => evt => {
    //Send a handshake, or authenticate with remote end
    //Tell the store we're connected
    // store.dispatch(actions.connected());
  }

  const onClose = (ws,store,label,connect_type) => evt => {
    //Tell the store we've disconnected
    switch(connect_type){
      case 'chat':
        store.dispatch({type:'DROP_MESSAGES', label: label});
        break;
    }
  }

  const onMessage = (ws,store) => evt => {
    //Parse the JSON message received on the websocket
    var receivemsg = JSON.parse(evt.data);
    switch(receivemsg.type) {
      case 'update':
        store.dispatch({type:'RECEIVING_UPDATES'})
        store.dispatch({type:'RECEIVE_UPDATES', payload: receivemsg});
        break;
      case 'chat':
        store.dispatch({type:'RECEIVE_MESSAGES', payload: receivemsg});
        break;
      case 'assignments':
        store.dispatch({type:'RECEIVE_ASSIGNMENTS', payload: receivemsg});
        break;
      case 'assignments-init':
        store.dispatch({type:'RECEIVE_ASSIGNMENTS_INIT', payload: receivemsg});
        break;
      case 'assignments-completed':
        store.dispatch({type:'RECEIVE_ASSIGNMENTS_COMPLETED', payload: receivemsg});
        break;
      case 'practices':
        store.dispatch({type:'RECEIVE_PRACTICES', payload: receivemsg});
        break;
      case 'practices-init':
        store.dispatch({type:'RECEIVE_PRACTICES_INIT', payload: receivemsg});
        break;
      case 'practices-completed':
        store.dispatch({type:'RECEIVE_PRACTICES_COMPLETED', payload: receivemsg});
        break;
      case 'forums-updates':
        store.dispatch({type:'RECEIVE_FORUMS_UPDATES', payload: receivemsg});
        break;
      case 'forums-updates-init':
        store.dispatch({type:'RECEIVE_FORUMS_UPDATES_INIT', payload: receivemsg});
        break;
      case 'forums':
        store.dispatch({type:'RECEIVE_FORUMS', payload: receivemsg});
        break;
      case 'forums-init':
        store.dispatch({type:'RECEIVE_FORUMS_INIT', payload: receivemsg});
        break;
      case 'updates-close':
        break;
      case 'assignments-close':
        store.dispatch({type:'DROP_ASSIGNMENTS', payload: receivemsg.label})
        break
      case 'practices-close':
        store.dispatch({type:'DROP_PRACTICES', payload: receivemsg.label})
        break;
      default:
        console.log("Received unknown message type: '" + receivemsg.type + "'");
        break;
    }
  }

  return store => next => action => {
    switch(action.type) {
      //The user wants us to connect
      case 'CONNECT':
        //Start a new connection to the server
        let connect_socket = socket_list[action.label];
        if (connect_socket == undefined){
            let ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
            let new_socket = new WebSocket(ws_scheme+'://'+domain+'/ws'+action.url+'?token='+action.token);
            socket_list[action.label] = (new_socket)
            new_socket.onmessage = onMessage(new_socket,store);
            new_socket.onclose = onClose(new_socket,store,action.label,action.connect_type);
            new_socket.onopen = onOpen(new_socket,store,action.label);
        } else if (connect_socket.length == 0) {
            let ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
            let new_socket = new WebSocket(ws_scheme+'://'+domain+'/ws'+action.url+'?token='+action.token);
            socket_list[action.label] = (new_socket)
            new_socket.onmessage = onMessage(new_socket,store);
            new_socket.onclose = onClose(new_socket,store,action.label);
            new_socket.onopen = onOpen(new_socket,store);
        } else {}
        break;

      //The user wants us to disconnect
      case 'DISCONNECT':
        let disconnect_socket = socket_list[action.label];
        if (disconnect_socket == undefined) {
          socket_list[action.label] = null
        } else if (disconnect_socket.length > 0) {
          disconnect_socket.close()
          socket_list[action.label] = null
        } else {
          socket_list[action.label] = null
        }
        break;

      //Send the 'SEND_MESSAGE' action down the websocket to the server
      case 'SEND_MESSAGE':
        let send_socket = socket_list[action.label]
        if (send_socket == undefined) {
          let ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
          let new_socket = new WebSocket(ws_scheme+'://'+domain+'/ws'+action.url+'?token='+action.token);
          socket_list[action.label] = (new_socket)
          new_socket.onmessage = onMessage(new_socket,store);
          new_socket.onclose = onClose(new_socket,store,action.label);
          new_socket.onopen = onOpen(new_socket,store);

          let send_socket = socket_list[action.label]
          send_socket.send(JSON.stringify(action.message))
        } else if (send_socket.length == 0) {
          let ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
          let new_socket = new WebSocket(ws_scheme+'://'+domain+'/ws'+action.url+'?token='+action.token);
          socket_list[action.label] = (new_socket)
          new_socket.onmessage = onMessage(new_socket,store);
          new_socket.onclose = onClose(new_socket,store,action.label);
          new_socket.onopen = onOpen(new_socket,store);

          let send_socket = socket_list[action.label]
          send_socket.send(JSON.stringify(action.message))
        } else {
          let send_socket = socket_list[action.label]
          var message = {
              message: action.message,
              token: action.token,
          }
          send_socket.send(JSON.stringify(message))
        }
        break;

      //This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action);
    }
  }

})();

export default socketMiddleware