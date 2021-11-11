import { useState, useEffect } from "react"
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { UpdateUser } from "../../api/Users";
import Modal from "../../components/Modal";

export default function Index(){
    const [isLoading,setIsLoading] = useState(true);
    const [alertOK,setAlertOK] = useState(false);
    const [alertError,setAlertError] = useState(false);
    const [userEdit, setUserEdit] = useState({});
    const handleSubmit =()=>{
        if (userEdit.password === userEdit.password2 ){
            setIsLoading(true)
                    UpdateUser(userEdit).then(() => {
                        delete userEdit.password;
                        delete userEdit.password2;
                        localStorage.setItem('userData', JSON.stringify(userEdit))
                        setIsLoading(false)
                        setAlertOK(true)
                    })
        }
        else{
            setAlertError(true)
        }
       
        
    }
    const handleChange = (e) => {
        const name = e.target.name
		const value = e.target.value
        setUserEdit((prevState) => ({
			...prevState,
			[name]: value,
		}))
    }
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        userData.password = '';  
        userData.password2 = '';  
        setUserEdit(userData)
        setIsLoading(false)
    },[])
    return(
		<div className="w-full">
            {alertOK && <Modal title='Datos Actualizados' msg='Se han actualizados sus datos correctamente' route='/dashboard'/>}
            {alertError && <Modal title='Error' msg='Las contraseñas no coinciden' accept={setAlertError}/>}
            <Header />
            <h1 className="text-2xl font-bold text-gray-700 text-center pt-3 pb-1">Mi Cuenta</h1>
            <p className='text-center px-3 text-md'>Modifique los datos de su cuenta. <br/>Recuerde si NO desa cambiar la contraseña, debe dejar en blanco</p>
            {isLoading ? (
				<Loader msg="Guardando Datos.." color="blue-400" />
			) : (
				<div className="w-full md:px-32 flex flex-col items-center">
			
						<input
							name="ayn"
                            required
							className="w-11/12 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-xl p-3 mx-3 my-2"
							value={userEdit.ayn}
							onChange={(e)=>handleChange(e)}
						/>
						<input
							name="email"
                            required
							className="w-11/12 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-xl p-3 mx-3 my-2"
							value={userEdit.email}
							onChange={(e)=>handleChange(e)}
						/>
						<input
							name="password"
							id="password"
                            type="password"
							placeholder="Password"
							className="w-11/12 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-xl p-3 mx-3 my-2"
							onChange={(e)=>handleChange(e)}
						/>
						<input
							name="password2"
							id="password2"
                            type="password"
							placeholder="Repetir Password"
							className="w-11/12 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-xl p-3 mx-3 my-2"	
							onChange={(e)=>handleChange(e)}
						/>
	
					
						<div className="flex flex-col items-center w-full">
							<button
								type="button"
                                onClick={()=>handleSubmit()}
								className="w-11/12 p-4 bg-blue-400 text-white text-xl mt-7 mb-3 mx-3 rounded-xl focus:outline-none "
							>
								Guardar Cambios
							</button>
							
						</div>
				</div>
			)}
        </div>
    )
}