import React, { useEffect, useState } from "react";
import {Carta} from "../services/Gestor";

const CartaComponent = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [escrito, setEscrito] = useState(false);
  const cartaMessage = Carta();
  const message = cartaMessage.message;


  useEffect(() => {
    if (index < message.length && visible) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + message[index]);
        setIndex(index + 1);
      }, 80);
      if (index === message.length - 1) {
        setEscrito(true);
      }
      return () => clearTimeout(timeout);
    }
  }, [index, message, visible]);

  if (!visible) {
    return (
      <div className="fixed top-4 right-0 z-50">
        <button
          onClick={() => setVisible(true)}
          className="px-6 py-3 text-2xl cursor-pointer text-white border-none rounded-lg mt-4 hover:scale-105 transition-transform duration-200"
        >
          💌
        </button>
      </div>
    );
  }
  

  return (
    <div className="fixed inset-0 bg-pink-100 flex items-center justify-center z-50 p-4 overflow-hidden">
      {/* Corazoncitos flotantes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 20 }).map((_, i) => {
          const emoji = cartaMessage.emojiEffects[
            Math.floor(Math.random() * cartaMessage.emojiEffects.length)
          ];
          return (
            <span
              key={i}
              className="absolute text-pink-400 text-xl animate-bounce"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              {emoji}
            </span>
          );
        })}
      </div>


      {/* Carta */}
      <div className="relative bg-white shadow-xl rounded-2xl p-6 max-w-2xl w-full text-center text-lg sm:text-xl md:text-2xl leading-relaxed font-serif whitespace-pre-wrap max-h-[80vh] overflow-y-auto"
      style={{ zIndex:1000 }}>
        <p className="text-4xl">{cartaMessage.title}</p>
        <p>{displayedText}</p>

        {/* Botón cerrar */}
        {escrito && (
            <button
            onClick={() => setVisible(false)}
            className="mt-6 px-4 py-2 bg-pink-300 text-black hover:cursor-pointer font-semibold rounded hover:bg-pink-400 transition"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default CartaComponent;
