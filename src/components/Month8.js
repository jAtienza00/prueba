import React, { useState, useEffect } from 'react';
import { Month8Data } from '../services/Gestor';
import { motion } from 'framer-motion';

export default function Month8Component() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(Month8Data());
  }, []);

  if (!visible) {
    return (
      <div className="fixed bottom-20 left-4 z-50">
        <button
          onClick={() => setVisible(true)}
          className="w-14 h-14 flex items-center cursor-pointer justify-center bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 text-2xl border-2 border-white"
          title="Mes 8"
        >
          🎁
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full text-center shadow-2xl relative border-4 border-pink-300 flex flex-col max-h-[90vh]"
      >
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold z-10"
        >
          &times;
        </button>
        <div className="overflow-y-auto flex-1 mt-4 px-2">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4 md:mb-6">
            {data?.title}
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-wrap font-serif">
            {data?.message}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
