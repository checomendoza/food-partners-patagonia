import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import {getAreas} from '../../api/Areas'
import { DeleteUser, UpdateUser } from "../../api/Users";
import Loader from "../../components/Loader";

export default function DetallelUser(props){
const userEdit=JSON.parse(props.user ? props.user : null);
const router = useRouter()
const [areas, setAreas]=useState(null)
const [isLoading, setIsLoading]=useState(false)
const [query, setQuery] = useState({
    id: userEdit.id,
    ayn: userEdit.ayn,
    email: userEdit.email,
    rol: userEdit.rol,
    id_area: userEdit.id_area ? userEdit.id_area : null,
    password: undefined
});
const handleChange = (type) => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if(type=='rol'){
        setQuery((prevState) => ({
            ...prevState,
            id_area: null
        }));
    }
    setQuery((prevState) => ({
        ...prevState,
        [name]: value
    }));
}
const handleSubmit = ()=>{
    setIsLoading(true)
    UpdateUser(query).then((resp)=>{
        setIsLoading(false)
        router.back()
    })
}

const handleDelete = ()=>{
    if(confirm('Seguro que desea eliminar este usuario?')){
        setIsLoading(true)
        DeleteUser(query.id).then(()=>{
            setIsLoading(false)
            router.back()
        })
    }
}

useEffect(()=>{
    getAreas().then((resp)=>{
        setAreas(resp.data)
    })
},[])
    return(
        <div className="w-full">
            <Header />
            <h1 className='text-2xl font-bold text-gray-700 text-center pt-3 pb-1'>Editar Usuario</h1>
            {isLoading ? <Loader msg='Guardando Datos..' color='blue-400' /> :
            <form acceptCharset="UTF-8" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                <input name='ayn' className='w-11/12 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-xl p-3 mx-3 my-2' value={query.ayn} onChange={handleChange()}/>
                <input name='email' className='w-11/12 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-xl p-3 mx-3 my-2' value={query.email} onChange={handleChange()}/>
                <div className="relative w-11/12 mx-3">
                    <svg className="w-2 h-7 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero"/></svg>
                    <select name='rol' required className="border border-gray-200 rounded-xl text-gray-600 h-12 pl-3 pr-10 my-2 w-full bg-white focus:ring-2 focus:ring-blue-300 focus:outline-none appearance-none" onChange={handleChange('rol')}>
                        <option value='Admin' selected={query.rol=='Admin'} >Administrador</option>
                        <option value='Operador' selected={query.rol=='Operador'}>Operador</option>
                    </select>
                </div>
                {query.rol=='Operador' &&
                <div className="relative w-11/12 mx-3">
                    <svg className="w-2 h-7 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero"/></svg>
                    <select name='id_area' required className="border border-gray-200 rounded-xl text-gray-600 h-12 pl-3 pr-10 my-2 w-full bg-white focus:ring-2 focus:ring-blue-300 focus:outline-none appearance-none" onChange={handleChange()}>
                        {areas && areas.map((item)=><option key={item.id} value={item.id} selected={item.nombre==userEdit.nombre}>{item.nombre}</option>)}
                    </select>
                </div>
                }
                <div className="flex flex-col items-center w-full">
                <button type='submit' className='w-11/12 p-4 bg-blue-400 text-white text-xl mt-7 mb-3 mx-3 rounded-xl focus:outline-none '>Guardar Cambios</button>
                <button type='submit' className='w-7/12 p-3 bg-transparent border border-red-500 text-red-500 text-xl mt-7 mb-3 mx-3 rounded-xl focus:outline-none' onClick={()=>handleDelete()}>Eliminar Usuario</button>
                </div>
            </form>
            }
        </div>
    )
}

DetallelUser.getInitialProps=({query})=>{
    return query
  }