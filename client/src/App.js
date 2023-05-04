import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Listen for the 'eventName' event and update the state with the message
    socket.on('eventName', (data) => {
      setMessage(data);
    });

    return () => {
      // Clean up the event listener when the component unmounts
      socket.off('eventName');
    };
  }, []);

  const handleClick = () => {
    // Trigger the 'eventName' event with a message
    socket.emit('eventName', 'Hello, server!');
  };

  return (
    <div>
      <h1>Socket.IO Example</h1>
      <button onClick={handleClick}>Send Message</button>
      {message && <p>Server response: {message}</p>}
    </div>
  );
}

export default App;
