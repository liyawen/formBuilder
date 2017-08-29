var setting = require('../setting/mysql');
var mysql = require('mysql');
var con = mysql.createConnection(setting);
con.connect();
module.exports = con;
