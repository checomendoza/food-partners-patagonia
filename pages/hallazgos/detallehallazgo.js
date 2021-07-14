import { useRouter } from 'next/router'
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import { getNovedades } from '../../api/Novedades';
import { getAreas } from '../../api/Areas';
import {ClipboardListIcon, ClipboardCopyIcon} from '@heroicons/react/solid'

export default function DetalleHallazgo(props){
    const router = useRouter()
    const item=JSON.parse(props.item ? props.item : null);
    const [novedades, setNotvedades]=useState(null)
    const [user, setUser]=useState(null)
    const [areas, setAreas]=useState(null)
    const [derivar, setDerivar]=useState(false)

    var bg_prioidad=''
   if(item) {
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
}
useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('userData')))
    getNovedades(item.id).then((respuesta)=>{
        setNotvedades(respuesta)
    })
    getAreas().then((resp)=>{
        setAreas(resp.data)
    })
}, [])

    return(
        item &&
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
            {(user && user.rol=='Admin') ?
            <button type='button' className='w-11/12 p-4 bg-blue-400 text-white text-xl mt-7 mb-3 mx-3 rounded-xl focus:outline-none'>Cerrar Instancia</button>
            :
            <div className='flex justify-center'>
            <button type='button' className='flex flex-col justify-center items-center w-6/12 p-3 border bg-green-100 border-green-600 text-green-600 text-lg mt-5 mb-3 mx-3 rounded-xl focus:outline-none'>
                <ClipboardListIcon className="w-10" />
                Acción
            </button>
            <button type='button' className='flex flex-col justify-center items-center w-6/12 p-3 border bg-yellow-100 border-yellow-600 text-yellow-600 text-lg mt-5 mb-3 mx-3 rounded-xl focus:outline-none' onClick={()=>setDerivar(true)}>
                <ClipboardCopyIcon className='w-10'/>
                Derivar
            </button>
            </div>
            }
            {derivar &&
            <div className='text-center mt-7'>
                <p className='text-gray-600 text-xs mx-5'>Seleccione el área al que desea derivar este hallazgo para que tome una acción</p>
                <div className="relative w-12/12 mx-3 text-center">
                    <svg className="w-2 h-5 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero"/></svg>
                    <select name='id_area' required className="border border-gray-200 rounded-full text-gray-600 h-10 pl-5 pr-10 my-2 w-full bg-white ring-2 ring-blue-300 outline-none appearance-none">
                        <option value=''>Seleccione el área...</option>
                        {areas && areas.map((area)=><option key={area.id} value={area.id}>{area.nombre}</option>)}
                    </select>
                </div>
                <button type='button' className='w-11/12 p-4 bg-blue-400 text-white text-xl mt-7 mb-3 mx-3 rounded-xl focus:outline-none'>Aceptar</button>
            </div>
            }
        </div>
        
    )
}
DetalleHallazgo.getInitialProps=({query})=>{
    return query
  }