import React from 'react';
import './imagenAniversario.css';

const ImagenAniversario = () => {
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <svg
        viewBox="0 0 250 200"
        width="250"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
        className="draw"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
      >
        {/* Corazón grande movido a la izquierda */}
        <path
          d="M100 170 C20 100, 30 30, 100 60 C170 30, 180 100, 100 170 Z"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />

        {/* Mini corazones adicionales */}
        <g fontSize="10">
          <text x="70" y="100">❤️</text>
          <text x="85" y="80">❤️</text>
          <text x="100" y="70">❤️</text>
          <text x="115" y="80">❤️</text>
          <text x="130" y="100">❤️</text>
          <text x="115" y="120">❤️</text>
          <text x="100" y="135">❤️</text>
          <text x="85" y="120">❤️</text>
          <text x="100" y="100">❤️</text>
          <text x="110" y="90">❤️</text>
          <text x="90" y="110">❤️</text>
          <text x="120" y="110">❤️</text>
        </g>

        {/* Muñeco aún más a la izquierda */}
        <g stroke="white" strokeWidth="2">
          <circle cx="20" cy="150" r="5" fill="white" />
          <line x1="20" y1="155" x2="20" y2="170" />
          <line x1="20" y1="160" x2="10" y2="150" />
          <line x1="20" y1="160" x2="30" y2="150" />
          <line x1="20" y1="170" x2="15" y2="180" />
          <line x1="20" y1="170" x2="25" y2="180" />

          {/* Alas */}
          <path d="M10 150 Q0 145, 5 155" fill="none" />
          <path d="M30 150 Q40 145, 35 155" fill="none" />
        </g>

        {/* Texto más grande y más arriba, sin negrita */}
        <text x="35" y="135" fontSize="12" fill="white">para ti</text>
      </svg>
    </div>
  );
};

export default ImagenAniversario;
