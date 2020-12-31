const sql = require('mysql');
const inquirer = require('inquirer');
const connection = sql.createConnection({
    host: "localhost",
    
    port: 3306,
   
    user: "root",
    
    password: "password",
    database: "employee_db"
});
