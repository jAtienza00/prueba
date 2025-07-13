import React, { useState } from 'react';
import './HeartMessage.css';
import { Textos } from '../services/Gestor';

const messages = Textos();

const HeartMessage = () => {
  const [showOverlay, setShowOverlay] = useState(false); // Muestra toda la vista
  const [currentIndex, setCurrentIndex] = useState(null); // null = aún no se ha elegido mensaje

  const nextMessage = () => {
    if (currentIndex !== null) {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }
  };

  const prevMessage = () => {
    if (currentIndex !== null) {
      setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length);
    }
  };

  const closeAll = () => {
    if (currentIndex !== null) {
      setCurrentIndex(null);
    }else{
      setShowOverlay(false);    
    }
  };

  return (
    <>
      <button className="heart-open-button" onClick={() => setShowOverlay(true)}>
        Unas pocas palabras... 🌹
      </button>

      {showOverlay && (
        <div className="heart-overlay">
          <button className="heart-close-button" onClick={closeAll}>
            &times;
          </button>

          {currentIndex === null ? (
            <div className="heart-title-list">
              {messages.map((msg, index) => (
                <button
                  key={index}
                  className="heart-title-button"
                  onClick={() => setCurrentIndex(index)}
                >
                  {msg.title}
                </button>
              ))}
            </div>
          ) : (
            <div className="heart-carousel">
              <button className="heart-arrow left" onClick={prevMessage}>
                ‹
              </button>

              <div className="heart-message-box">
                <h1>{messages[currentIndex].title}</h1>
                {messages[currentIndex].text.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
                <footer>{messages[currentIndex].footer}</footer>
              </div>

              <button className="heart-arrow right" onClick={nextMessage}>
                ›
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HeartMessage;
