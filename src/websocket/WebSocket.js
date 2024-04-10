export function WebSocketManager() {
  const ws = new WebSocket('ws://192.168.100.8:8080', [], {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEyNzYwNjQ2LCJpYXQiOjE3MTIzMjg2NDYsImp0aSI6IjBmYjhjOGFkMDllNzRhMWJhYmY5MDAyYTU4MGVkMjg0IiwidXNlcl9pZCI6M30.S0F2e3Gv9t0bfdPNDxPi1tvsJUkBHzWksf7OVo5t-YA',
    },
  });
  return ws;
  // ws.onerror = e => {
  //   console.log(`Error: ${e.message}`);
  // };

  // const sendMessage = data => {
  //   ws.onopen = () => {
  //     ws.send(JSON.stringify(data));
  //   };
  // };

  // ws.onclose = e => {
  //   console.log(e.code, e.reason);
  // };

  // ws.onmessage = e => {
  //   console.log('Received message: ', e.data);
  // };
}
