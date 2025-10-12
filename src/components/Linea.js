import React, { useState, useEffect } from 'react';
import { Cielos, NASA } from '../services/Gestor';

export default function LineaComponent() {
  const [visible, setVisible] = useState(false);
  const [cielos, setCielos] = useState([]);
  const [miniMensajes, setMiniMensajes] = useState([]);
  const [selected, setSelected] = useState(null); // fecha seleccionada
  const [data, setData] = useState(null);

  useEffect(() => {
    const { mensajes, miniMensajes } = Cielos();
    setCielos(mensajes);
    setMiniMensajes(miniMensajes);
  }, []);

  // Cargar datos de la NASA al seleccionar una fecha
  useEffect(() => {
    if (!selected) return;
    async function fetchSky() {
      const result = await NASA(selected.fecha);
      setData({ ...result, texto: selected.texto });
    }
    fetchSky();
  }, [selected]);

  if (!visible) {
    return (
      <div className="fixed top-4 right-15 z-50">
        <button
          onClick={() => setVisible(true)}
          className="px-6 py-3 text-2xl cursor-pointer text-white mt-4 hover:scale-105 transition-transform duration-200"
        >
          🌌
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 p-4 text-white">
      {/* Título */}
      <p className="text-3xl font-bold m-10 text-center">Nuestro Cielo a Través del Tiempo</p>

      {/* Línea del tiempo */}
      <div className="relative w-full max-w-4xl h-2 bg-white rounded-full m-12 z-5">
        {cielos.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelected(item)}
            title={item.fecha}
            className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full cursor-pointer border-2 border-white transition-transform duration-300 
              ${selected?.fecha === item.fecha ? 'bg-pink-400 scale-125' : 'bg-gray-400 hover:scale-110'}`}
            style={{
              left: `${(index / (cielos.length - 1)) * 100}%`
            }}
          >
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm whitespace-nowrap">
              {new Date(item.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
            </span>
          </div>
        ))}
      </div>

      {/* Si hay una fecha seleccionada, mostrar su contenido */}
      {selected && (
        <div className="relative bg-white/90 text-black rounded-2xl p-6 max-w-xl w-full text-center shadow-xl z-10">
          {!data ? (
            <p className="text-lg">Cargando el cielo...</p>
          ) : (
            <>
              <p className="text-2xl font-semibold mb-4">{selected.texto}</p>
              <img
                src={data.hdurl || data.url}
                alt={data.title}
                className="w-full max-h-[50vh] object-cover rounded-lg mb-4 shadow-md"
              />
              <p className="font-bold text-lg">{data.title}</p>
            </>
          )}
          <button
            onClick={() => setSelected(null)}
            className="mt-4 px-4 py-2 bg-pink-400 text-black font-semibold rounded hover:bg-pink-500 transition hover:cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Estrellas flotantes con mini mensajes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 20 }).map((_, i) => {
          const emoji = ["⭐", "🌠", "✨", "🌙"][Math.floor(Math.random() * 4)];
          const tooltip = miniMensajes[Math.floor(Math.random() * miniMensajes.length)];
          return (
            <span
              key={i}
              title={tooltip}
              className="absolute text-yellow-300 text-xl hover:scale-125 transition-transform duration-300"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            >
              {emoji}
            </span>
          );
        })}
      </div>

      {/* Botón cerrar general */}
      <button
        onClick={() => setVisible(false)}
        className="absolute top-6 right-6 px-3 py-2 bg-pink-500 text-white rounded-full text-xl hover:bg-pink-600 transition"
      >
        ×
      </button>
    </div>
  );
}
