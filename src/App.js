import React from 'react';
import TreeCanvas from './components/TreeCanvas';
import Contador from './components/Contador';
import Notification from './components/Notifications';
import Imagenes from './components/Imagenes';
import HeartMessage from './components/Frases';
import ImagenAniversario from './components/ImagenAniversario';
import FireworksCanvas from './components/Fuegos';
import AbrazameButton from './components/Abrazame';
import CartaComponent from './components/Carta';
import JuegoPalabrasComponent from './components/JuegoPalabra';
import LineaComponent from './components/Linea';
import RevealComponent from './components/Reveal';
import SpotifyComponent from './components/Spotify';


function App() {
  const color = colorBackground();
  const isSpecialDay = new Date().getDate() === 15;

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
      <CartaComponent/>
      <LineaComponent/>
      <RevealComponent/>
      {isSpecialDay && <FireworksCanvas />}
      <Notification/>
      <div style={{ width: '100%', maxWidth: 1000 }}>
        {isSpecialDay ? (
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
          <SpotifyComponent />
          <Botones />

        </div>
      </div>
    </div>
  );
}


function Botones() {
  const [verMas, setVerMas] = React.useState(false);

  return (
    <div className="flex flex-col items-center gap-4 lg:justify-center">
      {/* Primer bloque visible siempre */}
      <div className="flex flex-col lg:flex-row md:flex-col sm:flex-col justify-center gap-4 lg:w-1/2">
        <Imagenes />
        <HeartMessage />
      </div>

      {/* Segundo bloque: visible según verMas */}
      {verMas && (
        <div className="flex flex-col lg:flex-row md:flex-col sm:flex-col justify-center gap-4 lg:w-1/2">
          <AbrazameButton />
          <JuegoPalabrasComponent />
        </div>
      )}

      {/* Botón Ver más / Ver menos */}
      <button
        onClick={() => setVerMas(!verMas)}
        className="mt-4 rounded-xl border border-blue-500 px-6 py-2 text-blue-500 hover:cursor-pointer"
      >
        {verMas ? "Ver menos" : "Ver más"}
      </button>
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

export default App;
