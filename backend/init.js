require('dotenv').config();
const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || ""
});

console.log(process.env.DB_HOST)

con.connect(function(err) {
    if (err) {
        console.warn(err)
    }
    console.log("Connected!");
    con.query("CREATE DATABASE " + process.env.DB_NAME || "youraichatbot", function (err, result) {
        if (err) {
            console.warn(err)
        }
        console.log("Database created");
    });
});