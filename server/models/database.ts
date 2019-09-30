const Sequelize=require('sequelize');
const colors=require('colors');

let cadenaConexion=`${process.env.DB_TYPE}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_BBDD}`;

let sequelize=new Sequelize(cadenaConexion);

import {Usuario} from './usuarios';

sequelize
    .authenticate()
    .then(()=> {
        console.log(colors.green(`Conectado a la base de datos ${process.env.DB_BBDD} de la maquina ${process.env.DB_HOST}`));
        console.log(colors.white(`Inicializando los modelos`));
        Usuario.init(
            Usuario.Estructura,
            sequelize
        );
    })
    .catch((err:any) => {
        console.log(colors.red(`No conectado a la base de datos ${process.env.DB_BBDD} de la maquina ${process.env.DB_HOST}, causa: ${err.message}`))
    });


