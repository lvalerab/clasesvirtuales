import {Request, Response} from 'express';
import {Controller, Middleware, Get, Put, Post, Delete} from '@overnightjs/core';
import { JwtManager, ISecureRequest } from '@overnightjs/jwt';
import { TimingMiddleWare } from '../../../middleware/timing';
import { LogMiddleWare } from '../../../middleware/logs';
import { PermisosMiddleWare } from '../../../middleware/permisos';
import { corsMiddleWare } from '../../../middleware/cors';
import { NtpDateServer, NtpClientHelper } from '../../../ext/NtpClient';
import { NTPClient } from 'ntpclient';

@Controller('v1/Utils/Time')
export class TimingController {

    @Get()
    private async GetTime(req:Request,res:Response) {
        let datos:Array<NtpDateServer>=await new NtpClientHelper().getNtpServerTime();
        res.status(200).json({
            ok:true,
            respuesta:{
                datos:datos
           }
        });
    }
}