import { Router } from "express";
import { favoritoPost,favoritoGet } from "../controllers/favoritos.js";
import { validarCampos } from "../middellware/persona.js";
import { check } from "express-validator";
import { validarJWT } from "../middellware/validar.js";

const router=new Router()

router.post('/',[
    check('idPelicula').isMongoId(),
    check('idUsuario').isMongoId(),
    validarCampos


],favoritoPost)
router.get('/get',validarJWT,favoritoGet)

export default router