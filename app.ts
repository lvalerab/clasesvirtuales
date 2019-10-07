// const colors = require("colors");
import colors from "colors";
// require("./server/config/config");
import "./server/config/config";
// require("./server/models/database");
import "./server/models/Database";
import {RestServer} from "./server/controllers/RestServer";

const app:RestServer=new RestServer();

app.start(Number(process.env.REST_SERV_PORT));

console.log(colors.red(`Iniciado`));
