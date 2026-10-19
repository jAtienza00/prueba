import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CartasDelMes } from '../services/Gestor';

const CartasDelMesComponent = () => {
  const [cards, setCards] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      const result = await CartasDelMes();
      setCards(result);
    };
    load();
  }, []);

  const openGallery = () => setIsOpen(true);
  const closeGallery = () => {
    setIsOpen(false);
    setActiveCard(null);
  };

  return (
    <>
      {/* Botón principal */}
      <button
        onClick={openGallery}
        className="px-6 py-3 text-[1.1rem] cursor-pointer bg-fuchsia-700 text-white border-none rounded-lg mt-4 shadow-md hover:scale-105 transition-transform duration-200"
      >
        Cartas del Amor ❤️
      </button>

      {/* Overlay tipo galería */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-50 p-4 md:p-6 overflow-y-auto">
          {/* Botón de cerrar */}
          <button
            onClick={closeGallery}
            className="absolute top-6 right-8 text-white text-4xl font-bold hover:scale-110 transition-transform duration-200 z-20"
          >
            &times;
          </button>


          {/* Cuadrícula de cartas */}
          <div className=" mt-30 md:mt-0"> 
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-white drop-shadow-lg">
            🎁 Nuestras Cartas
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4 md:mt-0">
            {cards.map((card) => (
              <motion.div
              key={card.id}
              whileHover={card.unlocked ? { scale: 1.05 } : {}}
              onClick={() => card.unlocked && setActiveCard(card.id)}
              className={`relative w-36 h-52 md:w-40 md:h-56 rounded-2xl shadow-lg cursor-pointer flex items-center justify-center bg-white/80 backdrop-blur-sm border-2 transition ${
                card.unlocked
                ? 'border-pink-400 hover:bg-pink-50'
                : 'border-gray-300 opacity-60'
              }`}
              >
                {!card.unlocked && (
                  <span className="absolute text-4xl text-gray-400">🔒</span>
                )}
                <p className="text-lg font-semibold text-center px-2">
                  {card.title}
                </p>
              </motion.div>
            ))}
          </div>
                </div>

          {/* Carta abierta (popup interno) */}
          {activeCard && (
            <div
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto"
              onClick={() => setActiveCard(null)}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-2xl p-4 md:p-6 w-[90%] max-w-sm md:max-w-md text-center shadow-lg overflow-y-auto max-h-[80vh]"
              >
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-pink-600">
                  {cards.find((c) => c.id === activeCard)?.title}
                </h2>
                <p className="text-gray-700 leading-relaxed font-serif whitespace-pre-wrap text-sm md:text-base">
                  {cards.find((c) => c.id === activeCard)?.message}
                </p>
              </motion.div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CartasDelMesComponent;
