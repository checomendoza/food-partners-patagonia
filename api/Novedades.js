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

export async function newNovedadDeriva(query){
    try{
        const response = await Axios.post(ENDPOINT+'/newNovedad',{
            id_tipo: query.id_tipo,
            id_area: query.id_area,
            id_area_deriva: query.id_area_deriva,
            id_user: query.id_user,
            id_incidencia: query.id_incidencia,
            comentarios : query.comentarios,
            descripcion: query.descripcion
        })
        return response
    }
    catch(error){
     console.log(error)
     return error       
    }
}
export async function newNovedadAccion(query){
    try{
        const response = await Axios.post(ENDPOINT+'/newNovedad',{
            id_tipo: query.id_tipo,
            id_user: query.id_user,
            id_area: query.id_area,
            id_incidencia: query.id_incidencia,
            descripcion: query.descripcion,
            plazo: query.plazo,
        })
        return response
    }
    catch(error){
     console.log(error)
     return error       
    }
}