import {Request, Response} from 'express';
import {Controller, Middleware, Get, Put, Post, Delete} from '@overnightjs/core';
import { Usuario } from '../../../models/usuarios';
import Bluebird = require('bluebird');

@Controller('v1/Usuarios')
export class UsuariosController {
    @Get()
    private get(req:Request, res:Response) {
        Usuario.findAll().then((usuarios:Usuario[]) => {
            res.status(200).json({
                ok:true,
                resultado:{
                    usuarios
                }
            });
        }).catch((err)=> {
            res.status(500).json({
                ok:false,
                resultado:{
                    msg:err.message
                }
            })
        });
    }
}