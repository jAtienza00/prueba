import React, { useState } from 'react';
import './HeartMessage.css';

const messages = [
  {
    title: 'Una vez más...',
    content: [
      'Tendría un sueño contigo solo para pensarte una vez más,',
      'Tendría tu voz en bucle solo para escucharte una vez más,',
      'Tendría tu foto en la mano solo para verte una vez más,',
      'Agarraría una mano mientras cierro los ojos solo para sentir que te cojo una vez más,',
      'Iría a cualquier lugar solo para sentir tu presencia una vez más,',
      'Pensaría en cualquier momento solo para que pases por mi mente una vez más,',
      'Te querría otra vez solo para que me llenes el corazón una vez más,',
      'Te amaría otra vez solo para que sea feliz una vez más.'
    ]
  },
  {
    title: 'Aunque todo acabe…',
    content: [
      'Si todo lo nuestro acaba, mi mundo acabará. Podrías ser una simple compañera, pero cada día me aseguro más de que eres ella, la compañera que nunca se irá.',
      'Aunque todo acabe o bien o mal, siempre te querré, me has dejado huella y pocas personas pueden decir eso, las podría contar con los dedos de mis manos, y si tengo en cuenta desde lo poco que nos conocemos es un logro.',
      'La última persona que consiguió eso tardó más de 6 meses, así que enhorabuena.',
      'Si algún día lo nuestro se acaba espero que no estés triste porque es lo que menos quiero en el mundo, daría mi vida, mi alma por ti.',
      'Puede que haya nacido para ser un romántico, pero fuiste tú la que me hiciste así, yo era un alma en pena buscando el final de su castigo y tú fuiste el ángel enviado por Dios para mostrarme que solo necesito amar.',
      'Aunque todo acabe, aunque cada uno siga su camino tú fuiste la que me enseñaste lo que es el amor de verdad.',
      'No sé si serás la persona que estará junto a mí por el resto de mi vida y tú tampoco sabrás si yo soy esa persona, pero a todo le pido ser esa persona y que tú seas la mía, y eso que no creo en nada, pero por ti renuncio a todo.',
      'Aunque todo se acabe espero que encuentres a alguien que te mire como la perfección que eres para mí.',
      'Te amo, podría seguir escribiendo, expresando lo que me haces sentir, pero tardaría no solo una vida sino el universo entero.',
      'Te amo Avril.'
    ]
  }
];

const HeartMessage = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [current, setCurrent] = useState(0);

  const nextMessage = () => {
    setCurrent((prev) => (prev + 1) % messages.length);
  };

  const prevMessage = () => {
    setCurrent((prev) => (prev - 1 + messages.length) % messages.length);
  };

  const { title, content } = messages[current];

  return (
    <>
      <button className="heart-open-button" onClick={() => setShowOverlay(true)}>
        Te amo tanto que 🌹
      </button>

      {showOverlay && (
        <div className="heart-overlay">
          <button className="heart-close-button" onClick={() => setShowOverlay(false)}>
            &times;
          </button>

          <div className="heart-carousel">
            <button className="heart-arrow left" onClick={prevMessage}>‹</button>

            <div className="heart-message-box">
              <h1>{title}</h1>
              {content.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
              <footer>❤️</footer>
            </div>

            <button className="heart-arrow right" onClick={nextMessage}>›</button>
          </div>
        </div>
      )}
    </>
  );
};

export default HeartMessage;
