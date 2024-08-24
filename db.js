const mysql= require('mysql2/promise');
require('dotenv').config(); 

// Create a pool of a MySQL connection
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Vansh@2003',
    database: 'schooldb',
    connectionLimit :10,
    port:  3306,

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
