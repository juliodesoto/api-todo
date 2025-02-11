import dotenv from "dotenv";
dotenv.config();

import express from "express";
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

servidor.delete("/tareas/borrar/:id", (peticion,respuesta) => {
    respuesta.send("DELETE/tareas/borrar/:id");
});

servidor.PUT("/tareas/editar/estado/:id", (peticion,respuesta) => {
    respuesta.send("tareas/editar/estado/:id");
});

servidor.PUT("/tareas/editar/texto/:id", (peticion,respuesta) => {
    respuesta.send("tareas/editar/texto/:id");
});






servidor.listen(process.env.PORT);