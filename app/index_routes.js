require('../models/subject.js');
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

module.exports = function(app) {
	
	connection.query('USE ' + dbconfig.database);

	var Model = {};	
	app.get('/teachers',function(req,res){
		if (connection) {
			connection.query('SELECT * FROM subjects ORDER BY id', function(error, rows) {
				if(error) throw error;
				else console.log(rows);
			});
		}
		res.render('../views/index.html');
	});


}