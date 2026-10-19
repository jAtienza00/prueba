import React, { useState, useEffect, useRef } from "react";
import {Reveal} from "../services/Gestor";


export default function RevealComponent() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  // Cargar datos del JSON
  useEffect(() => {
    try {
        const img = Reveal();
        setData(img);
    } catch (error) {
      console.error("Error cargando month4.json:", error);
    }
  }, []);

  // Inicializar el canvas
  useEffect(() => {
    if (!visible || !data) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.fillStyle = "rgba(0,0,0,0.99)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [visible, data]);

  // Función para revelar partes de la imagen
  const reveal = (x, y) => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 80);
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,0.95)");

    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, 80, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  };

  const handleMouseMove = (e) => {
    reveal(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    reveal(touch.clientX, touch.clientY);
  };

  // Botón inicial
  if (!visible) {
    return (
      <div className="fixed top-4 right-30 ">
        <button
          onClick={() => setVisible(true)}
          className="px-6 py-3 text-2xl mt-4 cursor-pointer text-white hover:scale-105 transition-transform duration-200"
        >
          🌫️
        </button>
      </div>
    );
  }

  // Pantalla completa con efecto
  return (
    <div className="fixed inset-0 bg-red-900 z-50 flex items-center justify-center">
      {data && (
        <>
          {/* Imagen oculta */}
          <img
  src={data.image}
  alt="Sorpresa Mes 4"
  className="relative w-full h-[80vh] object-contain p-4 rounded-lg shadow-lg"
/>


          {/* Canvas para la neblina */}
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="absolute inset-0 w-full h-full"
          />

          {/* Botón cerrar */}
          <button
            onClick={() => setVisible(false)}
            className="absolute top-6 right-6 px-4 py-2 bg-pink-400 text-black font-bold rounded-full shadow hover:bg-pink-500 transition"
          >
            &times;
          </button>
        </>
      )}
    </div>
  );
}
