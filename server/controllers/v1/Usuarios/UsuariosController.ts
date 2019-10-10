import {Request, Response} from 'express';
import {Controller, Middleware, Get, Put, Post, Delete} from '@overnightjs/core';
import { JwtManager, ISecureRequest } from '@overnightjs/jwt';
import Bluebird = require('bluebird');
const bcrypt=require('bcrypt');
import { Usuario } from '../../../models/usuarios';
require('../../../config/config');

@Controller('v1/Usuarios')
export class UsuariosController {
    @Get()
    private get(req:Request, res:Response) {
        Usuario.findAll({
            attributes:['id','nombre','mail','createdAt','updatedAt']
        }).then((usuarios:Usuario[]) => {
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

    @Get(':id')
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

    @Post('validate')
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

    @Post() 
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

    @Put()
    @Middleware(JwtManager.middleware)
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
        }).then((usuarioDB)=> {
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
                                usuarioDB.password=bcrypt.hashSync(User.newPass,process.env.ALM_PAWSS_SALT);
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
} 