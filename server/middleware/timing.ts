import moment from "moment";


export class TimingMiddleWare {
    static InsertTimeRequest(req:any, res:any, next:any) {
        let ahora=moment.now();
        req.headers("x-start-time",ahora);
        next();
    }
}