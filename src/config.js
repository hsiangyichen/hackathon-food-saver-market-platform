require('dotenv').config();
const config ={
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
    multipleStatements: true,
}
module.exports = config;