import React from 'react';
import './imagenAniversario.css';

const ImagenAniversario = () => {
  return (
    <div style={{ width: '100%' }} className="flex justify-center items-center">
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
        {/* Corazón grande movido más a la derecha */}
        <path
          d="M120 170 C40 100, 50 30, 120 60 C190 30, 200 100, 120 170 Z"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />

        {/* Mini corazones con animación de latido */}
        <g fontSize="10">
          <text x="105" y="100" className="latido">❤️</text>
          <text x="120" y="80" className="latido">❤️</text>
          <text x="135" y="70" className="latido">❤️</text>
          <text x="150" y="80" className="latido">❤️</text>
          <text x="165" y="100" className="latido">❤️</text>
          <text x="150" y="120" className="latido">❤️</text>
          <text x="135" y="135" className="latido">❤️</text>
          <text x="120" y="120" className="latido">❤️</text>
          <text x="135" y="100" className="latido">❤️</text>
          <text x="145" y="90" className="latido">❤️</text>
          <text x="125" y="110" className="latido" >❤️</text>
          <text x="155" y="110" className="latido">❤️</text>
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

        {/* Texto más arriba y más grande, sin negrita */}
        <text x="10" y="150" fontSize="12" fill="white">para ti</text>
      </svg>
    </div>
  );
};

export default ImagenAniversario;
