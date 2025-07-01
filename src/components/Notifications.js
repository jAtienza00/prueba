import React, { useEffect, useState } from 'react';

export default function Notification() {
  const [gato, setGato] = useState(false);
  const [noti, setNoti] = useState(null);
  const [temporizador, setTemporizador] = useState(null);
  const [aparecer, setAparecer] = useState(null);

  useEffect(() => {
    const fetchNotification = async () => {
      if (Math.floor(Math.random() * 2) === 1) {
        setGato(true);
        const imagen = await Gatos();
        setNoti(imagen);
      } else {
        const mensaje = await Mensaje();
        setNoti(mensaje);
      }
    };

    const aparecer = async () => {
        setAparecer(true);
        fetchNotification();
        setTimeout(() => {
            setAparecer(false);
        }, 30000);
    setInterval(() => {
        setAparecer(true);
        fetchNotification();
        setTimeout(() => {
            setAparecer(false);
        }, 30000);
    }, 60000);
    }

    aparecer();

  }, []);
if (aparecer) {
    return (
      <div style={{
        position: 'fixed',
        top: 10,
        left: -5,
        backgroundColor: 'white',
        width: '40%',
        maxWidth: '1000px',
        zIndex: 1000,
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
  
      }}>
        {gato ? (
          noti && <img src={noti} alt='gato' style={{ width: '50%', height: '50%' }}/>
        ) : (
          <p>{noti}</p>
        )}
      </div>
    );
    
}else{
    return <></>;
}
}

async function Gatos() {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search',
        {Headers:{
            'x-api-key': 'live_IyHesXBT7AMcIiyuqeEbPNvXGAWrDQ5A7fDMBvEoe0OswSducWZJFBrvZ9KuHk1U',
            'Content-Type': 'application/json'
        }}
    );
    const data = await response.json();
    return data[0].url;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function Mensaje() {
  return "Hola, soy un mensaje de prueba";
}
