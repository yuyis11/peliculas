import { Router } from "express";
import { actoresGet, actoresGetId, actoresPost } from "../controllers/actores.js";
import { validarCampos } from "../middellware/persona.js";
import { check } from "express-validator";
import { validarJWT } from "../middellware/validar.js";



const router=new Router()

router.post('/',[
    check('nombre','el campo nombre no puede estar vacio').not().isEmpty(),
    check('foto', 'la imagen es obligatoria').not().isEmpty(),
    check('biografia','el campo biografia debe swer mayot a 6').isLength({min:6}),
    validarCampos
],actoresPost)
router.get('/get',validarJWT,actoresGet)
router.delete('/id',validarJWT,actoresGetId)

export default router