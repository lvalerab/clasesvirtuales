import {NTPClient} from 'ntpclient';
import moment from "moment";

export class NtpServer {
    constructor(public dns:string,
                public ip:string,
                public port:string) {

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

    public getTimeFirst():any {
        let Server:NtpServer=this._getNtpServers()[0];
        return this.getTime(Server);
    }
}