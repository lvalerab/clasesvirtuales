/****************************************************
 *
 * FICHERO DE CONFIGURACION DEL SERVIDOR
 *
 */
///////////////////////////////////////////////////////////////
//RUTA DE LOGS
///////////////////////////////////////////////////////////////
process.env.RUTA_REL_LOG=process.env.RUTA_REL_LOG||'../../logs';


///////////////////////////////////////////////////////////////
//ENCRIPTADO DE PASSWORDS Y JWT
///////////////////////////////////////////////////////////////
process.env.ALM_PAWSS_SALT='10';

process.env.JWT_SECRET="JWT_SECRET_PASSWR";

process.env.JWT_EXPIRATION="1h";

///////////////////////////////////////////////////////////////
//NTP clients
///////////////////////////////////////////////////////////////
process.env.SERVER_NTP=process.env.SERVER_NTP||'hora.roa.es|150.214.94.5,minuto.roa.es|150.214.94.10,hora.rediris.es|130.206.3.166,cuco.rediris.es|130.206.0.1';

 //////////////////////////////////////////////////////////////
 // REST server
 //////////////////////////////////////////////////////////////
 process.env.REST_SERV_PORT=process.env.REST_SERV_PORT||"3000";

 //////////////////////////////////////////////////////////////
 // Cadena de conexion
 //////////////////////////////////////////////////////////////
 process.env.DB_TYPE = process.env.DB_TYPE || "mariadb"; // Puede ser mysql, sqlite, postgres y Ms Server, ver sequlize

 // User
 process.env.DB_USER = process.env.DB_USER || "root";
 // Password
 process.env.DB_PASS = process.env.DB_PASS || "1234";
 // Host
 process.env.DB_HOST = process.env.DB_HOST || "localhost";
 // Puerto
 process.env.DB_PORT = process.env.DB_PORT || "3306";
 // Base de datos
 process.env.DB_BBDD = process.env.DB_BBDD || "TUTV";
