import {Request, Response} from 'express';
import {Controller, Middleware, Get, Put, Post, Delete} from '@overnightjs/core';
import { JwtManager, ISecureRequest } from '@overnightjs/jwt';
import Bluebird = require('bluebird');
import { Grupo } from '../../../models/Grupo';
import { corsMiddleWare } from '../../../middleware/cors';
import {TimingMiddleWare} from '../../../middleware/timing';
import {LogMiddleWare} from '../../../middleware/logs';

@Controller("v1/Grupos")
export class GruposController {

    @Get(':page/:items')
    @Middleware([corsMiddleWare.Cors,TimingMiddleWare.InsertTimeRequest,LogMiddleWare.LogPeticion])
    private GetList(req:Request,res:Response) {
        Grupo.findAndCountAll({
            attributes:['codigo','nombre','createdAt','updatedAt'],
            offset: Number(req.params.page)*Number(req.params.items),
            limit:Number(req.params.items)
        }).then(grupos=>{
            res.status(200).json({
                ok:true,
                resultado:{
                    paginador:{
                        page:Number(req.params.page),
                        elements:Number(req.params.items),
                        total:grupos.count
                    },                    
                    grupos:grupos.rows
                }
            });
        }).catch(err=>{
            res.status(500).json({
                ok:false,
                resultado:{
                    msg:err.message
                }
            });
        })
    }

    @Get(':codigo')
    @Middleware([corsMiddleWare.Cors,TimingMiddleWare.InsertTimeRequest,LogMiddleWare.LogPeticion])
    private GetGrupo(req:Request,res:Response) {
        Grupo.findOne({
            where:{
                'codigo':req.query.codigo
            }
        }).then((grupo)=>{
            if(grupo) {
                res.status(200).json({
                    ok:true,
                    resultado:{
                        grupo:grupo
                    }
                });
            } else {
                res.status(404).json({
                    ok:false,
                    resultado:{
                        msg:'No se ha encontrado ningun dato'
                    }
                });
            }
        }).catch(err=>{
            res.status(500).json({
                ok:false,
                resultado:{
                    msg:err.message
                }
            });
        });
    }
}