import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

function App() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [input, setInput] = useState('');
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on('connect', () => {
      console.log('Connected to server');
      socketRef.current.emit('join', name);
    });

    socketRef.current.on('chat-message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socketRef.current.on('user-disconnected', (u) => {
      setMessages((prev) => [
        ...prev,
        {
          id: 'sys-' + Date.now(),
          name: 'System',
          message: `${u.name} left the chat`,
          ts: new Date().toISOString(),
        },
      ]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [name]);

  const sendMessage = () => {
    if (!input) return;
    const msg = { name, message: input };
    socketRef.current.emit('chat-message', msg);
    setInput('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Real-time Chat</h2>
      <input
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div style={{ marginTop: '20px', maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((m) => (
          <div key={m.id}>
            <strong>{m.name}:</strong> {m.message}
          </div>
        ))}
      </div>
      <input
        placeholder="Type a message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
