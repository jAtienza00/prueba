import React, { useState, useEffect } from 'react';

const Contador = () => {
  // --- Define la fecha y hora objetivo ---
  // NOTA: Cambié el año a uno pasado para que "Te amo desde hace" tenga sentido.
  // ¡Ajusta esta fecha a la que necesites!
  const fechaObjetivo = new Date('2025-05-15T00:00:00');

  // --- Estado para almacenar el texto del contador ---
  const [textoContador, setTextoContador] = useState('');

  useEffect(() => {
    const actualizarContador = () => {
      const ahora = new Date();
      const diferencia = ahora - fechaObjetivo;

      // --- Cálculos de tiempo ---
      let diasTotales = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      let meses = 0;
      let dias = 0;

      // Lógica mejorada para meses y días
      if (diasTotales >= 30) {
        meses = Math.floor(diasTotales / 30);
        dias = diasTotales % 30;
      } else {
        dias = diasTotales;
      }

      const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

      // --- Formateo del texto para mostrar (más legible) ---
      const partes = [];
      if (meses > 0) partes.push(`${meses} ${meses > 1 ? 'meses' : 'mes'}`);
      if (dias > 0) partes.push(`${dias} ${dias > 1 ? 'dias' : 'dia'}`);
      
      const tiempoStr = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
      partes.push(tiempoStr);

      setTextoContador(partes.join(', '));
    };

    actualizarContador();
    const intervalo = setInterval(actualizarContador, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return <span>{textoContador}</span>;
};

export default Contador;