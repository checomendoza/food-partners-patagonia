import Axios from 'axios'
const ENDPOINT = "https://api-foodpartnerspatagonia.herokuapp.com/api";

export async function getNovedades(id){
    try{
        const response=await Axios.post(ENDPOINT+'/getNovedades', {id_incidencia: id})
        if(response.data.success==1){
        return response.data
        }
    }
    catch(error){
        console.log(error)
        return error
    }
}