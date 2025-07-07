import React, { useState } from 'react';
import './HeartMessage.css';

const HeartMessage: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className="heart-container">
      {!showMessage ? (
        <button className="heart-button" onClick={() => setShowMessage(true)}>
          Te amo tanto que 🌹
        </button>
      ) : (
        <div className="heart-shape">
          <div className="heart-text">
            <h1>Una vez más...</h1>
            <p>Tendría un sueño contigo solo para pensarte una vez más,</p>
            <p>Tendría tu voz en bucle solo para escucharte una vez más,</p>
            <p>Tendría tu foto en la mano solo para verte una vez más,</p>
            <p>Agarraría una mano mientras cierro los ojos solo para sentir que te cojo una vez más,</p>
            <p>Iría a cualquier lugar solo para sentir tu presencia una vez más,</p>
            <p>Pensaría en cualquier momento solo para que pases por mi mente una vez más,</p>
            <p>Te querría otra vez solo para que me llenes el corazón una vez más,</p>
            <p>Te amaría otra vez solo para que sea feliz una vez más.</p>
            <footer>❤️</footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeartMessage;
