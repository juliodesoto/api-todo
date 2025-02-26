//Estas son las funciones que interactuan con la base de datos

import dotenv from "dotenv";
dotenv.config();

import postgres from "postgres";

function conectar(){
    return postgres({
        host : process.env.DB_HOST,
        database : process.env.DB_NAME,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD
    });
}


export function leerTareas(){
    return new Promise((ok,ko) => {
        const conexion = conectar();

        conexion`SELECT * FROM tareas ORDER BY id`
        .then( tareas => {
            conexion.end();
            ok (tareas);
        })
        .catch( error => {
            conexion.end();
            ko({error : "error en la base de datos"});
        });
    });
}

export function crearTarea(tarea){
    return new Promise((ok,ko) => {
        const conexion = conectar();

        conexion`INSERT INTO tareas (tarea) VALUES (${tarea}) RETURNING id`
        .then( ([{id}]) => {
            conexion.end();
            ok (id);
        })
        .catch( error => {
            conexion.end();
            ko({error : "error en la base de datos"});
        });
    });
}

/*
crearTarea("hacer algo")
.then(x => console.log(x)) Prueba para crear la tarea, en consola tengo que poner node db.js
.catch(x => console.log(x))
*/


export function borrarTarea(id){
    return new Promise((ok,ko) => {
        const conexion = conectar();

        conexion`DELETE FROM tareas WHERE id = ${id}`
        .then( ({count}) => {
            conexion.end();
            ok (count);
        })
        .catch( error => {
            conexion.end();
            ko({error : "error en la base de datos"});
        });
    });
}


/*
borrarTarea(2)
.then(x => console.log(x)) Prueba para borrar la tarea, en consola tengo que poner node db.js
.catch(x => console.log(x))
*/

export function editarEstado(id){
    return new Promise((ok,ko) => {
        const conexion = conectar();

        conexion`UPDATE tareas SET estado = NOT estado WHERE id = ${id}`
        .then( ({count}) => {
            conexion.end();
            ok (count);
        })
        .catch( error => {
            conexion.end();
            ko({error : "error en la base de datos"});
        });
    });
}

/* editarEstado(2) ----------> Prueba para editar el estado, en consola tengo que poner node db.js
.then(x => console.log(x))
.catch(x => console.log (x))
*/


export function editarTarea(id,tarea){
    return new Promise((ok,ko) => {
        const conexion = conectar();

        conexion`UPDATE tareas SET tarea = ${tarea }WHERE id = ${id}`
        .then( ({count}) => {
            conexion.end();
            ok (count);
        })
        .catch( error => {
            conexion.end();
            ko({error : "error en la base de datos"});
        });
    });
}





