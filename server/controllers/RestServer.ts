import * as bodyParser from 'body-parser';
import {Server} from '@overnightjs/core';
import { UsuariosController } from './v1/Usuarios/UsuariosController';
import { GruposController } from './v1/Grupos/GruposController';
import {TimingController} from './v1/Utils/TimeController';
import fs from 'fs';
import colors from 'colors';
import path from 'path';
import express from 'express';



export class RestServer extends Server {
    private crt!:string;
    private key!:string;

    constructor() {
        super(process.env.NODE_ENV==='development');
        //Configuracion de los middleware
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:true}));
        this.app.use(express.static(path.resolve(__dirname,`../web`)));
        this.setupControllers();
    }

    private setupSSLOptions():any {
        if(process.env.REST_SERV_CERT_CRT && process.env.REST_SERV_CERT_KEY) {
            this.crt=fs.readFileSync(path.resolve(__dirname,process.env.REST_SERV_CERT_CRT?process.env.REST_SERV_CERT_CRT:"")).toString();
            this.key=fs.readFileSync(path.resolve(__dirname, process.env.REST_SERV_CERT_KEY?process.env.REST_SERV_CERT_KEY:"")).toString();
            return {
                key:this.key,
                cert:this.crt
            };
        } else {
            return null;
        }
    }

    private setupControllers():void {
        const usuarioController=new UsuariosController();
        const gruposController=new GruposController();
        const timingController=new TimingController();

        super.addControllers([
            usuarioController,
            gruposController,
            timingController
        ]);
    }

    public start(port:number):void {
        this.app.listen(port,()=>{
            console.log(colors.green.bgBlue(`Se ha iniciado el servidor en el puerto ${port}`));
        });
    }
}