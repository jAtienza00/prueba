import React from 'react';
import TreeCanvas from './components/TreeCanvas';
import Contador from './components/Contador';

function App() {
  return (
    <div
      style={{
        background: 'linear-gradient(to bottom, #000000, #8000FF)',
        minHeight: '100vh',
        margin: 0,
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ width: '100%', maxWidth: 1000 }}>
        <TreeCanvas />
        <div
          style={{
            width: '100%',
            borderTop: '1px solid #000',
            marginTop: '1.5rem',
            paddingTop: '1rem',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)' }}>
            Te amo desde hace <Contador />
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
