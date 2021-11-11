import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { UpdateUser } from "../../api/Users";

export default function Index(){
    const [isLoading,setIsLoading] = useState(true);
    const [userEdit, setUserEdit] = useState(
        {
            'ayn': null,
            'email': null,
            'password': null,
            'password2': null,
            'rol': null,
            'id_area': null,
        });
    const router = useRouter();
    const handleSubmit =()=>{
        if (userEdit.password === userEdit.password2 ){
            setIsLoading(true)
                    UpdateUser(userEdit).then(() => {
                        userEdit.password = null;
                        userEdit.password2 = null;
                        setIsLoading(false)
                        localStorage.setItem('userData', JSON.stringify(userEdit))
                        alert('Datos Actualizados')
                        router.push('/dashboard')
                    })
        }
        else{
            alert("Las contraseñas no coinciden");
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
        setUserEdit(JSON.parse(localStorage.getItem("userData")))
        setIsLoading(false)
    },[])
    return(
		<div className="w-full">
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