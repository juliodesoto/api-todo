import dotenv from "dotenv";
dotenv.config();

import express from "express";
import {leerTarea,crearTarea,borrarTarea,editarEstado,editarTarea} from "./db.js"
const servidor = express();

if(process.env.PRUEBAS){
    servidor.use("/pruebas", express.static("./pruebas"));
}

servidor.get("/tareas", (peticion,respuesta) => {
    respuesta.send("GET/tareas");
});

servidor.post("/tareas/nueva", (peticion,respuesta) => {
    respuesta.send("POST/tareas/nueva");
});

servidor.delete("/tareas/borrar/:id([0-9]+)", (peticion,respuesta) => {
    respuesta.send("DELETE/tareas/borrar/:id");
});

servidor.put("/tareas/editar/texto/:id([0-9]+)", (peticion,respuesta) => {
    respuesta.send("PUT/tareas/editar/texto/:id");
});

servidor.put("/tareas/editar/estado/:id([0-9]+)", (peticion,respuesta) => {
    respuesta.send("PUT/tareas/editar/estado/:id");
});

servidor.use((peticion,respuesta) => {
    respuesta.status(404);
    respuesta.json({error : "recurso no encontrado"});
});


servidor.listen(process.env.PORT);