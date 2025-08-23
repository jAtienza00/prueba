import React, { useState, useEffect, useRef } from 'react';
import { incrementarAbrazos, esBeso } from '../services/Gestor';
import './css/Abrazame.css'; // Conservamos solo por keyframes

const AbrazameButton = () => {
  const [contador, setContador] = useState(0);
  const [mensaje, setMensaje] = useState('Abrázame...');
  const botonRef = useRef(null);

  useEffect(() => {
    const abrazos = localStorage.getItem("abrazos");
    setContador(abrazos ? Number(abrazos) : 0);
  }, []);

  const vibrarVisualmente = () => {
    const boton = botonRef.current;
    if (boton) {
      boton.classList.add('btn-vibrar');
      setTimeout(() => boton.classList.remove('btn-vibrar'), 400);
    }
  };

  const manejarAbrazo = () => {
    const nuevoContador = contador + 1;
    setContador(nuevoContador);
    incrementarAbrazos();

    if (nuevoContador % 10 === 0) {
      vibrarVisualmente();
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
      setMensaje('Esto cuenta por un beso...');
      setTimeout(() => setMensaje('Abrázame...'), 3000);
    } else {
      if (navigator.vibrate) {
        navigator.vibrate([300, 100, 300]);
      }
      vibrarVisualmente();
    }
  };

  return (
    <button
      ref={botonRef}
      onClick={manejarAbrazo}
      className="px-6 py-3 text-[1.1rem] cursor-pointer bg-fuchsia-700 text-white border-none rounded-lg mt-4 shadow-md hover:scale-105 transition-transform duration-200 btn-vibrar-target "
    >
      {mensaje} {contador}
    </button>
  );
};

export default AbrazameButton;
