var login = require('../models/login.js');

exports.showLoginForm = function(req, res){
	res.render("loginForm");
}

exports.signup = function(req, res){
	login.addUser(req, function(err, results){
		console.log("results - "+results);
		res.json(results);
	});
}

exports.authenticate = function(req, res){
	login.authenticate(req, function(err, results){
		console.log(results[0]);
		if(results[0]!==undefined && req.body.UserPassword==results[0].user_password){
			req.session.authenticated = 'true';
			req.session.userID = results[0].user_id;
			res.cookie('userid', results[0].user_id, { maxAge: 900000, httpOnly: false});
			res.cookie('username', results[0].user_name, { maxAge: 900000, httpOnly: false});
			res.json({message: "authenticated",user_id: results[0].user_id});
		}
		else{
			res.json({message: "not authenticated"});
		}
	});
}

exports.logout = function(req, res){
	req.session.destroy();
	res.render("loginForm");
}
