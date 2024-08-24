const mysql= require('mysql2/promise');
require('dotenv').config(); 

// Create a pool of a MySQL connection
const connection = mysql.createPool({
    host: process.env.DB_HOST || 'sql12.freemysqlhosting.net',
    user: process.env.DB_USER || 'sql12727646',
    password: process.env.DB_PASSWORD || '8uLzr5dDha',
    database: process.env.DB_NAME || 'sql12727646',
    connectionLimit :process.env.DB_LIMIT || 5,
    port: process.env.DB_PORT || 3306,

}); 


// Connected to MySQL
const testConnection = async () => {
    try {
        const Conn = await connection.getConnection();
        console.log('Connected to MySQL server');
        Conn.release(); // Release the connection back to the pool
    } catch (err) {
        console.error('Error connecting: ' + err.stack);
    }
};
testConnection();
module.exports=connection;
