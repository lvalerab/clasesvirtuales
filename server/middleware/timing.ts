import {NtpClientHelper} from '../ext/NtpClient';
import moment from "moment";
import colors from 'colors';


export class TimingMiddleWare {
    static InsertTimeRequest(req:any, res:any, next:any) {
        let NClient:NtpClientHelper=new NtpClientHelper();
        NClient.getTimeFirst().then(
            (date:any)=> {
                console.log(`Peticion hecha a las ${date}`);
                req.body.x_start_time=date;
                next();
            }
        ).catch( (err:any) => {
            console.log(colors.bgRed.yellow(`Error al leer la hora de los servidores NTP, causa ${err.message}`));
            res.status(500).json({
                correcto:false,
                mensaje:err.message
            });
        });
    }
}