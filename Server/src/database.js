const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./key');
const pool = mysql.createPool(database)

pool.getConnection((err, conn)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST') console.error('database conection was closed');
        else if(err.code === 'ER_CON_COUNT_ERROR') console.error('Database has to many connections');
        else if(err.code === 'ECONNREFUSED') console.error('Database Connection was refused');
    }
    else {
        conn.release()
        console.log('BD connected')
    }
    return;
});

pool.query = promisify(pool.query)
module.exports = pool;
