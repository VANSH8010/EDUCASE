const mysql= require('mysql2/promise');
require('dotenv').config(); 

// Create a pool of a MySQL connection
const connection = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Vansh@2003',
    database: process.env.DB_NAME || 'schooldb',
    connectionLimit :process.env.DB_LIMIT || 10,
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
