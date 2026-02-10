import React, { useState, useEffect } from 'react';
import { Month9Data } from '../services/Gestor';
import { motion } from 'framer-motion';

export default function Month9Component() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(Month9Data());
  }, []);

  if (!visible) {
    return (
      <div className="fixed bottom-36 left-4 z-50">
        <button
          onClick={() => setVisible(true)}
          className="w-14 h-14 flex items-center cursor-pointer justify-center bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 text-2xl border-2 border-white"
          title="Mes 9"
        >
          🎵
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full text-center shadow-2xl relative border-4 border-green-300 flex flex-col max-h-[90vh]"
      >
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold z-10"
        >
          &times;
        </button>
        <div className="overflow-y-auto flex-1 mt-4 px-2">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-700 mb-4 md:mb-6">
            {data?.title}
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-wrap font-serif mb-6">
            {data?.message}
          </p>

          <div className="mb-6">
            <iframe 
              src="https://open.spotify.com/embed/playlist/06bOdfggK6dOi1pG8Wj8jn?utm_source=generator" 
              width="100%" 
              height="352" 
              frameBorder="0" 
              allowFullScreen="" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              className="rounded-xl shadow-inner"
            ></iframe>
          </div>

          <div className="text-left bg-green-50 p-4 rounded-xl border border-green-100">
            <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
              📋 Lista de Canciones
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              {data?.songs.map((song, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-green-400 font-bold">{index + 1}.</span>
                  {song}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
