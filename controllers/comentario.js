import Comentario from "../models/comentario.js";


const comentarioPost= async (req,res)=>{

    const {Comen,idPelicula,idUsuario}= req.body
    const comentario= new Comentario({Comen,idPelicula,idUsuario})
    comentario.save()
    res.json({
        comentario
    }) 


}


const cometarioGet=async(req,res)=>{
    const {idUsuario}=req.body
    const comentario= await Comentario.find({idUsuario})
    .populate("idUsuario",["nombre"])
    .populate("Comen",["Comen"])
    res.json({
        comentario
    }) 

}




export{comentarioPost,cometarioGet}
