import mongoose from "mongoose";


const ComentarioSchema = new mongoose.Schema({

    Comen: {
        type: String,
        required: true,
        minlength:3
    },
    idPelicula:{
        type: mongoose.Schema.ObjectId,
        ref:"Pelicula",
        required: true
    },
    idUsuario:{
        type: mongoose.Schema.ObjectId,
        ref:"Persona",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})
export default mongoose.model('Comentario', ComentarioSchema)