import React, { useState, useEffect, useRef } from 'react';
import { incrementarAbrazos, esBeso } from '../services/Gestor';
import './Abrazame.css'; // Asegúrate de importar el CSS si está en otro archivo

const AbrazameButton = () => {
  const [contador, setContador] = useState(0);
  const [mensaje, setMensaje] = useState('Abrázame...');
  const botonRef = useRef(null);

  useEffect(() => {
    // Cargar contador inicial de localStorage
    const abrazos = localStorage.getItem("abrazos");
    setContador(abrazos ? Number(abrazos) : 0);
  }, []);

  const vibrarVisualmente = () => {
    const boton = botonRef.current;
    if (boton) {
      boton.classList.add('btn-vibrar');
      setTimeout(() => boton.classList.remove('btn-vibrar'), 400); // Quitar clase tras animación
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
    <button ref={botonRef} onClick={manejarAbrazo} className="btn-abrazo">
      {mensaje} {contador}
    </button>
  );
};

export default AbrazameButton;
