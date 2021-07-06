import Axios from 'axios'
const ENDPOINT = "https://api-foodpartnerspatagonia.herokuapp.com/api";

export async function getAreas(){
    try{
        const response=await Axios.post(ENDPOINT+'/getAreas')
        if(response.data.success==1){
            return response.data
        }
    }
    catch(error){
        console.log(error)
        return error
    }
}

export async function newArea(nombre){
    try{
        const response = await Axios.post(ENDPOINT+'/newArea', {
            nombre: nombre
        })
        if(response.status == 1){
            return response
        }

    }
    catch(error){
        console.log(error)
        return error
    }
}

export async function deleteArea(id_area){
    try{
        const response = await Axios.post(ENDPOINT+'/deleteArea',{id:id_area});
        if(response.success==1) return response
    }
    catch(error){
        console.log(error)
        return error
    }
}