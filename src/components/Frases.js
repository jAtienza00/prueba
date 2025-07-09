import React, { useState } from 'react';
import './HeartMessage.css';

const messages = [
  {
    title: 'Una vez más...',
    content: [
      'Tendría un sueño contigo solo para pensarte una vez más,',
      'Tendría tu voz en bucle solo para escucharte una vez más,',
      'Tendría tu foto en la mano solo para verte una vez más,',
      'Agarraría una mano mientras cierro los ojos solo para sentir que te cojo una vez más,',
      'Iría a cualquier lugar solo para sentir tu presencia una vez más,',
      'Pensaría en cualquier momento solo para que pases por mi mente una vez más,',
      'Te querría otra vez solo para que me llenes el corazón una vez más,',
      'Te amaría otra vez solo para que sea feliz una vez más.'
    ]
  },
  {
    title: 'Cada latido...',
    content: [
      'Cada latido es un eco de tu nombre,',
      'Cada respiro te recuerda,',
      'Cada instante que pasa solo te llama más fuerte.'
    ]
  },
  {
    title: 'Lo que eres para mí',
    content: [
      'Eres mi canción favorita,',
      'Mi calma en la tormenta,',
      'Mi siempre en este mundo de “tal vez”.'
    ]
  }
];

const HeartMessage = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [current, setCurrent] = useState(0);

  const nextMessage = () => {
    setCurrent((prev) => (prev + 1) % messages.length);
  };

  const prevMessage = () => {
    setCurrent((prev) => (prev - 1 + messages.length) % messages.length);
  };

  const { title, content } = messages[current];

  return (
    <>
      <button className="heart-open-button" onClick={() => setShowOverlay(true)}>
        Te amo tanto que 🌹
      </button>

      {showOverlay && (
        <div className="heart-overlay">
          <button className="heart-close-button" onClick={() => setShowOverlay(false)}>
            &times;
          </button>

          <div className="heart-carousel">
            <button className="heart-arrow left" onClick={prevMessage}>‹</button>

            <div className="heart-message-box">
              <h1>{title}</h1>
              {content.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
              <footer>❤️</footer>
            </div>

            <button className="heart-arrow right" onClick={nextMessage}>›</button>
          </div>
        </div>
      )}
    </>
  );
};

export default HeartMessage;
