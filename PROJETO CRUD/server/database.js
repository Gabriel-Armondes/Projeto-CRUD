const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '15052006',  // ← SUBSTITUA AQUI
    database: 'ong',
    connectionLimit: 10
});

pool.getConnection()
    .then(() => console.log('MySQL conectado'))
    .catch(err => {
        console.error('Erro MySQL:', err.message);
        process.exit(1);
    });

module.exports = pool;