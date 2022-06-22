import { Router } from "express";
import { favoritoPost,favoritoGet } from "../controllers/favoritos.js";
import { validarCampos } from "../middellware/persona.js";
import { check } from "express-validator";

const router=new Router()

router.post('/',[
    check('idPelicula').isMongoId(),
    check('idUsuario').isMongoId(),
    validarCampos


],favoritoPost)
router.get('/get',favoritoGet)

export default router