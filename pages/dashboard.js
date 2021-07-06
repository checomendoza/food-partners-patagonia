import Header from '../components/Header'
import { useEffect, useState } from 'react'
export default function Dashboard() {
  const [userdata, setUserData]=useState()
useEffect(()=>{
  setUserData(JSON.parse(localStorage.getItem('userData')))
}, [])
  return (
    <div className='w-screen justify-center relative'>
      <Header />
      <h1 className='text-3xl font-bold text-center my-3'>Sistema  de control de incidencias....</h1>
      <main className='flex flex-col items-center py-3'>
      <p>Bienvenido {userdata && userdata.ayn}</p>
      </main>
    </div>
  )
}
