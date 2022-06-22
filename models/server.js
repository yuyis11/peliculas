import express from "express"
import cors from "cors"
import { dbConnection } from "../database/config.js"
import persona from "../routes/persona.js"
import comentario from "../routes/comentario.js"
import pelicula from "../routes/pelicula.js"
import actores from "../routes/actores.js"
import favoritos from "../routes/favoritos.js"
import fileUpload from "express-fileupload"


class Server{
    constructor(){
        this.app=express()
        this.middlewares()
        this.port=process.env.PORT
        this.conectarBd()
        this.routes()

    }

    routes(){
        this.app.use("/movie/usuario",persona)
        this.app.use("/movie/comentario",comentario)
        this.app.use("/movie/pelicula",pelicula)
        this.app.use("/movie/actor",actores)
        this.app.use("/movie/favorito",favoritos)
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(express.static('public'));
        this.app.use(fileUpload({
            useTempFiles:true,
            tempFileDir:'/tmp/',
            createParentPath:true
        }));
    }
    async conectarBd(){
        await dbConnection()
    }
    escuchar() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        })
    }
}
export {Server}