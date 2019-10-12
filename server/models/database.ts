// const Sequelize = require("sequelize");
// const colors = require("colors");
import colors from "colors";
import {Sequelize} from "sequelize-typescript";
/*Importamos los modelos*/
import { Usuario } from "./usuarios";
import { Grupo } from "./Grupo";
import { GrupoUsuario } from "./GrupoUsuario";
import { Permiso} from "./Permiso";
import { GrupoPermiso } from "./GrupoPermiso";
import { RelacionGrupoPermisoPermiso } from "./RelacionGrupoPermisoPermiso";
import { Accion } from "./Accion";

// const cadenaConexion = `${process.env.DB_TYPE}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_BBDD}`;

const Conexion: any = {
    database: process.env.DB_BBDD,
    dialect: process.env.DB_TYPE,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    define:{
        timestamps:true,
        dialectOptions:{
            useUTC:false //para leer el time zone de la base de datos
        },
        timezone:'+02:00'
    }   
};

const sequelize = new Sequelize(Conexion);

const modelos=[
    Usuario,
    Grupo,
    GrupoUsuario,
    Permiso,
    GrupoPermiso,
    RelacionGrupoPermisoPermiso,
    Accion
];

sequelize.addModels(
    modelos
);

sequelize
    .authenticate()
    .then(() => {
        console.log(colors.bgWhite.blue("Se ha conectado con éxito"));
        console.log(colors.bgWhite.blue("******************************************"));
        console.log(colors.bgWhite.blue("*INICIANDO MANTENIMINETO DE BASE DE DATOS*"));
        console.log(colors.bgWhite.blue("******************************************"));
        for(let i=0;i<modelos.length;i++) {
            console.log(colors.bgWhite.black(`Inicializando el modelo ${modelos[i].name}`))
            try {
                modelos[i].sync();
            } catch(err) {
                console.log(colors.bgRed.yellow(`Error al inicializar el modelo ${modelos[i].name}, causa: ${err.message}`));
                throw err;
            }
        }
    })
    .catch(err=> {        
        console.log(colors.bgRed.yellow(("Error al conectarse a la base de datos.")));
        console.log(colors.bgRed.yellow((`CAUSA: ${err.message}`)));
    });
