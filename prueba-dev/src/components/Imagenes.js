import React, { useState } from 'react';
import { Imagenes as getImages } from '../services/Gestor';
import './css/Imagenes.css';

// Puedes reemplazar estas URLs con tus propias imágenes
const images = getImages();

const Imagenes = () => {
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen ampliada

  const openGallery = () => setGalleryOpen(true);
  const closeGallery = () => setGalleryOpen(false);

  const openLightbox = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Estilos para el contenedor que ocupa toda la pantalla
  const galleryOverlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1050,
    padding: '5rem 2rem 2rem 2rem', // Padding para no pegar el contenido a los bordes
    boxSizing: 'border-box',
    overflowY: 'auto' // Permite scroll si hay muchas imágenes
  };

  // Estilos para el botón de cerrar
  const closeButtonStyles = {
    position: 'absolute',
    top: '20px',
    right: '30px',
    padding: '10px 20px',
    fontSize: '2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    zIndex: 1051,
  };

  // Estilos para el botón que abre la galería
  const openButtonStyles = {
     padding: '12px 24px',
     fontSize: '1.1rem',
     cursor: 'pointer',
     backgroundColor: '#e36b00',
     color: 'white',
     border: 'none',
     borderRadius: '8px',
     marginTop: '1rem',
     boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
     transition: 'background-color 0.3s ease'
  };

  // Estilo para el contenedor de cada imagen en la rejilla
  const imageContainerStyles = {
    width: '100%',
    aspectRatio: '1 / 1', // Hace que los contenedores sean cuadrados
    overflow: 'hidden',
    borderRadius: '8px',
    backgroundColor: '#333', // Fondo mientras carga la imagen
    cursor: 'pointer',
  };

  // Estilo para la imagen dentro de la rejilla
  const gridImageStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Encaja la imagen sin deformarla
    transition: 'transform 0.3s ease',
  };

  // --- Estilos para el Lightbox (visor de imagen ampliada) ---
  const lightboxOverlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1060, // Por encima de la galería
  };

  const lightboxImageStyles = {
    maxWidth: '90vw',
    maxHeight: '85vh',
    borderRadius: '8px',
    boxShadow: '0 0 30px rgba(255,255,255,0.2)',
  };

  return (
    <>
      <button 
      className="px-6 py-3 text-[1.1rem] cursor-pointer bg-fuchsia-700 text-white border-none rounded-lg mt-4 shadow-md hover:scale-105 transition-transform duration-200"
      onClick={openGallery}>
        Nuestras Fotos ❤️
      </button>

      {isGalleryOpen && (
        <div style={galleryOverlayStyles}>
          <button style={closeButtonStyles} onClick={closeGallery}>&times;</button>
          <div className="gallery-grid">
            {images.map((src, index) => (
              <div 
                key={index} 
                style={imageContainerStyles} 
                onClick={() => openLightbox(src)}
              >
                <img src={src} alt={`Galería imagen ${index + 1}`} style={gridImageStyles} />
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedImage && (
        <div style={lightboxOverlayStyles} onClick={closeLightbox}>
          <button style={{...closeButtonStyles, fontSize: '2.5rem'}} onClick={closeLightbox}>&times;</button>
          <img 
            src={selectedImage} 
            alt="Imagen ampliada" 
            style={lightboxImageStyles}
            onClick={(e) => e.stopPropagation()} // Evita que el clic en la imagen cierre el lightbox
          />
        </div>
      )}
    </>
  );
};

export default Imagenes;