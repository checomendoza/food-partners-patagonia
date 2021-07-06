import Axios from 'axios'
const ENDPOINT = "https://api-foodpartnerspatagonia.herokuapp.com/api";
export async function LoginApi(query){
    try{
        const response = await Axios.post(ENDPOINT+'/login', query)
        if(response.data.success==1){
            console.log('DATA USUARIO', response.data.data[0])
            localStorage.setItem('tokenSession', response.data.token)
            localStorage.setItem('userData', JSON.stringify(response.data.data[0]))
        }
        return response
    }
    catch (error){
        console.log('======error', error)
        return error
    }

}

export async function NewUser(query){
    try{
        const response = await Axios.post(ENDPOINT+'/newUser', 
        {
            'ayn': query.ayn,
            'email': query.email,
            'password': query.password,
            'rol': query.rol,
            'id_area': query.id_area
        },
        {headers: {'Authorization': `Bearer ${localStorage.getItem('tokenSession')}`}}
        )
        return response
    }
    catch(error){
        console.log(error)
        return error
    }
}