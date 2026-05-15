import React, { useState, useEffect } from 'react';
import { Month12Data } from '../services/Gestor';
import { motion } from 'framer-motion';

export default function Month12Component() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(Month12Data());
  }, []);

  if (!visible) {
    return (
      <div className="fixed bottom-[21rem] left-4 z-50">
        <button
          onClick={() => setVisible(true)}
          className="w-16 h-16 flex items-center cursor-pointer justify-center bg-gradient-to-r from-yellow-300 to-yellow-600 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)] hover:scale-110 transition-transform duration-200 text-3xl border-2 border-white"
          title="Mes 12 - ¡1 Año!"
        >
          🎬
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[120] p-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-black rounded-2xl p-4 md:p-6 max-w-4xl w-full text-center shadow-2xl relative border-4 border-yellow-400 flex flex-col max-h-[95vh]"
      >
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-4 text-white hover:text-red-500 text-3xl font-bold z-10"
        >
          &times;
        </button>
        <div className="overflow-y-auto flex-1 mt-6 px-2">
          <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 mb-4">
            {data?.title}
          </h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed font-serif mb-6">
            {data?.message}
          </p>

          <div className="w-full bg-black rounded-xl overflow-hidden shadow-[0_0_20px_rgba(255,215,0,0.2)]">
            <video 
              controls 
              className="w-full h-auto max-h-[60vh] object-contain"
              playsInline
            >
              {data?.videoPath && (
                 <source src={process.env.PUBLIC_URL + data.videoPath} type="video/mp4" />
              )}
              Tu navegador no soporta el reproductor de video.
            </video>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
