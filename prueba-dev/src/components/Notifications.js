import React, { useEffect, useState } from 'react';
import {Gatos, Frases} from '../services/Gestor';

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
        const mensaje = await Frases();
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
      <div className='bg-white/75 opacity-100 shadow-black shadow-xl rounded-md flex justify-center fixed items-center' style={{
        top: 10,
        left: -5,
        width: '40%',
        maxWidth: '1000px',
        zIndex: 100,
  
      }}>
        {gato ? (
          noti && <img src={noti} alt='gato' style={{ width: '50%', height: '50%' }} className='opcity-100'/>
        ) : (
          <p className='text-center font-Math.min(canvas.width, canvas.height) / 300 p-3'>{noti}</p>
        )}
      </div>
    );
    
}else{
    return <></>;
}
}

