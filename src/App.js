import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  const [modifiedMessage, setModifiedMessage] = useState('');

  const handleSubmit = async () => {
    try {
      // Reemplaza 'URL_DEL_BACKEND' con la URL real de tu backend
      const response = await fetch('http://localhost:3002/api/encrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setModifiedMessage(responseData.encrypt.slice(10));
        setReceivedMessage(responseData.encrypt);
      } else {
        setReceivedMessage('Error al recibir el mensaje');
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  useEffect(() => {
    // Aquí puedes agregar lógica adicional si lo necesitas cuando se monta el componente
  }, []);

  return (
    <div className="App background-image">
      <h1>Formulario de Mensaje</h1>
      <input
        type="text"
        placeholder="Escribe tu mensaje"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSubmit}>Enviar Mensaje</button>
      <p>Mensaje recibido del backend: {receivedMessage}</p>
      <p>Mensaje tratado desde backend: {modifiedMessage}</p>

    </div>
  );
}

export default App;