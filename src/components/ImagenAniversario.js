import React from 'react';
import './imagenAniversario.css';

const ImagenAniversario = () => {
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <svg
        viewBox="0 0 220 200"
        width="220"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
        className="draw"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
      >
        {/* Corazón grande */}
        <path
          d="M110 170 C30 100, 40 30, 110 60 C180 30, 190 100, 110 170 Z"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />

        {/* Mini corazones distribuidos */}
        <g fontSize="10">
          <text x="80" y="100">❤️</text>
          <text x="95" y="80">❤️</text>
          <text x="110" y="70">❤️</text>
          <text x="125" y="80">❤️</text>
          <text x="140" y="100">❤️</text>
          <text x="125" y="120">❤️</text>
          <text x="110" y="135">❤️</text>
          <text x="95" y="120">❤️</text>
          <text x="110" y="100">❤️</text>
        </g>

        {/* Muñeco más a la izquierda */}
        <g stroke="white" strokeWidth="2">
          <circle cx="30" cy="150" r="5" fill="white" />
          <line x1="30" y1="155" x2="30" y2="170" />
          <line x1="30" y1="160" x2="20" y2="150" />
          <line x1="30" y1="160" x2="40" y2="150" />
          <line x1="30" y1="170" x2="25" y2="180" />
          <line x1="30" y1="170" x2="35" y2="180" />

          {/* Alas */}
          <path d="M20 150 Q10 145, 15 155" fill="none" />
          <path d="M40 150 Q50 145, 45 155" fill="none" />
        </g>

        {/* Texto más grande y separado */}
        <text x="45" y="145" fontSize="10" fill="white" fontWeight="bold">para ti</text>
      </svg>
    </div>
  );
};

export default ImagenAniversario;
