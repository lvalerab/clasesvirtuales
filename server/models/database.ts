// const Sequelize = require("sequelize");
// const colors = require("colors");
import colors from "colors";
import {Sequelize} from "sequelize-typescript";
/*Importamos los modelos*/
import {Usuario} from "./usuarios";

// const cadenaConexion = `${process.env.DB_TYPE}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_BBDD}`;

const Conexion: any = {
    database: process.env.DB_BBDD,
    dialect: process.env.DB_TYPE,
    username: process.env.DB_USER,
    password: process.env.DB_PASS
};

const sequelize = new Sequelize(Conexion);

sequelize.addModels(
    [Usuario]
);

sequelize
    .authenticate()
    .then(() => {
        console.log(colors.green.bgBlue("Se ha conectado con éxito"));
    })
    .catch(err=> {
        console.log(colors.red.bgYellow("Error al conectarse a la base de datos."));
        console.log(colors.red(`CAUSA: ${err.message}`));
    });
