import React, { useState, useEffect } from 'react';
import { Month10Data, Textos } from '../services/Gestor';
import { motion, AnimatePresence } from 'framer-motion';

export default function Month10Component() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);
  const [currentStep, setCurrentStep] = useState('intro');
  const [showPoem, setShowPoem] = useState(false);
  const [currentPoem, setCurrentPoem] = useState(null);
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    setData(Month10Data());
  }, []);

  const handleStart = () => {
    setCurrentStep('house');
  };

  const handleOptionClick = (option) => {
    if (option.storyPart) {
      setChoices([...choices, option.storyPart]);
    }
    setCurrentStep(option.next);
  };

  const getRandomPoem = () => {
    const allTextos = Textos();
    const randomIndex = Math.floor(Math.random() * allTextos.length);
    setCurrentPoem(allTextos[randomIndex]);
    setShowPoem(true);
  };

  const resetGame = () => {
    setCurrentStep('intro');
    setChoices([]);
    setVisible(false);
  };

  if (!visible) {
    return (
      <div className="fixed bottom-52 left-4 z-50">
        <button
          onClick={() => setVisible(true)}
          className="w-14 h-14 flex items-center cursor-pointer justify-center bg-gradient-to-r from-pink-500 to-rose-600 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 text-2xl border-2 border-white"
          title="Mes 10"
        >
          🏠
        </button>
      </div>
    );
  }

  const stepData = data?.steps.find(s => s.id === currentStep);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full text-center shadow-2xl relative border-4 border-pink-300 flex flex-col max-h-[90vh]"
      >
        <button
          onClick={resetGame}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold z-10"
        >
          &times;
        </button>

        {/* Secret Heart Button */}
        <button
          onClick={getRandomPoem}
          className="absolute top-4 left-4 text-pink-200 hover:text-pink-500 text-xl transition-colors duration-300"
          title="Un secreto..."
        >
          ❤️
        </button>

        <div className="overflow-y-auto flex-1 mt-6 px-2">
          <AnimatePresence mode="wait">
            {currentStep === 'intro' && (
              <motion.div
                key="intro"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-700 mb-6">
                  {data?.title}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8 font-serif italic">
                  "{data?.introduction}"
                </p>
                <button
                  onClick={handleStart}
                  className="px-8 py-3 bg-pink-500 text-white rounded-full font-bold shadow-lg hover:bg-pink-600 transition-colors"
                >
                  Empezar aventura ✨
                </button>
              </motion.div>
            )}

            {stepData && (
              <motion.div
                key={currentStep}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <h3 className="text-xl md:text-2xl font-bold text-pink-800">
                  {stepData.question}
                </h3>
                <div className="grid gap-4 mt-8">
                  {stepData.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(option)}
                      className="p-4 rounded-xl border-2 border-pink-100 bg-pink-50 hover:bg-pink-100 hover:border-pink-300 transition-all text-gray-800 font-medium text-left flex items-center gap-3"
                    >
                      <span className="flex-1">{option.text}</span>
                      <span className="text-pink-400">→</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 'final' && (
              <motion.div
                key="final"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-4"
              >
                <div className="text-4xl mb-6">💖</div>
                <div className="text-lg md:text-xl text-gray-800 leading-relaxed font-serif space-y-4 mb-8">
                  {choices.map((part, i) => (
                    <p key={i}>{part}</p>
                  ))}
                  <div className="pt-4 border-t border-pink-100">
                    {data?.finalMessage}
                  </div>
                </div>
                <button
                  onClick={resetGame}
                  className="text-pink-500 font-bold hover:underline"
                >
                  Cerrar aventura
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Poem Modal (Overlay) */}
        <AnimatePresence>
          {showPoem && currentPoem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/95 z-20 rounded-2xl p-8 flex flex-col items-center justify-center"
            >
              <button
                onClick={() => setShowPoem(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold cursor-pointer"
              >
                &times;
              </button>
              <h4 className="text-2xl font-bold text-pink-600 mb-4">{currentPoem.title}</h4>
              <div className="overflow-y-auto max-h-[60vh] text-gray-700 italic font-serif space-y-2 text-sm md:text-base px-4">
                {currentPoem.text.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              <p className="mt-4 text-2xl">{currentPoem.footer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
