import React from 'react';
import TreeCanvas from './components/TreeCanvas';
import Contador from './components/Contador';
import Notification from './components/Notifications';
import Imagenes from './components/Imagenes';
import HeartMessage from './components/Frases';
import ImagenAniversario from './components/ImagenAniversario';

function App() {
  const color = colorBackground();
  const mostrarAniversario = esAniversario();

  return (
    <div
      style={{
        background: `linear-gradient(to bottom, ${color}, #000000)`,
        minHeight: '100vh',
        margin: 0,
        width: '100%',
        padding: '1rem',
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      <Notification/>
      <div style={{ width: '100%', maxWidth: 1000 }}>
        {mostrarAniversario ? (
          <ImagenAniversario />
        ) : (
          <TreeCanvas />
        )}

        <div
          style={{
            width: '100%',
            marginTop: '1.5rem',
            paddingTop: '1rem',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)' }}>
            Avril nos amamos desde hace <Contador />
          </p>
          <Imagenes />
          <HeartMessage/>
        </div>
      </div>
    </div>
  );
}

function colorBackground() {
  const ahora = new Date();
  const hora = ahora.getHours();

  if (hora >= 23) {
    return '#000000';
  } else if (hora >= 18) {
    return '#e36b00';
  } else if (hora >= 12) {
    return '#00b2ff';
  } else if (hora >= 6) {
    return '#0049b9';
  } else {
    return '#000000';
  }
}

// Mostrar ImagenAniversario si hoy es día 15 de cualquier mes
function esAniversario() {
  const hoy = new Date(2025, 7, 15);
  const dia = hoy.getDate();

  if (dia === 15) {
    console.log("Siiii es 15 ❤️");
    return true;
  }

  return false;
}

export default App;
