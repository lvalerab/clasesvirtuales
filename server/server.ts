import express=require('express');
import colors from "colors";
require('./config/config');

const restServer:express.Application=express();

restServer.get('/',(req:any,res:any)=> {
    res.status(200).send("Hola mundo");
});

restServer.listen(process.env.REST_SERV_PORT,()=> {
    console.log(colors.green.bgBlue(`Servidor escuchando en el puerto ${process.env.REST_SERV_PORT}`));
});