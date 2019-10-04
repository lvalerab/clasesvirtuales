/****************************************************
 *
 * FICHERO DE CONFIGURACION DEL SERVIDOR
 *
 */
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
