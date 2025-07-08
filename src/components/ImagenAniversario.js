import React from 'react';
import './imagenAniversario.css'; // Asegúrate de importar este archivo CSS

const ImagenAniversario = () => {
  return (
    <div className="imagen-aniversario">
      <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="white" strokeWidth="2" className="dibujo-animado">
          {/* Corazones formando un corazón */}
          <g transform="translate(250, 150)">
            {[[-200, -200], [-120, -160], [-40, -180], [40, -160], [120, -180], [200, -160],
              [-160, -80], [-80, -60], [0, -80], [80, -60], [160, -80]].map(([x, y], i) => (
              <path
                key={i}
                d="M0,-30 C-10,-50 -40,-50 -40,-20 C-40,0 -20,20 0,35 C20,20 40,0 40,-20 C40,-50 10,-50 0,-30Z"
                transform={`scale(0.2) translate(${x},${y})`}
              />
            ))}
          </g>

          {/* Muñeco alado */}
          <g transform="translate(120, 320)">
            <circle cx="0" cy="0" r="10" />
            <line x1="0" y1="10" x2="0" y2="40" />
            <line x1="0" y1="20" x2="25" y2="10" />
            <line x1="0" y1="20" x2="-20" y2="10" />
            <line x1="0" y1="40" x2="-10" y2="60" />
            <line x1="0" y1="40" x2="10" y2="60" />
            <path d="M -20,5 Q -35,-10 -30,10 Q -35,30 -20,20" />
            <path d="M 20,5 Q 35,-10 30,10 Q 35,30 20,20" />
          </g>

          {/* Texto */}
          <text x="160" y="300" fill="white" fontSize="18" fontFamily="sans-serif">para ti</text>
        </g>
      </svg>
    </div>
  );
};

export default ImagenAniversario;
