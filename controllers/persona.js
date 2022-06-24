import Persona from "../models/persona.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../middellware/validar.js";
import subirArchivo from "../helpers/subir_archivo.js";


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
    res.json({
        persona})
    
} 
const cargarFoto=async(req,res)=>{
    const{id}=req.params;
    try{
        let nombre
        await subirArchivo(req.files,undefined)
        .then(value=>nombre=value)
        .catch((err)=>console.log(err));

        //persona a la que pertenece la foto
        let persona=await Persona.findById(id);
        if(persona.foto){
            const __dirname=path.dirname(url.fileURLToPath(import.meta.url));
            const pathImage=path.join(__dirname,'../uploads',persona.foto);

            if(fs.existsSync(pathImage)){
                console.log('existe archivo');
                fs.unlinkSycn(pathImage)
            }
        }
        persona=await Persona.findByIdAndUpdate(id,{foto:nombre})
        res.json({
            nombre
        })
    }catch(error){

    }
}


export{personaPost,personaLogin,personaDelete, personaPut,personaGetId,personaActivar,personaDesactiva,personaMostar ,cargarFoto}

