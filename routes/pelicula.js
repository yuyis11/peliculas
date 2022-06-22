import { Router } from "express";
import { peliculaPost,peliculaGet,peliculaDelete,peliculaGetId,peliculaGetNombre, peliculaGActor,cargarArchivo }from "../controllers/pelicula.js";
import {validarCampos} from "../middellware/persona.js"
import { check } from "express-validator";
import {helpersPelicula,existeActores} from "../helpers/peliculas.js";
import validarArchivo from "../middellware/validar_existe_archivo.js";
import { validarJWT } from "../middellware/validar.js";


const router=new Router()

router.post('/',peliculaPost)

router.post('/',[
    check('titulo_original','el campo titulo no puede estar vacio').not().isEmpty(),
    check('titulo_original','el campo titulo debe tener minimo 2 caracteres').isLength({max:50}),
    check('titulo_español','el campo titulo en español no puede estar vacio').not().isEmpty(),
    check('titulo_español','el campo titulo en español debe tener minimo 2 caracteres').isLength({max:50}),
    check('fecha_lanzamiento', 'el campo fecha no puede estar vacio').not().isEmpty(),
    check('fecha_lanzamiento','el campo debe ser formato fecha').isDate(),
    check('genero','el campo genero no puede estar vacio').not().isEmpty(),
    check('genero','el campo genero debe tener minimo 4 caracteres').isLength({min:5}),
    check('sinopsis','el campo sinopsis no puede estar vacio').not().isEmpty(),
    check('sinopsis','el campo sinopsis debe tener minimo 10 caracteres').isLength({min:10}),
    check('director','el campo director no puede estar vacio').not().isEmpty(),
    check('director','el campo director debe tener maximo 25 caracteres').isLength({max:25}),
    check('escritor','el campo escritor no puede estar vacio').not().isEmpty(),
    check('escritor','el campo escritor debe tener maximo 50 caracteres').isLength({max:50}),
    check('reparto_principal').custom(existeActores),
    check('estado','el campo estado no puede estar vacio').not().isEmpty(),
    check('estado','el campo estado debe tener minimo 4 caracteres').isLength({max:20}),
    check('idioma_original','el campo idioma original no puede estar vacio').not().isEmpty(),
    check('idioma_original','el campo idioma original debe tener minimo 4 caracteres').isLength({max:20}),
    
    validarCampos
],peliculaPost)

router.get('/get',peliculaGet)

router.get('/id/:id',[
    check("id").isMongoId(),
    check('id').custom(helpersPelicula.peliculasId),
    validarCampos
],peliculaGetId)

router.get('/delete',peliculaDelete)

router.get('/nombre',[

],peliculaGetNombre)
router.get('/buscar/',peliculaGActor)

router.post('/upload/:id',[
     validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPelicula.peliculasId), 
    validarArchivo,
    validarCampos,    
],cargarArchivo)


export default router