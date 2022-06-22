import mongoose from "mongoose";

const ActoresSchema = new mongoose.Schema({ 

    nombre:{
        type: String,
        required: true
    },
    foto:{
        type: String,
        required: true
    },
    biografia:{
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})
export default mongoose.model('Actor', ActoresSchema)