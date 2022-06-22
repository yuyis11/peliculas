import mongoose from "mongoose";
import actores from "../models/actores.js";
import Pelicula from "../models/pelicula.js"

const helpersPelicula={
    peliculasId : async (id) => {

        const existe = await Pelicula.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    }
}
const existeActores= async(reparto_principal)=>{
    for(let i =0; i< reparto_principal.length; i++){
        const element=reparto_principal[i];
        const validarId=mongoose.Types.ObjectId(element.idActor);
        if(!validarId){
            throw new Error('el ID no existe')
        }

        const existe=await actores.findById(element.idActor);
        if(!existe){
            throw new Error('el reparto no existe ')
        }

    }
}
 
export { helpersPelicula,existeActores}