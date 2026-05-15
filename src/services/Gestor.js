import frases from './mensajes.json';
import fotos from './fotos.json';
import textos from './textos.json';
import carta from './carta.json';
import palabra from './palabra.json';
import reveal from './Reveal.json';
import cielo from './month5.json';
import cartas from './cartasDelMes.json';
import pixel from './pixel.json';
import month8 from './month8.json';
import month10 from './month10.json';
import month9 from './month9.json';
import month11 from './month11.json';
import month12 from './month12.json';



export function incrementarAbrazos() {
  let abrazo = 0;
  if (localStorage.getItem("abrazos") != null) {
    abrazo = Number(localStorage.getItem("abrazos"));
  }
  abrazo++;  // Incrementar antes de guardar
  localStorage.setItem("abrazos", abrazo);
  return abrazo; // Devuelve el nuevo valor
}

export function esBeso() {
  let abrazo = 0;
  if (localStorage.getItem("abrazos") != null) {
    abrazo = Number(localStorage.getItem("abrazos"));
  }
  return abrazo > 0 && abrazo % 10 === 0;
}


export function Frases(){
    const randomIndex = Math.floor(Math.random() * frases.frasesDeAmor.length);
    return frases.frasesDeAmor[randomIndex];
}

export function Textos(){
  return textos;
}

export function Carta(){
  return carta;
}

export function LikedThing(){
  const randomIndex = Math.floor(Math.random() * palabra.length);
  return palabra[randomIndex];
}

export function Imagenes(){
  return fotos.ids.map(id => `fotos/${id}`)
  //return fotos.ids.map(id => `https://drive.google.com/uc?export=download&id=${id}`);
}
//https://drive.usercontent.google.com/download?id=1TinKj7o5SzCGQ1N5fufDFxVHmwKSY8wE&export=view&authuser=0


export async function NASA(date) {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=JRj6byZcaiMoYauoccn9Kg1JaNNeXDJ28GdIoCgN&date=${date}`
    );
    const data = await response.json();
    const emojiEffects = ["🌍", "🪐", "⭐", "🚀"];
    return {
      hdurl: data.hdurl,
      url: data.url,
      title: data.title,
      explanation: data.explanation,
      emojiEffects
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function Cielos() {
  // Convertimos el objeto en array ordenado por fecha
  const mensajes = Object.values(cielo.mensajes).sort(
    (a, b) => new Date(a.fecha) - new Date(b.fecha)
  );
  return {
    mensajes,
    miniMensajes: cielo.miniMensajes
  };
}


export function Reveal() {
  const startDay = 9;
  const today = new Date().getDate(); // día actual (número de mes)
  
  // índice = día - inicio (pero nunca menor a 0 ni mayor al total de imágenes -1)
  let index = today - startDay;
  if (index < 0) index = 0;
  if (index >= reveal.images.length) index = reveal.images.length - 1;

  return {
    image: reveal.images[index]
  };
}
/*
example: 
{
  "copyright": "How big is planet Earth's Moon",
  "date": "2025-08-23",
  "explanation": "How big is planet Earth's Moon? Compared to other moons of the Solar System, it's number 5 on the largest to smallest ranked list, following Jupiter's moon Ganymede, Saturn's moon Titan, and Jovian moons Callisto and Io. Continuing the list, the Moon comes before Jupiter's Europa and Neptune's Triton. It's also larger than dwarf planets Pluto and Eris. With a diameter of 3,475 kilometers the Moon is about 1/4 the size of Earth though, and that does make it the largest moon when compared to the size of its parent Solar System planet. Of course in this serene, twilight sea and skyscape, August's rising Full Moon still appears small enough to be caught in the nets of an ancient fishing rig. The telephoto snapshot was taken along the Italian Costa dei Trabocchi, on the Adriatic Sea.",
  "hdurl": "https://apod.nasa.gov/apod/image/2508/1000212902_bellelli.jpg",
  "media_type": "image",
  "service_version": "v1",
  "title": "Fishing for the Moon",
  "url": "https://apod.nasa.gov/apod/image/2508/1000212902_bellelli1024.jpg"
}
*/

export async function Gatos() {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search', {
          headers: {
              'x-api-key': 'live_IyHesXBT7AMcIiyuqeEbPNvXGAWrDQ5A7fDMBvEoe0OswSducWZJFBrvZ9KuHk1U',
              'Content-Type': 'application/json'
          }
      });
      const data = await response.json();
      return data[0].url;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  export function CartasDelMes() {
    const now = new Date();
  
    const startDate = new Date(2025, 11, 15);
    let monthsPassed =
      (now.getFullYear() - startDate.getFullYear()) * 12 +
      (now.getMonth() - startDate.getMonth());
  
    if (now.getDate() >= 15) {
      monthsPassed += 1;
    }
  
    const updatedCards = cartas.cards.map((card, index) => ({
      ...card,
      unlocked: index <= monthsPassed,
    }));
  
    console.log("✅ Cartas cargadas:", updatedCards);
    return updatedCards;
}

export function PixelData() {
  return pixel;
}

export function Month8Data() {
  let correctas = localStorage.getItem("correctas") || 0;
  if (correctas >= 3) {
    return month8;    
  }
  return {title: "Necesitas mas nivel", message: 'Necesitas acertar 3 palabras para poder jugar. Accede a "¿Jugamos?" en "Ver mas".',}
}

export function Month9Data() {
  // Para el mes 9 no hay requisito de juego, se desbloquea por tiempo
  return month9;
}

export function Month10Data() {
  return month10;
}

export function Month11Data() {
  return month11;
}

export function Month12Data() {
  return month12;
}