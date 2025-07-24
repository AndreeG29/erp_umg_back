import mysql from 'mysql2/promise';


export const db = mysql.createPool({
    host: 'switchyard.proxy.rlwy.net',
    user: 'root',
    password: 'LNAEsCbCBdMXALqscOJQmSzovrydNfMR',
    database: 'railway',
    port:30825
});