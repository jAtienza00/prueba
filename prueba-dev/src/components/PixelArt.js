import React, { useState, useEffect } from 'react';
import { PixelData, Imagenes } from '../services/Gestor';

const PixelArtComponent = () => {
  const [visible, setVisible] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [tiles, setTiles] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(8);
  const [won, setWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentImage, setCurrentImage] = useState("");

  const data = PixelData();
  const { avatars, message, title } = data;
  const imagesList = Imagenes();
  const totalLevels = 10;

  // Initialize puzzle
  useEffect(() => {
    if (gameStarted) {
      initializeGame();
    }
  }, [gameStarted, level]);

  const initializeGame = () => {
    // Select image for current level (use modulo to wrap if needed)
    // We use level-1 because arrays are 0-indexed
    const imgUrl = imagesList[(level - 1) % imagesList.length];
    setCurrentImage(imgUrl);

    // Create 3x3 grid (0-8), 8 is empty
    let initialTiles = Array.from({ length: 9 }, (_, i) => i);
    
    // Shuffle until solvable
    do {
      initialTiles = shuffle(initialTiles);
    } while (!isSolvable(initialTiles) || isSolved(initialTiles));

    setTiles(initialTiles);
    setEmptyIndex(initialTiles.indexOf(8));
    setWon(false);
    setMoves(0);
  };

  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    const newArray = [...array];
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [newArray[currentIndex], newArray[randomIndex]] = [
        newArray[randomIndex], newArray[currentIndex]];
    }
    return newArray;
  };

  const isSolvable = (tiles) => {
    let inversions = 0;
    for (let i = 0; i < tiles.length - 1; i++) {
      for (let j = i + 1; j < tiles.length; j++) {
        if (tiles[i] !== 8 && tiles[j] !== 8 && tiles[i] > tiles[j]) {
          inversions++;
        }
      }
    }
    return inversions % 2 === 0;
  };

  const isSolved = (currentTiles) => {
    for (let i = 0; i < currentTiles.length - 1; i++) {
      if (currentTiles[i] !== i) return false;
    }
    return true;
  };

  const moveTile = (index) => {
    if (won) return;

    const row = Math.floor(index / 3);
    const col = index % 3;
    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;

    const isAdjacent = 
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      setEmptyIndex(index);
      setMoves(moves + 1);

      if (isSolved(newTiles)) {
        setWon(true);
      }
    }
  };

  const handleNextLevel = () => {
    if (level < totalLevels) {
      setLevel(level + 1);
    } else {
      // Game Over (Completed)
      setGameStarted(false);
      setVisible(false);
      setLevel(1); // Reset for next time
    }
  };

  if (!visible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setVisible(true)}
          className="w-14 h-14 flex items-center cursor-pointer justify-center bg-transparent border-none hover:-translate-y-1 transition-all"
          title="Jugar Pixel Love"
        >
          <img 
            src={avatars[0]} 
            alt="Pixel Avatar" 
            className="w-full h-full object-cover rounded-full border-4 border-purple-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900/95 flex items-center justify-center z-[100] p-4 font-mono">
      <div className="relative bg-gray-800 border-4 border-white p-6 max-w-lg w-full rounded-xl shadow-2xl text-center">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b-4 border-white pb-4">
          <h2 className="text-2xl text-yellow-400 font-bold uppercase tracking-widest">{title}</h2>
          <button 
            onClick={() => setVisible(false)}
            className="text-red-500 hover:text-red-400 text-2xl font-bold"
          >
            X
          </button>
        </div>

        {!gameStarted ? (
          <div className="space-y-8 py-8">
            <div className="flex justify-center gap-4 animate-bounce">
              {avatars.map((avatar, i) => (
                <img 
                  key={i} 
                  src={avatar} 
                  alt={`Avatar ${i}`} 
                  className="w-20 h-20 object-cover rounded-full border-4 border-white"
                />
              ))}
            </div>
            <p className="text-white text-lg">¿Puedes recomponer nuestros recuerdos?</p>
            <p className="text-yellow-300 text-sm">Completa los {totalLevels} niveles</p>
            <button
              onClick={() => setGameStarted(true)}
              className="px-8 py-4 bg-green-500 text-black font-bold text-xl uppercase border-b-4 border-green-700 active:border-b-0 active:translate-y-1 transition-all rounded"
            >
              COMENZAR JUEGO
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="mb-2 text-yellow-400 font-bold text-lg">
              NIVEL {level} / {totalLevels}
            </div>

            {won ? (
              <div className="animate-fade-in-up space-y-6">
                <img 
                  src={currentImage} 
                  alt="Solved" 
                  className="w-64 h-64 object-cover border-4 border-yellow-400 rounded shadow-[0_0_20px_rgba(255,215,0,0.5)] mx-auto"
                />
                <div className="bg-white/10 p-4 rounded border border-white/20">
                  <p className="text-yellow-300 text-xl font-bold mb-2">
                    {level === totalLevels ? "¡JUEGO COMPLETADO!" : "¡NIVEL COMPLETADO!"}
                  </p>
                  {level === totalLevels && (
                    <p className="text-white whitespace-pre-wrap">{message}</p>
                  )}
                </div>
                
                {level < totalLevels ? (
                  <button
                    onClick={handleNextLevel}
                    className="mt-4 px-6 py-2 bg-green-500 text-black font-bold border-b-4 border-green-700 active:border-b-0 active:translate-y-1 rounded"
                  >
                    SIGUIENTE NIVEL ➡️
                  </button>
                ) : (
                  <button
                    onClick={handleNextLevel}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white font-bold border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 rounded"
                  >
                    FINALIZAR 🏆
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="mb-4 flex justify-between w-64 text-white font-bold">
                  <span>MOVIMIENTOS: {moves}</span>
                  <button onClick={initializeGame} className="text-xs text-red-400 hover:text-red-300">REINICIAR</button>
                </div>
                
                <div 
                  className="grid grid-cols-3 gap-1 bg-gray-700 p-1 border-4 border-gray-600 rounded"
                  style={{ width: '300px', height: '300px' }}
                >
                  {tiles.map((tileNumber, index) => {
                    const x = (tileNumber % 3) * 100 / 2;
                    const y = Math.floor(tileNumber / 3) * 100 / 2;

                    return (
                      <div
                        key={index}
                        onClick={() => moveTile(index)}
                        className={`relative w-full h-full cursor-pointer transition-transform duration-100 flex items-center justify-center ${
                          tileNumber === 8 ? 'invisible' : 'hover:scale-[0.98]'
                        }`}
                        style={{
                          backgroundImage: tileNumber !== 8 ? `url(${currentImage})` : 'none',
                          backgroundSize: '300% 300%',
                          backgroundPosition: `${x}% ${y}%`,
                        }}
                      >
                        {tileNumber !== 8 && (
                          <span className="bg-black/40 text-white text-xs font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                            {tileNumber + 1}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <p className="mt-4 text-gray-400 text-sm">Haz clic en las piezas para moverlas</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PixelArtComponent;
