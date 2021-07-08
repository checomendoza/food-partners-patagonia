import Header from '../../components/Header'
import Article from '../../components/Article';
import Link from 'next/link';
import { SearchCircleIcon } from '@heroicons/react/outline'
import Loader from '../../components/Loader'

import { useState, useEffect } from 'react';
import Axios from 'axios'


export default function ListHallazgos() {
const [incidencias, setIncidencias]=useState(null)
const [isLoading, setisLoading]=useState(true)
useEffect(()=>{
Axios.post('https://api-foodpartnerspatagonia.herokuapp.com/api/getIncidencias').then((resp)=>{
  console.log('RESPUETA',resp)
  setIncidencias(resp.data.data)
  setisLoading(false)
})
}, [])
  
  return (
    <div className='w-screen justify-center relative'>
      <Header />
      <h1 className='text-2xl font-bold text-gray-700 text-center pt-3 pb-1'>Listado de Hallazgos</h1>
      <main className='flex flex-col items-center py-3'>
        {isLoading && <Loader msg='Cargando...' color='blue-400' />}
        {incidencias && incidencias.length==0 &&
        <>
        <SearchCircleIcon className='w-20 text-gray-500 font-light mt-24' />
        <h1 className='text-2xl text-gray-600'>No existen hallazgos</h1>
        </>
        }
        {incidencias && incidencias.map((item)=>
                <Article key={item.id} item={item}/>
        )}
      </main>
      <footer className='flex fixed right-5 bottom-5'>
      <Link href='/hallazgos/formhallazgo'>
        <a>
        <button className='flex w-20 bg-blue-400  active:bg-indigo-800 focus:outline-none text-white rounded-full right-5 py-5 text-4xl  sticky float-right justify-center'>+</button>
        </a>
      </Link>
      </footer>
      
    </div>
  )
}
