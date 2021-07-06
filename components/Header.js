import {HomeIcon, LogoutIcon, MenuIcon, ClipboardListIcon, FlagIcon, UsersIcon, XIcon, DocumentReportIcon, UserCircleIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useState } from 'react'
import {useRouter} from 'next/router'

export default function Header(){
    const [isOpenMenu, setIsOpenMenu]=useState(false)
    const router = useRouter()
    const logout = () =>{
        setIsOpenMenu()
        if(confirm('Desea cerrar su sesion?')){
            localStorage.clear()
            router.push('/')
        }
    }
    return(
        <div className='sticky top-0 z-50'>
        <div className='flex items-center w-full bg-blue-500 py-3 '>
            <button className='focus:outline-none' onClick={()=>setIsOpenMenu(isOpenMenu ? false : true)} >
                {!isOpenMenu
                ?
                <MenuIcon className='w-8 text-white mx-3'/>
                :
                <XIcon className='w-8 text-white mx-3'/>
                }
            </button>
            <img src='/img/logo.png' width={250} className='self-center mx-7'/>
            {/* <h1 className='text-xl py-2 text-center text-gray-300'>Sistema de Control de Incidencias</h1> */}
        </div>
        <div className={`flex bg-blue-500 h-screen absolute w-56 transform transition ease-in-out duration-500 sm:duration-700  ${!isOpenMenu ? '-translate-x-full' : 'translate-x-0'}`}>
            <nav className='py-10 px-3'>
                <ul>
                    <Link href='/dashboard'>
                        <a onClick={()=>setIsOpenMenu(false)}>
                        <li className='flex items-center text-white text-xl mb-7 font-light'>
                            <HomeIcon className='w-7 mr-2'/>
                            <p>Inicio</p>
                        </li>
                        </a>
                    </Link>
                    <Link href='/hallazgos/listhallazgos'>
                        <a onClick={()=>setIsOpenMenu(false)}>
                        <li className='flex items-center text-white text-xl mb-7 font-light'>
                            <ClipboardListIcon className='w-7 mr-2'/>
                            <p>Hallazgos</p>
                        </li>
                        </a>
                    </Link>
                   <Link href='/areas/listareas'>
                        <a onClick={()=>setIsOpenMenu(false)}>
                        <li className='flex items-center text-white text-xl mb-7 font-light'>
                            <FlagIcon className='w-7 mr-2'/>
                            <p>Áreas</p>
                        </li>
                        </a>
                   </Link>
                    <Link href='/users/listusers'>
                        <a onClick={()=>setIsOpenMenu(false)}>
                        <li className='flex items-center text-white text-xl mb-7 font-light'>
                            <UsersIcon className='w-7 mr-2'/>
                            <p>Usuarios</p>
                        </li>
                        </a>
                    </Link>
                    <Link href='#'>
                        <a onClick={()=>setIsOpenMenu(false)}>
                        <li className='flex items-center text-white text-xl mb-7 font-light'>
                            <DocumentReportIcon className='w-7 mr-2'/>
                            <p>Reportes</p>
                        </li>
                        </a>
                    </Link>
                    <Link href='#'>
                        <a onClick={()=>setIsOpenMenu(false)}>
                        <li className='flex items-center text-white text-xl mb-7 font-light'>
                            <UserCircleIcon className='w-7 mr-2'/>
                            <p>Mi Cuenta</p>
                        </li>
                        </a>
                    </Link>
                    <Link href='#'>
                        <a onClick={()=>logout()}>
                        <li className='flex items-center text-white text-xl mb-7 font-light'>
                            <LogoutIcon className='w-7 mr-2'/>
                            <p>Salir</p>
                        </li>
                        </a>
                    </Link>
              
                </ul>
            </nav>
        </div>
        </div>
    )
}