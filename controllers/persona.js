import Persona from "../models/persona.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../middellware/validar.js";


const personaPost= async (req,res)=>{
    const {email,pasword,nombre,apellido,edad,alias,estado}=req.body
   
    const persona= new Persona({email,pasword,nombre,apellido,edad,alias,estado})

    const salt= bcryptjs.genSaltSync(10)
    persona.pasword=bcryptjs.hashSync(pasword,salt)
    persona.save()
    res.json({
        persona
    }) 
}
const personaLogin= async (req, res)=> {
    const{email,pasword}=req.body 
    const persona= await Persona.findOne({email});
    const validar=bcryptjs.compareSync(pasword,persona.pasword)
    const token=await generarJWT(persona.id);
    res.json({
        persona,
        token
    })
    if (validar)
    res.json({
        persona
    })
    else res.json({
        msg:"no puede "
    })
}

const personaDelete= async(req, res)=> {
    const{email}=req.body
    const persona= await Persona.findOneAndDelete({email});
    res.json ({
        persona
    })
}
 const personaPut=async(req,res)=>{
    const{id}=req.params;
    const{_id,createAt,estado,...resto}= req.body;
    const modificar= await Persona.findByIdAndUpdate(id,resto);
    res.json({
        modificar
    })

 }
 const personaGetId=async(req,res)=>{
    const {id}=req.params
    console.log(id);
    const persona=await Persona.findById(id);
    res.json({
        persona
    })
}
const personaActivar=async (req,res)=>{
    const {id}=req.params;
    const persona= await Persona.findByIdAndUpdate(id,{estado:1})
    res.json({
        persona
    })
}
const personaDesactiva=async (req,res)=>{
    const {id}=req.params;
    const persona= await Persona.findByIdAndUpdate(id,{estado:0})
    res.json({
        persona
    })
}

 const personaMostar=async (req, res) => {
    const persona= await Persona.find();
    res.json({persona})
    
} 


export{personaPost,personaLogin,personaDelete, personaPut,personaGetId,personaActivar,personaDesactiva,personaMostar }

