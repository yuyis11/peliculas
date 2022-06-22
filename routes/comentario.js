import { Router } from "express";
import {comentarioPost,  cometarioGet } from "../controllers/comentario.js";
import { validarCampos } from "../middellware/persona.js";
import { check } from "express-validator";
const router=new Router()

router.post('/',[
    check('Comen','no puede estar vacio').not().isEmpty(),
    check('Comen','no puede ser menor a 3').isLength({min:3}),
    check('idPelicula').isMongoId(),
    check('idUsuario').isMongoId(),
    validarCampos



],comentarioPost)
router.get('/get',cometarioGet)



export default router