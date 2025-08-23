// src/components/JuegoPalabrasComponent.jsx
import React, { useEffect, useState } from "react";
import { LikedThing } from "../services/Gestor";

export default function JuegoPalabrasComponent() {
  const [current, setCurrent] = useState(null);
  const [guess, setGuess] = useState("");
  const [number, setNumber] = useState(0);
  const [isCorrect, setIsCorrect] = useState(true);
  const [visible, setVisible] = useState(false);
  const [trie, setTrie] = useState(5);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    reTry();
  }, [visible]);

  const reTry = () => {
    if (visible) {
      const randomItem = LikedThing();
      setCurrent(randomItem);
      setGuess("");
      setNumber(randomItem.palabra.length);
      setIsCorrect(null);
      setTrie(randomItem.intentos);
      setIsEnd(false);
    }
  };

  const handleGuess = () => {
    if (!current) return;

    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedAnswer = current.palabra.trim().toLowerCase();
    const isAnswerCorrect = normalizedGuess === normalizedAnswer;

    setIsCorrect(isAnswerCorrect);

    if (!isAnswerCorrect) {
      const newTries = trie - 1;
      setTrie(newTries);
      if (newTries === 0) {
        setIsEnd(true);
      }
    }
  };

  if (!visible) {
    return (
      <div>
        <button
          onClick={() => setVisible(true)}
          className="px-6 py-3 text-[1.1rem] cursor-pointer bg-fuchsia-700 text-white border-none rounded-lg mt-4 shadow-md hover:scale-105 transition-transform duration-200"
        >
          ¿Jugamos?
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4 text-black">
      <div
        className="relative bg-white shadow-xl rounded-2xl p-6 max-w-md w-full text-center text-lg leading-relaxed font-sans"
        style={{ zIndex: 1000 }}
      >
        <h2 className="text-2xl font-semibold mb-4">
          Cosas que me gustan de ti 💜
        </h2>

        {current && (
          <>
            <p className="mb-4 italic text-gray-700">Pista: {current.pista}</p>
            <p className="mb-4 italic text-gray-700">Intentos: {trie}</p>
            <p className="text-2xl font-mono tracking-widest mb-4">
              {Array.from({ length: number }).map((_, i) => (
                <span key={i}>_ </span>
              ))}
            </p>

            {isCorrect === true ? (
              <>
                <p className="text-green-600 font-bold text-xl mb-4">
                  ¡Correcto! ❤️ La palabra era: {current.palabra}
                </p>
                <button
                  onClick={reTry}
                  className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
                >
                  Volver a jugar
                </button>
              </>
            ) : (
              <>
                {isCorrect === false && (
                  <>
                    <p className="text-red-500 mb-2">
                      No exactamente… intenta otra vez 💡
                    </p>
                  </>
                )}
                {!isEnd ? (
                  <>
                    <input
                      type="text"
                      value={guess}
                      onChange={(e) => setGuess(e.target.value)}
                      className="border px-3 py-2 rounded w-full mb-3 text-black"
                      placeholder="Escribe tu respuesta..."
                    />
                    <button
                      onClick={handleGuess}
                      className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
                    >
                      Probar
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-red-600 font-bold text-xl mb-4">
                      Te has quedado sin intentos amor...
                    </p>
                    <p className="text-red-600 text-xl mb-4">
                      La palabra era: {current.palabra}
                    </p>
                    <button
                      onClick={reTry}
                      className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
                    >
                      Volver a jugar
                    </button>
                  </>
                )}
              </>
            )}
          </>
        )}

        {/* Botón cerrar */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-500"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
