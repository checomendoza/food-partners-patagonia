import Header from "../../components/Header";
import { CameraIcon, CheckCircleIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react';
import Axios from 'axios'
import Link from 'next/link'
import imageCompression from 'browser-image-compression';
import Loader from '../../components/Loader'


export default function FormHallazgo(){
    const FORM_ENDPOINT = "https://api-foodpartnerspatagonia.herokuapp.com/api/newIncidencia";
    const [user, setUser] = useState(null)
    const [photo, setPhoto]=useState(null)
    const [formStatus, setFormStatus] = useState(null);
    const [query, setQuery] = useState({
        titulo: "",
        detalle: "",
        id_area: "",
        id_user: "",
        prioridad: "",
        foto: ""
    });

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('userData')))
        const camera = document.querySelector('#camera');  
        camera && camera.addEventListener('change', function(e) {
            if(e.target.files.length !== 0){
                setPhoto(URL.createObjectURL(e.target.files[0]))
            }
        });
      }, [])

  const handleFileChange = () => async(e) => {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        fileType: 'image/png', 
      }
      try {
        const compressedFile = await imageCompression(e.target.files[0], options);
    setQuery((prevState) => ({
        ...prevState,
        foto: compressedFile
    }))
    }
    catch (error) {
        console.log(error);
    }
};
const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
        ...prevState,
        [name]: value
    }));
}
  const handleSubmit = (e) => {
    setFormStatus('sending');
    e.preventDefault();
    const formData = new FormData();
    Object.entries(query).forEach(([key, value]) => { formData.append(key, value)})
    Axios
    .post(
            FORM_ENDPOINT,
            formData,
            {headers: {Accept: "application/json"}}
        )
        .then(function (response) {
            setFormStatus('complete');
            setQuery({
                titulo: "",
                detalle: "",
                id_area: "",
                id_user: user.id,
                prioridad: "",
                foto: ""
            });
            console.log(response);
        })
        .catch(function (error) {
            setFormStatus(null)
            alert('Ocurrió un error al guardar los datos. Intento nuevamente')
            console.log('error upload', error);
        });
    }  
    return(
        <div className=' w-screen h-screen justify-center relative'>
            <Header />
            <h1 className='text-2xl font-bold text-gray-700 text-center pt-3 pb-1'>Nuevo Hallazgo</h1>
            <p className='font-light text-gray-700 text-md px-3 text-center'>Especifique un nombre y describa el hallazgo detectado adjuntando una fotografía del mismo</p>
            {formStatus=='complete' && 
                    <div className="flex flex-col justify-center items-center text-center text-xl text-green-600 my-20">
                        <CheckCircleIcon className='w-10' />
                        Se ha registrado el hallazgo
                        <Link href='listhallazgos'>
                        <a>
                        <button type='button' className='w-11/12 p-4 bg-blue-400 text-white text-xl mt-7 mb-3 mx-3 rounded-xl focus:outline-none '>Ir al listado</button>
                        </a>
                        </Link>
                    </div>
                } 
            {
                formStatus=='sending' && <Loader msg='Guardando Datos...' color='blue-400' />
            }
            {!formStatus &&
            <div className='flex flex-col items-center'>
                <form acceptCharset="UTF-8" method="POST" enctype="multipart/form-data" onSubmit={handleSubmit}>
            <input name='titulo' placeholder='Titulo' required className='w-11/12 focus:outline-none focus:ring-2 focus:ring-blue-300  rounded-xl p-3 mx-3 my-2' onChange={handleChange()} value={query.titulo} />
            <textarea name='detalle' placeholder='Detalle' required className='w-11/12 focus:outline-none focus:ring-2 focus:ring-blue-300  rounded-xl p-3 mx-3 my-2' rows='5' onChange={handleChange()} value={query.detalle}></textarea>
            <div className="relative w-12/12 mx-3">
                <svg className="w-2 h-5 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero"/></svg>
                <select name='id_area' required className="border border-gray-200 rounded-full text-gray-600 h-10 pl-5 pr-10 my-2 w-full bg-white focus:ring-2 focus:ring-blue-300 focus:outline-none appearance-none" onChange={handleChange()}>
                    <option disabled defaultValue hidden>Seleccione el área...</option>
                    <option value='1'>Mantimiento</option>
                    <option value='2'>Proveedores</option>
                    <option value='3'>Limpieza</option>
                    <option value='4'>Personal</option>
                </select>
            </div>
            <div className='w-12/12 my-5 mx-3'>
                {/* <p className='text-gray-400 m-3'>Prioridad</p> */}
                <div className='flex items-center justify-around'>
                <label>
                    <input type="radio" name="prioridad" value="baja" class="hidden" onChange={handleChange()} />
                    <div class="flex items-center py-3 px-7 rounded-xl bg-white label-checked:bg-yellow-400 label-checked:text-white text-center">Baja</div>
                </label>
                <label>
                    <input type="radio" name="prioridad" value="media" class="hidden" onChange={handleChange()} />
                    <div class="flex items-center py-3 px-7 rounded-xl bg-white label-checked:bg-green-400 label-checked:text-white text-center">Media</div>
                </label>
                <label>
                    <input type="radio" name="prioridad" value="alta" class="hidden" onChange={handleChange()} />
                    <div class="flex items-center py-3 px-7 rounded-xl bg-white label-checked:bg-red-400 label-checked:text-white text-center">Alta</div>
                </label>     
                    
                </div>
            </div>
             <label className='flex justify-center mt-5'>
                 {!photo 
                 ?
                <CameraIcon className='w-6/12 text-gray-700' />
                :
                <img height={200} width={300} src={photo} className='rounded-xl' />
                 }
             <input required name='foto' type="file" accept="image/*" capture="environment" id="camera" className='h-0 w-0' onChange={handleFileChange()}/>
             </label>
          
                    <button type='submit' className='w-11/12 p-4 bg-blue-400 text-white text-xl mt-7 mb-3 mx-3 rounded-xl focus:outline-none '>Aceptar</button>
       
             </form>
            </div>
            }
        </div>
    )
}