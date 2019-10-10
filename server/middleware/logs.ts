import {Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import path from 'path';
require('../config/config');

export class LogMiddleWare {
    static LogPeticion(req:Request, res:Response, next:NextFunction) {
        console.log("Entra al middleware de logs");
        let ruta=path.resolve(__dirname, process.env.RUTA_REL_LOG?process.env.RUTA_REL_LOG:"../logs");
        fs.exists(ruta,(existe)=> {
            if(!existe) {
                console.log(`No existe la ruta ${ruta}, la crea`);
                fs.mkdirSync(ruta);
            };
            fs.open(ruta + "/log_peticiones.log",'as',(err,fd) => {
                if(err) {
                    console.log(`Error al escribir el log ${err.message}`);
                } else {
                    fs.writeSync(fd,"============== PETICION ==================\n");
                    fs.writeSync(fd,"PARAMS:");
                    fs.writeSync(fd,JSON.stringify(req.params));
                    fs.writeSync(fd,"HEADERS:")
                    fs.writeSync(fd,JSON.stringify(req.headers));
                    fs.writeSync(fd,"BODY:");
                    fs.writeSync(fd,JSON.stringify(req.body));
                    fs.writeSync(fd,"==============  FIN PETICION ==================\n");
                    fs.closeSync(fd);
                }
            });
        });
        next();
    }
}
