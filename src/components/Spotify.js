import React from "react";

export default function SpotifyComponent() {
  const playlistURL = "https://open.spotify.com/playlist/06bOdfggK6dOi1pG8Wj8jn"; // <-- tu URL real aquí

  return (
    <div className="mt-6 flex flex-col items-center">
      <img
        src="/IMG_0858.jpg"
        alt="Código de Spotify"
        className="w-64 sm:w-80 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={() => window.open(playlistURL, "_blank")}
      />
    </div>
  );
}
