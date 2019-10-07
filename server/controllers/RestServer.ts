import * as bodyParser from 'body-parser';
import {Server} from '@overnightjs/core';
import { UsuariosController } from './v1/Usuarios/UsuariosController';
import colors from 'colors';
import path from 'path';
import express from 'express';


export class RestServer extends Server {
    constructor() {
        super(process.env.NODE_ENV==='development');
        //Configuracion de los middleware
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:true}));
        this.app.use(express.static(path.resolve(__dirname,`../web`)));
        this.setupControllers();
    }

    private setupControllers():void {
        const usuarioController=new UsuariosController();

        super.addControllers([
            usuarioController
        ]);
    }

    public start(port:number):void {
        this.app.listen(port,()=>{
            console.log(colors.green.bgBlue(`Se ha iniciado el servidor en el puerto ${port}`));
        });
    }
}