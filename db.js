const mysql= require('mysql2/promise');

// Create a pool of a MySQL connection
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Vansh@2003',
    database: process.env.DB_NAME || 'schooldb',
    connectionLimit :process.env.DB_LIMIT || 10
}); 


// Connected to MySQL
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to MySQL server');
        connection.release(); // Release the connection back to the pool
    } catch (err) {
        console.error('Error connecting: ' + err.stack);
    }
};
testConnection();
module.exports=pool;
