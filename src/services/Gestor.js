import frases from './mensajes.json';
import fotos from './fotos.json';
import textos from './textos.json';


export function Frases(){
    const randomIndex = Math.floor(Math.random() * frases.frasesDeAmor.length);
    return frases.frasesDeAmor[randomIndex];
}

export function Textos(){
  return textos;
}

export function Imagenes(){
  return fotos.ids.map(id => `fotos/${id}`)
  //return fotos.ids.map(id => `https://drive.google.com/uc?export=download&id=${id}`);
}
//https://drive.usercontent.google.com/download?id=1TinKj7o5SzCGQ1N5fufDFxVHmwKSY8wE&export=view&authuser=0


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