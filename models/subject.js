var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

var subjectModel = {};
	 
	subjectModel.getSubjects = function(callback) {
		if (connection) {
			connection.query('SELECT * FROM subjects ORDER BY id', function(error, rows) {
				if(error) throw error;
				else callback(null, rows);
			});
		}
	}

module.exports = subjectModel;