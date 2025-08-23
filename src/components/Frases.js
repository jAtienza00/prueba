import React, { useState } from 'react';
import { Textos } from '../services/Gestor';

const messages = Textos();

const HeartMessage = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const nextMessage = () => {
    if (currentIndex !== null) {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }
  };

  const prevMessage = () => {
    if (currentIndex !== null) {
      setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length);
    }
  };

  const closeAll = () => {
    if (currentIndex !== null) {
      setCurrentIndex(null);
    } else {
      setShowOverlay(false);
    }
  };

  return (
    <>
      <button
        className="px-6 py-3 text-[1.1rem] cursor-pointer bg-fuchsia-700 text-white border-none rounded-lg mt-4 shadow-md hover:scale-105 transition-transform duration-200"
        onClick={() => setShowOverlay(true)}
      >
        Unas pocas palabras... 🌹
      </button>

      {showOverlay && (
        <div className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center p-8 w-[100vw]">
          <button
            className="absolute top-5 right-8 text-white text-3xl z-[2001]"
            onClick={closeAll}
          >
            &times;
          </button>

          {currentIndex === null ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-[1000px] w-full">
              {messages.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="bg-white text-fuchsia-700 rounded-lg shadow-md px-6 py-3 text-[1.1rem] hover:bg-fuchsia-700 hover:text-white hover:scale-105 transition-transform"
                >
                  {msg.title}
                </button>
              ))}
            </div>
          ) : (
            <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 max-w-[90vw] w-full px-4">
              <button
                className="absolute md:relative left-0 text-white text-3xl p-4 hover:scale-125 transition-transform"
                onClick={prevMessage}
              >
                ‹
              </button>

              <div className="max-w-[600px] w-full bg-black text-white p-8 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)] text-center max-h-[80vh] overflow-y-auto">
                <h1 className="mb-6 text-2xl">{messages[currentIndex].title}</h1>
                {messages[currentIndex].text.map((line, idx) => (
                  <p key={idx} className="mb-4 text-[1.1rem] leading-relaxed">{line}</p>
                ))}
                <footer className="text-2xl mt-6">{messages[currentIndex].footer}</footer>
              </div>

              <button
                className="absolute md:relative right-0 text-white text-3xl p-4 hover:scale-125 transition-transform"
                onClick={nextMessage}
              >
                ›
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HeartMessage;
