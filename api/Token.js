import Axios from 'axios'
export async function checkToken(){
    const ENDPOINT = "https://api-foodpartnerspatagonia.herokuapp.com/api/checkToken";
     if(localStorage.getItem('tokenSession')){
        try{
            const response = await Axios.post(ENDPOINT, {}, {headers: {'Authorization': `Bearer ${localStorage.getItem('tokenSession')}`}})
            return response
        } 
        catch(error){
            return error
        }   
    }
    else
    {
        return false
    }
}