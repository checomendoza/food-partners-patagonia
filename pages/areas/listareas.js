import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Link from 'next/link'
import { getAreas, deleteArea } from "../../api/Areas";
import {XIcon} from '@heroicons/react/solid'

export default function ListAreas(){
const [areas, setAreas]=useState(null)

useEffect(()=>{
   listAreas()
},[])

const listAreas = () =>{
    getAreas().then((resp)=>{
        setAreas(resp.data)
    })
}


const handleDelete = (id, nombre) =>{
    if(confirm(`Está seguro que desea eliminar el área de ${nombre}?`)){
        deleteArea(id).then(() =>{
            listAreas()
        }
        )
    }
}
    return(
        <div className='w-full'>
            <Header />
            <h1 className='text-2xl font-bold text-gray-700 text-center pt-3 pb-1'>Listado de Áreas</h1>
            <p className='font-light text-gray-700 text-md px-3 text-center'>Listado de áreas afectadas para asignar a los usuarios</p>
            <div className='mx-5'>
            {areas && areas.map((item)=>
            <div key={item.id} className='flex justify-between my-2 p-5 bg-white shadow rounded-xl'>
                <p className='text-lg text-gray-600 font-medium'>{item.nombre}</p>
                <XIcon className='text-red-600 w-6 cursor-pointer' onClick={()=>handleDelete(item.id, item.nombre)} />
            </div>
            )}
            </div>
            <footer className='flex fixed right-5 bottom-5'>
                <Link href='formarea'>
                    <a>
                    <button className="flex w-16 bg-blue-400  active:bg-indigo-800 focus:outline-none text-white rounded-full py-3 text-4xl  sticky float-right justify-center">
                        +</button>
                    </a>
                </Link>
            </footer>
        </div>

    )
}