// websocketMiddleware.js

import AsyncStorage from '@react-native-async-storage/async-storage';

let socket = null;

export const connect = async url => {
  const token = await AsyncStorage.getItem('access');

  socket = new WebSocket(url, [], {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  socket.onopen = () => {
    console.log('WebSocket connected');
  };

  socket.onclose = () => {
    console.log('WebSocket disconnected');
  };

  socket.onerror = error => {
    console.error('WebSocket error:', error);
  };

  return socket;
};

export const send = message => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error('WebSocket is not connected');
  }
};

export const close = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

export const onMessage = () => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.onmessage = e => {
      return e.data;
    };
  } else {
    console.error('WebSocket is not connected');
  }
};
