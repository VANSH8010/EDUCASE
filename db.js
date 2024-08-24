const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Vansh@2003',
    database: process.env.DB_NAME || 'schooldb'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    }
    else {
        console.log("connected to mysql");
    }
});
