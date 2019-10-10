import {Request, Response} from 'express';
import {Controller, Middleware, Get, Put, Post, Delete} from '@overnightjs/core';
import { JwtManager, ISecureRequest } from '@overnightjs/jwt';
import Bluebird = require('bluebird');
const bcrypt=require('bcrypt');
import { Usuario } from '../../../models/usuarios';
import { TimingMiddleWare } from '../../../middleware/timing';
import { LogMiddleWare } from '../../../middleware/logs';
import { PermisosMiddleWare } from '../../../middleware/permisos';
require('../../../config/config');

@Controller('v1/Usuarios')
export class UsuariosController {

    /*
    Obtiene los usuarios
    */
    @Get(':page/:items')
    @Middleware([TimingMiddleWare.InsertTimeRequest,LogMiddleWare.LogPeticion])
    private get(req:Request, res:Response) {
        Usuario.findAndCountAll({
            attributes:['id','nombre','mail','createdAt','updatedAt'],
            offset: Number(req.params.page)*Number(req.params.items),
            limit:Number(req.params.items)
        }).then((result) => {

            res.status(200).json({
                ok:true,
                resultado:{
                    paginador:{
                        page:Number(req.params.page),
                        elements:Number(req.params.items),
                        total:result.count
                    },                    
                    usuarios:result.rows
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

    /*
        Obtiene los datos de un usuario dado
    */
    @Get(':id')
    @Middleware([TimingMiddleWare.InsertTimeRequest,LogMiddleWare.LogPeticion])
    private GetID(req:Request, res:Response) {
        let id:any=Number(req.params.id);
        Usuario.findOne({
            attributes:['id','nombre','mail','createdAt','updatedAt'],
            where:{
                id:id
            }
        }).then((valor)=> {
            if(valor) {
                res.status(200).json({
                    ok:true,
                    resultado:{
                        usuario:valor
                    }
                });
            } else {
                res.status(404).json({
                    ok:false,
                    resultado:{
                        msg:'Usuario no encontrado'
                    }
                })
            }
        }).catch((err:any)=>{
           res.status(500).json({
                ok:false,
                resultado:{
                    msg:err.message
                }
           });
        });
    }

    /*
    Valida los datos de un usuario y genera un token
    */
    @Post('validate')
    @Middleware([TimingMiddleWare.InsertTimeRequest,LogMiddleWare.LogPeticion])
    private Validate(req:Request,res:Response) {
        Usuario.findOne({
            where:{
                mail:req.body.mail
            }
        }).then(usuario=>{
            if(usuario) {
                bcrypt.compare(req.body.password,usuario.password, function(err:any, correcto:any) {
                    if(correcto) {
                        const jwtStr:string=JwtManager.jwt({
                            id:usuario.id
                        });
                        res.status(200).json({
                            ok:false,
                            resultado:{
                               token:jwtStr,
                               usuario:{
                                   nombre:usuario.nombre
                               }
                            }
                        });
                    } else {
                        res.status(403).json({
                            ok:false,
                            resultado:{
                                msg:'El mail (o password) no existe'
                            }
                        });
                    }
                });
            } else {
                res.status(404).json({
                    ok:false,
                    resultado:{
                        msg:"El mail (o password) no existe"
                    }
                });
            }
        })
    }

    /*
    Crea un nuevo usuario
    */
    @Post() 
    @Middleware([TimingMiddleWare.InsertTimeRequest,LogMiddleWare.LogPeticion])
    private async NewUsuario(req:Request,res:Response) {
        console.log(req.body);        
        bcrypt.hash(req.body.password, Number(process.env.ALM_PAWSS_SALT), function(err:any, hash:any) {
            if(err) {
                res.status(500).json({
                    ok:false,
                    respuesta:{
                        msg:err.message
                    }
                });
            } else {
                let datos:any={
                    nombre:req.body.nombre,
                    mail:req.body.mail,
                    password: hash,
                    LogonType:'BY_LOCAL'
                };
                let User:Usuario=Usuario.build(datos);
                User.save().then(newUser=> {
                    const jwtStr:string=JwtManager.jwt({
                        id:newUser.id
                    });
                    res.status(200).json({
                        ok:true,
                        respuesta:{
                            token:jwtStr,
                            usuario:{
                                nombre:newUser.nombre
                            }
                        }
                    });
                }).catch(err=> {
                    res.status(500).json({
                        ok:false,
                        respuesta:{
                            msg:err.message
                        }
                    });
                });
            }
        })
        
    }

    /*
    Actualiza un usuario (ahora mismo debe ser el mismo que se identifica)
    */
    @Put()
    @Middleware([JwtManager.middleware,TimingMiddleWare.InsertTimeRequest,LogMiddleWare.LogPeticion, PermisosMiddleWare.GetGroupsUserValidate])
    private UpdateUser(req:ISecureRequest,res:Response) {
        let User:any={
            id:req.body.id,
            nombre:req.body.nombre,
            oldPass:req.body.oldPass,
            newPass:req.body.newPass
        };
        Usuario.findOne({
            where:{
                id:User.id
            }
        }).then(function (usuarioDB) {
            if(usuarioDB) {
                if(usuarioDB.id==req.payload.id) {
                    usuarioDB.nombre=User.nombre;
                    if(User.oldPass && User.newPass) {
                        bcrypt.compare(User.oldPass,usuarioDB.password,function(err:any,correcto:any) {
                            if(err) {
                                res.status(403).json({
                                    ok:false,
                                    respuesta:{
                                        msg:'El password anterior no es correcto'
                                    }
                                })
                            } else {
                                bcrypt.hash(User.newPass, Number(process.env.ALM_PAWSS_SALT), function(err:any,hash:string) {
                                    if(err) {
                                        res.status(500).json({
                                            ok:false,
                                            respuesta:{
                                                msg:err.message
                                            }
                                        });
                                    } else {
                                        usuarioDB.password=hash;
                                        usuarioDB.save().then(usuarioAct=> {
                                            res.status(200).json({
                                                ok:true,
                                                respuesta:{
                                                    usuario:usuarioAct
                                                }
                                            });
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        usuarioDB.save().then(usuarioAct=> {
                            res.status(200).json({
                                ok:true,
                                respuesta:{
                                    usuario:usuarioAct
                                }
                            });
                        });
                    }
                } else {
                    res.status(403).json({
                        ok:false,
                        respuesta:{
                            msg:'No tiene permisos para modificar este usuario'
                        }
                    })
                }
            } else {
                res.status(404).json({
                    ok:false,
                    respuesta:{
                        msg:'Usuario no encontrado'
                    }
                })
            }
        }).catch(err => {
            res.status(404).json({
                ok:false,
                respuesta:{
                    msg:'Usuario no encontrado'
                }
            });
        });
    }

    /*
    Marca un usuario como eliminado
    */
    @Delete(':id/soft')
    @Middleware([JwtManager.middleware,TimingMiddleWare.InsertTimeRequest,LogMiddleWare.LogPeticion, PermisosMiddleWare.GetGroupsUserValidate])
    private DeleteSoftUser(req:ISecureRequest,res:Response) {
        Usuario.findOne({
            where:{
                id:Number(req.params.id)
            }
        }).then(usuarioBD=> {
            if(usuarioBD) {
                usuarioBD.destroy();
                res.status(200).json({
                    ok:true,
                    respuesta:{
                        msg:'Usuario eliminado con éxito'
                    }
                });
            } else {
                res.status(404).json({
                    ok:true,
                    respuesta:{
                        msg:'Usuario no encontrado'
                    }
                });
            }
        }).catch(err=> {
            res.status(500).json({
                ok:false,
                respuesta:{
                    msg:err.message
                }
            });
        });
    }

    /*
    Elimina definitivamente un usuario
    */
    @Delete(':id')
    @Middleware([JwtManager.middleware,TimingMiddleWare.InsertTimeRequest,LogMiddleWare.LogPeticion, PermisosMiddleWare.GetGroupsUserValidate])
    private DeleteUser(req:ISecureRequest,res:Response) {
        Usuario.findOne({
            where:{
                id:Number(req.params.id)
            }
        }).then(usuarioBD=> {
            if(usuarioBD) {
                usuarioBD.destroy({
                    force:true
                });
                res.status(200).json({
                    ok:true,
                    respuesta:{
                        msg:'Usuario eliminado con éxito'
                    }
                });
            } else {
                res.status(404).json({
                    ok:true,
                    respuesta:{
                        msg:'Usuario no encontrado'
                    }
                });
            }
        }).catch(err=> {
            res.status(500).json({
                ok:false,
                respuesta:{
                    msg:err.message
                }
            });
        });
    }
} 