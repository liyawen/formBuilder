var setting = require('../settings/mysql');
var mysql = require('mysql');
var con = mysql.createConnection(setting);
con.connect();
module.exports = con;