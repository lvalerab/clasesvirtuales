import express=require('express');
import colors from "colors";
import path from "path";
import {TimingMiddleWare} from "./middleware/timing";
import {LogMiddleWare} from "./middleware/logs";

require('./config/config');

const restServer:express.Application=express();

//restServer.use(express.static(path.resolve(__dirname,`../web`)));
//

restServer.get('/',[TimingMiddleWare.InsertTimeRequest, LogMiddleWare.LogPeticion],  (req:any,res:any)=> {
    res.status(200).send("Hola mundo");
});

restServer.listen(process.env.REST_SERV_PORT,()=> {
    console.log(colors.white.bgGreen(`Servidor escuchando en el puerto ${process.env.REST_SERV_PORT}`));
});