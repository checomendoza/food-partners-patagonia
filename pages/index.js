import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';

export default function Home() {
const [photo, setPhoto]=useState('/icons/icon-512x512.png')
  useEffect(()=>{
    const camera = document.querySelector('#camera');  
    camera.addEventListener('change', function(e) {
      setPhoto(URL.createObjectURL(e.target.files[0]))
    });
  }, [])
  
  return (
    <div className='w-full bg-blue-100'>
      <h1>App</h1>
      <img height={100} width={100} src={photo} />
      <input type="file" accept="image/*" capture="camera" id="camera" />
    </div>
  )
}
