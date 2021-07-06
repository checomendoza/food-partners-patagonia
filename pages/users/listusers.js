import Header from "../../components/Header";
import Link from 'next/link'

export default function ListUsers(){

    return(
        <div className='w-full'>
            <Header />
            <h1 className='text-2xl font-bold text-gray-700 text-center pt-3 pb-1'>Listado de Usuarios</h1>
            <p className='font-light text-gray-700 text-md px-3 text-center'>Listado de usuarios del sistema sus roles y area al que pertenece</p>

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