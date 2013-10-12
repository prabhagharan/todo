var db = require('./dbconfig.js');

exports.addUser = function(req, callback){
	var UserEmail = req.body.UserEmail;
	var UserName = req.body.UserName;
	var UserPassword = req.body.UserPassword;		
	var query = 'INSERT INTO todo_users (user_email, user_name, user_password) values ("'+UserEmail+'","'+UserName+'","'+UserPassword+'")';
	console.log(query);
	db.connection.query(query, callback);
}

exports.authenticate = function(req, callback){
	var UserEmail = req.body.UserEmail;
	var query = 'SELECT * from todo_users where user_email = "'+UserEmail+'"';
	console.log(query);
	db.connection.query(query, callback);
}
