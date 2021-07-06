import { useRouter } from 'next/router'
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import { getNovedades } from '../../api/Novedades';

export default function DetalleHallazgo(){
    const router = useRouter()
    const item=JSON.parse(router.query.item ? router.query.item : null);
    const [novedades, setNotvedades]=useState(null)
    var bg_prioidad=''
    switch(item.prioridad.toLowerCase()){
        case 'baja':
            bg_prioidad='bg-green-400'
            break
        case 'media':
            bg_prioidad='bg-yellow-400'
            break
        case 'alta':
            bg_prioidad='bg-red-400'
        break

    }
useEffect(()=>{
    getNovedades(item.id).then((respuesta)=>{
        setNotvedades(respuesta)
    })
}, [])

    return(
        <div className='w-screen justify-center relative'>
            <Header />
            <h1 className='text-xl text-center text-gray-700 font-regular mt-3'>{item.titulo}</h1>
            <h3 className={`text-sm text-center text-gray-500 font-regular mb-3`}>{item.created_at.slice(0, 10)}</h3>
            <div className='flex flex-col w-full border-b border-gray-300 pb-1'>
            <div className='flex w-11/12 mx-3 mb-1'>
                <span className={` bg-blue-300 w-1/2 text-sm text-blue-900 px-5 py-1 rounded-full text-center ml-5`}>{item.nombre}</span>
                <span className={`${bg_prioidad} w-1/2 text-sm text-gray-100  px-5 py-1 rounded-full text-center ml-5`}>{item.prioridad}</span>
            </div>
            <h3 className={`text-sm text-center text-gray-600 font-bold m-3`}>{item.estado}</h3>
            </div>
            <p className='text-md mx-3 my-3'>{item.detalle}</p>
            <div className='flex flex-col items-center text-center my-3'>
            <img src={`${item.url}`} className='w-80'/>
            </div>
            <div className='mt-5'>
                <h1 className='text-xl text-center text-gray-500 font-regular py-1'>Novedades</h1>
                    <div className='flex flex-col bg-white mx-2 px-3 py-1 my-3 rounded-md text-sm'>
                        <div className='flex justify-between text-xs'>
                        <p className='text-gray-500'>Fecha: 10-06-2021</p>
                        <p className='text-gray-500'>Plazo: 3 dias</p>
                        </div>
                        <div className='flex justify-between'>
                        <p className='text-gray-500'>Proveedores y Mantenimiento</p>
                        <p className='text-gray-500'>Bruno Apliche</p>
                        </div>
                        
                        <p className='my-2'>Detalle</p>
                    </div>
                    <div className='flex flex-col bg-white mx-2 px-3 py-1 my-3 rounded-md text-sm'>
                        <div className='flex justify-between text-xs'>
                        <p className='text-gray-500'>Fecha: 10-06-2021</p>
                        <p className='text-gray-500'>Plazo: 3 dias</p>
                        </div>
                        <div className='flex justify-between'>
                        <p className='text-gray-500'>Proveedores y Mantenimiento</p>
                        <p className='text-gray-500'>Bruno Apliche</p>
                        </div>
                        
                        <p className='my-2'>Detalle</p>
                    </div>
            </div>
            <button type='button' className='w-11/12 p-4 bg-blue-400 text-white text-xl mt-7 mb-3 mx-3 rounded-xl focus:outline-none'>Cerrar Instancia</button>
        </div>
    )
}