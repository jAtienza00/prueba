import React, { useState, useEffect } from 'react';
import { NASA } from '../services/Gestor';

export default function LineaComponent() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);

  // Llamar NASA() solo una vez al montar el componente
  useEffect(() => {
    async function fetchData() {
      const result = await NASA();
      setData(result);
    }
    fetchData();
  }, []);

  if (!visible) {
    return (
      <div className="fixed top-4 right-15 z-50">
        {" "}
        <button
          onClick={() => setVisible(true)}
          className="px-6 py-3 text-2xl cursor-pointer text-white border-none rounded-lg mt-4 hover:scale-105 transition-transform duration-200"
        >
          {" "}
          🌌{" "}
        </button>{" "}
      </div>
    );
  }

  // Si los datos aún no están cargados
  if (!data) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <p className="text-white text-2xl">Cargando datos de la NASA...</p>
      </div>
    );
  }

  const { hdurl, url, title, explanation, emojiEffects } = data;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-hidden">
      {/* Emojis flotantes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 20 }).map((_, i) => {
          const emoji = emojiEffects[Math.floor(Math.random() * emojiEffects.length)];
          return (
            <span
              key={i}
              className="absolute text-pink-400 text-xl animate-bounce"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              {emoji}
            </span>
          );
        })}
      </div>

      {/* Contenido principal */}
      <div className="relative bg-white shadow-xl rounded-2xl p-6 max-w-2xl w-full text-center text-lg sm:text-xl md:text-2xl leading-relaxed font-serif whitespace-pre-wrap max-h-[80vh] overflow-y-auto">
        
        <p className="text-4xl font-bold mb-4">El dia que te pedi salir, esto fue donde sentia que estaba</p>
        <img
          src={hdurl || url}
          alt={title}
          className="w-full max-h-[50vh] object-cover rounded-lg mb-4"
        />
        <p className="text-xl font-bold mb-4">{title}</p>

        {/* Botón cerrar */}
        <button
          onClick={() => setVisible(false)}
          className="mt-4 px-4 py-2 bg-pink-300 text-black font-semibold rounded hover:bg-pink-400 transition"
        >
          &times; Cerrar
        </button>
      </div>
    </div>
  );
}
