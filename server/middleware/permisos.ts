import { ISecureRequest } from "@overnightjs/jwt";
import { Response, NextFunction} from "express";
import { GrupoPermiso } from "../models/GrupoPermiso";
import { Usuario } from "../models/usuarios";
import {Accion} from "../models/Accion";

export class PermisosMiddleWare {
    static GetGroupsUserValidate(req:ISecureRequest, res:Response, next:NextFunction) {
        if(req.payload.id) {            
            Usuario.findOne({
                where:{
                    id:req.payload.id
                }
            }).then((usuario)=> {
                req.body.usuario=usuario;
                Accion.findAll({
                    where:{
                        idUsuario:req.payload.id
                    }
                }
                ).then(function(acciones:any) {
                    req.body.usuario.acciones=acciones;
                    next();
                }).catch(function(err:any) {
                    req.body.usuario={};
                    next();
                });
            }).catch((err)=>{
                req.body.usuario={};
                next();
            })
        } else {
            req.body.usuario={};
            next();
        }
    }
}