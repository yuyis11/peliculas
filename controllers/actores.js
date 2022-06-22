
import Actor from "../models/actores.js"

const actoresPost= async (req,res)=>{

    const {nombre,foto,biografia}= req.body
    const actores= new Actor({nombre,foto,biografia})
    actores.save()
    res.json({
       actores
    }) 


}
const actoresGet=async(req,res)=>{
    const actores= await Actor.find();
    res.json({
        actores
    })
}
const actoresGetId= async (req,res)=>{
    const {id}=req.body
    const actores=await Actor.findById(id)
    res.json({
        actores
    })
}

export{actoresPost,actoresGet,actoresGetId} 