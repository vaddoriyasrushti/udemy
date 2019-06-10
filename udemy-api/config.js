const mysql = require("mysql");

var mysqlconnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "udemy"
});

mysqlconnection.connect(err => {
  if (!err) console.log("DB connection successfully");
  else console.log("faild");
});

module.exports=mysqlconnection