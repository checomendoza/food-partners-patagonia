import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Link from 'next/link'
import { getUsers } from "../../api/Users";
import {UserIcon} from '@heroicons/react/solid'

export default function ListUsers(){
const [users, setUsers]=useState(null)

useEffect(()=>{
    getUsers().then((respuesta)=>{
        setUsers(respuesta.data)
    })
},[])
    return(
        <div className='w-full'>
            <Header />
            <h1 className='text-2xl font-bold text-gray-700 text-center pt-3 pb-1'>Listado de Usuarios</h1>
            <p className='font-light text-gray-700 text-md px-3 text-center'>Listado de usuarios del sistema sus roles y area al que pertenece</p>
            <div className='flex flex-col mt-5'>
                {users && users.map((user)=>
                <div key={user.id} className='flex flex-col items-center p-5 border-b border-gray-300 m-1'>
                    <div className='flex w-full'>
                    <UserIcon className='w-10 text-gray-600'/>
                    <p className='text-2xl text-gray-700 mx-7'>{user.ayn}</p>
                    </div>
                    <div className='flex'>
                    <p className='text-gray-500 mx-1'>{user.rol} </p>
                    <p className='text-gray-500'>{user.nombre && '| '+user.nombre}</p>
                    </div>
                </div>
                )}
            </div>
            <footer className='flex fixed right-5 bottom-5'>
                <Link href='formuser'>
                    <a>
                    <button className='flex w-20 bg-blue-400 active:bg-indigo-800 focus:outline-none text-white rounded-full right-5 py-5 text-4xl  sticky float-right justify-center'>+</button>
                    </a>
                </Link>
            </footer>
        </div>

    )
}