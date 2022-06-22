import mongoose from "mongoose";

const PersonaSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    pasword: {
        type: String,
        maxlength: 80,
        required: true
    },
    apellido: {
        type: String,
        maxlength: 25,
        required: true
    },
    nombre: {
        type: String,
        maxlength: 25,
        required: true
    },
    edad: {
        type: Number,
        required: true,
        default: 0
    },

    alias: {
        type: String,
        maxlength: 8,
        default: "anonimo"

    },
    
    estado:{
        type:Number,
        required:true,
        default:1
    },
    foto:{
        type: String,
        default: ""
       
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})
export default mongoose.model('Persona', PersonaSchema)