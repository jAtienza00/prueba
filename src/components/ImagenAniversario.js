import React from 'react';
import './imagenAniversario.css'; // Para la animación

const ImagenAniversario = () => {
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <svg
        viewBox="0 0 200 200"
        width="200"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
        className="draw"
        fill="none"
        stroke="white"
        strokeWidth="1"
      >
        {/* Mini corazones formando la silueta de un corazón grande */}
        <g fill="white" stroke="none">
          <path d="M100 170 C20 100, 30 30, 100 60 C170 30, 180 100, 100 170 Z" fill="none" stroke="white" strokeWidth="2" />
          {
            // Mini corazones distribuidos a mano (puedes afinar más)
          }
          <text x="60" y="100" fontSize="10" fill="white">❤️</text>
          <text x="80" y="80" fontSize="10" fill="white">❤️</text>
          <text x="100" y="70" fontSize="10" fill="white">❤️</text>
          <text x="120" y="80" fontSize="10" fill="white">❤️</text>
          <text x="140" y="100" fontSize="10" fill="white">❤️</text>
          <text x="125" y="120" fontSize="10" fill="white">❤️</text>
          <text x="100" y="135" fontSize="10" fill="white">❤️</text>
          <text x="75" y="120" fontSize="10" fill="white">❤️</text>
        </g>

        {/* Muñeco alado */}
        <g stroke="white" strokeWidth="2">
          <circle cx="50" cy="150" r="5" fill="white" />
          <line x1="50" y1="155" x2="50" y2="170" />
          <line x1="50" y1="160" x2="40" y2="150" />
          <line x1="50" y1="160" x2="60" y2="150" />
          <line x1="50" y1="170" x2="45" y2="180" />
          <line x1="50" y1="170" x2="55" y2="180" />

          {/* Alas */}
          <path d="M40 150 Q30 145, 35 155" fill="none" />
          <path d="M60 150 Q70 145, 65 155" fill="none" />
        </g>

        {/* Texto */}
        <text x="65" y="145" fontSize="7" fill="white">para ti</text>
      </svg>
    </div>
  );
};

export default ImagenAniversario;
