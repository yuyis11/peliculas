import Pelicula from "../models/pelicula.js";
import subirArchivo from "../helpers/subir_archivo.js";

const peliculaPost= async (req,res)=>{

    const {titulo_original,titulo_español,fecha_lanzamiento,genero,calificacion,sinopsis,director,escritor,reparto_principal,estado,idiomaOriginal,presupuesto,ingresos}= req.body
    const pelicula= new Pelicula({titulo_original,titulo_español,fecha_lanzamiento,genero,calificacion,sinopsis,director,escritor,reparto_principal,estado,idiomaOriginal,presupuesto,ingresos})
    pelicula.save()
    res.json({
        pelicula
    }) 


}
const peliculaGet=async(req,res)=>{
    const pelicula=await Pelicula.find();
    res.json({
        pelicula
    })
}
const peliculaGetId=async(req,res)=>{
    const {id}=req.params
    console.log(id);
    const pelicula=await Pelicula.findById(id);
    res.json({
        pelicula
    })
}
const peliculaDelete=async(req,res)=>{
    const {titulo_original}=req.body
    const pelicula=await Pelicula.findOneAndDelete({titulo_original})
    res.json({
        msg:"acabas de eliminar la pelicula"
    })
}

const peliculaGetNombre =async(req,res)=>{
    const {titulo}=req.query
    const pelicula= await Pelicula.find({$or:[
        {titulo_original: new RegExp(titulo,"i")},
       { titulo_español:new RegExp(titulo,"i")}
    ]})
    res.json({
        pelicula
    })
}
const peliculaGActor =async(req,res)=>{
    const {id}=req.body;
    const pelicula= await Pelicula.find().where('reparto_principal.idActor').in(id).exec();
    res.json({
        pelicula
    })
}
const cargarArchivo= async (req, res) => {
    const { id } = req.params;
    try {
        let nombre
        await subirArchivo(req.files, undefined)
            .then(value => nombre = value)
            .catch((err) => console.log(err));

        //persona a la cual pertenece la foto
        let pelicula = await Pelicula.findById(id);
        if (pelicula.foto) {
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            const pathImage = path.join(__dirname, '../uploads/', pelicula.foto);
            
            if (fs.existsSync(pathImage)) {
                console.log('Existe archivo');
                fs.unlinkSync(pathImage)
            }
            
        }
       
        pelicula = await Pelicula.findByIdAndUpdate(id, { foto: nombre })
        //responder
        res.json({ nombre });
    } catch (error) {
        res.status(400).json({ error, 'general': 'Controlador' })
    }

}

export{peliculaPost,peliculaGet,peliculaDelete,peliculaGetId,peliculaGetNombre,peliculaGActor,cargarArchivo}