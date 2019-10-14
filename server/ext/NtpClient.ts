import {NTPClient} from 'ntpclient';
import moment from "moment";

export class NtpServer {
    constructor(public dns:string,
                public ip:string,
                public port:string) {

                }
}

export class NtpDateServer {
    constructor(public server:NtpServer,
                public date:Date) {

                }
}

export class NtpClientHelper {
    public ntpServers!:Array<NtpServer>;
    constructor() {
        this.ntpServers=this._getNtpServers();
    }

    private _getNtpServers():Array<NtpServer> {
        let servers:Array<NtpServer> =new Array<NtpServer>();
        let pares:Array<string>=(process.env.SERVER_NTP!=undefined?process.env.SERVER_NTP:"").split(',');
        for(let i=0;i<pares.length;i++) {
            let datServer:Array<string>=pares[i].split('|');
            servers.push(new NtpServer(datServer[0],datServer[1],datServer[2]));
        }
        return servers;
    }

    public getTime(ntpServer:NtpServer):any {      
       return new NTPClient({
           server:ntpServer.dns,
           replyTimeout:40*1000
       })
       .getNetworkTime();
    }

    public getTimeAsync(ntpServer:NtpServer):Promise<NtpDateServer> {
        let that=this;
        return new Promise(function (accept,reject) {
            that.getTime(ntpServer).then(function (date:any) {
                accept(new NtpDateServer(ntpServer,date));
            }).catch((err:any)=>{
                reject(err);
            });
        });
    }

    public async getNtpServerTime():Promise<Array<NtpDateServer>> {
        let resultado:Array<NtpDateServer>=new Array<NtpDateServer>();
        for(let i=0;i<this.ntpServers.length;i++) {
            resultado.push(await this.getTimeAsync(this.ntpServers[i]));
        }
        return resultado;
    }

    public getTimeFirst():any {
        let Server:NtpServer=this._getNtpServers()[0];
        return this.getTime(Server);
    }
}