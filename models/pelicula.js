import mongoose from "mongoose";


const PeliculaSchema = new mongoose.Schema({
    titulo_original: {
        type: String,
        maxlength: 25,
        required: true

    },
    titulo_español: {
        type: String,
        maxlength: 25,
        required: true

    },
    fecha_lanzamiento: {
        type: Date,
        required: true

    },
    genero: {
        type: String,
        minlength: 5,
        required: true

    },

    calificacion: {
        type: Number,
        default: 0
    },
    sinopsis: {
        type: String,
        minlength: 10,
        required: true
    },

    director: {
        type: String,
        required: true,
        maxlength: 25
    },
    escritor: {
        type: String,
        required: true,
        maxlength: 50
    },
    reparto_principal: [
        {
            idActor: {
                type: mongoose.Schema.ObjectId,
                ref: "Actor",
                required: true
            },
            personaje:{type:String,required:true}

        }
    ],
    estado: {
        type: String,
        required: true,
        maxlength: 50

    },
    estado: {
        type: String,
        required: true,
        maxlength: 20
    },
    idiomaOriginal:{
        type: String,
        required: true,
        minlength: 2
    },
    presupuesto: {
        type: Number,
        default: 0
    },
    ingresos: {
        type: Number,
        default: 0
    },
    foto: {
        type: String,
        
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})
export default mongoose.model('Pelicula', PeliculaSchema)