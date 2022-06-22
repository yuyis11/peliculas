import { Router } from "express";
import { personaPost,personaLogin,personaDelete,personaPut,personaGetId,personaActivar,personaDesactiva,personaMostar} from "../controllers/persona.js";
import {validarCampos} from "../middellware/persona.js"
import { check } from "express-validator";
import helpersUsuarios from "../helpers/persona.js";
import { validarJWT } from "../middellware/validar.js";

const router=new Router()

router.post('/',[
    check('email').not().isEmpty(),
    check('email').isEmail(),
    check('email').custom(helpersUsuarios.existeEmail),
    check('pasword').not().isEmpty(),
    check('pasword').isLength({max:80}),
    check('apellido').not().isEmpty(),
    check('apellido').isLength({max:25}),
    check('nombre','no puede quedar vacio el campo').not().isEmpty(),
    check('nombre').isLength({max:25}),
    check('foto').isLength({min:3}),
    validarCampos


],personaPost);

router.get('/mostrar',[
    validarJWT,
    validarCampos
],personaMostar) 


router.get('/login',personaLogin)
router.delete('/delete',personaDelete)
router.put('/:id',personaPut)
router.get('/:id',[
    check("id").isMongoId(),
    check('id').custom(helpersUsuarios.existeUsuarioById),
    validarCampos
], personaGetId)
router.put('/:id',[
    check('id','ingrese id').not().isEmpty(),
    validarCampos
],personaActivar)
router.put('/desactivar/:id',[
    check('id','ingrese id a desactivar').not().isEmpty(),
    validarCampos
],personaDesactiva)



export default router






