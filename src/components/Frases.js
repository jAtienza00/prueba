import React, { useState } from 'react';
import './HeartMessage.css';

const messages = [
  {
    title: 'Una vez más...',
    text: [
      'Tendría un sueño contigo solo para pensarte una vez más,',
      'Tendría tu voz en bucle solo para escucharte una vez más,',
      'Tendría tu foto en la mano solo para verte una vez más,',
      'Agarraría una mano mientras cierro los ojos solo para sentir que te cojo una vez más,',
      'Iría a cualquier lugar solo para sentir tu presencia una vez más,',
      'Pensaría en cualquier momento solo para que pases por mi mente una vez más,',
      'Te querría otra vez solo para que me llenes el corazón una vez más,',
      'Te amaría otra vez solo para que sea feliz una vez más.'
    ],
    footer: '❤️'
  },
  {
    title: 'Aunque todo acabe…',
    text: [
      'Si todo lo nuestro acaba, mi mundo acabará. Podrías ser una simple compañera, pero cada día me aseguro más de que eres ella, la compañera que nunca se irá.',
      'Aunque todo acabe o bien o mal, siempre te querré, me has dejado huella y pocas personas pueden decir eso, las podría contar con los dedos de mis manos.',
      'Y si tengo en cuenta desde lo poco que nos conocemos es un logro. La última persona que consiguió eso tardó más de 6 meses, así que enhorabuena.',
      'Si algún día lo nuestro se acaba espero que no estés triste porque es lo que menos quiero en el mundo, daría mi vida, mi alma por ti.',
      'Puede que haya nacido para ser un romántico, pero fuiste tú la que me hiciste así, yo era un alma en pena buscando el final de su castigo.',
      'Y tú fuiste el ángel enviado por dios para mostrarme que solo necesito amar.',
      'Aunque todo acabe, aunque cada uno siga su camino tú fuiste la que me enseñaste lo que es el amor de verdad.',
      'No sé si serás la persona que estará junto a mí por el resto de mi vida y tú tampoco sabrás si yo soy esa persona.',
      'Pero a todo le pido ser esa persona y que tú seas la mía, y eso que no creo en nada, pero por ti renuncio a todo.',
      'Aunque todo se acabe espero que encuentres a alguien que te mire como la perfección que eres para mí.',
      'Te amo, podría seguir escribiendo, expresando lo que me haces sentir, pero tardaría no solo una vida sino el universo entero.',
      'Te amo Avril.'
    ],
    
    footer: '🌹'
  },
  {
  title: "Oscuridad y Amor",
  text: [
    "En el más oscuro universo, donde la luz se ha rendido, solo el eco del vacío sabe cuánto te pienso.",
    "En la más oscura galaxia, sin estrellas que me guíen, tu recuerdo es la chispa que incendia mi mente fría.",
    "En el más oscuro planeta, donde la vida no crece, mi amor florece en la nada, aunque todo lo niegue.",
    "En el más oscuro océano, sin orilla, sin consuelo, tu nombre es la ola eterna que me arrastra sin miedo.",
    "En la más oscura noche, donde el tiempo se detiene, mi corazón aún susurra el deseo que no muere.",
    "En la más oscura vida, cuando todo se derrumba, tú eres la voz que en silencio mi alma aún busca.",
    "En lo más oscuro del alma, donde duelen los secretos, te llevo como un suspiro que no conoce el tiempo.",
    "En el más oscuro corazón, quebrado y lleno de sombras, late aún la esperanza de que tú lo nombraras.",
    "En mi más oscuro pensamiento, cuando todo me abandona, tu imagen brilla en mi mente como luna entre las olas.",
    "Solo te quiero a ti, sea donde sea, como sea, por lo que sea. Te quiero a ti.",
    
  ],
    footer:"🩷"
}
];

const HeartMessage = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextMessage = () => {
    setCurrentIndex((prev) => (prev + 1) % messages.length);
  };

  const prevMessage = () => {
    setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length);
  };

  const { title, text, footer } = messages[currentIndex];

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
            <button className="heart-arrow left" onClick={prevMessage}>
              ‹
            </button>

            <div className="heart-message-box">
              <h1>{title}</h1>
              {text.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
              <footer>{footer}</footer>
            </div>

            <button className="heart-arrow right" onClick={nextMessage}>
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HeartMessage;
