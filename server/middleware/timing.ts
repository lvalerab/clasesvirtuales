import {NtpClientHelper} from '../ext/NtpClient';
import moment from "moment";


export class TimingMiddleWare {
    static InsertTimeRequest(req:any, res:any, next:any) {
        let NClient:NtpClientHelper=new NtpClientHelper();
        NClient.getTimeFirst().then(
            (date:any)=> {
                console.log(`Peticion hecha a las ${date}`);
                req.x_start_time=date;
                next();
            }
        ).catch( (err:any) => {
            console.log(`Error al leer la hora de los servidores NTP, causa ${err.message}`);
            res.status(500).json({
                correcto:false,
                mensaje:err.message
            });
        });
    }
}