var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

var model = {};
	 
	model.allSubjects = function(req,res) {
		if (connection) {
			connection.query('SELECT * FROM subjects ORDER BY id', function(error, rows) {
				if(error) throw error;
				res.status(200).jsonp(rows);
			});
		}
	}

module.exports = model;