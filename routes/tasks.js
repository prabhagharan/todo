var task = require('../models/tasks.js');

exports.taskslist = function(req, res){
	console.log("req.params.id="+req.params.id+" req.session.userID"+req.session.userID);
	/*if(req.session.userID !== undefined && req.session.userID == req.params.id)
		res.render("tasks");
	else
		res.render("othertasks");*/
	if(req.session.userID !== undefined){
		task.checkUserToProject(req, function(err, results){
			if(results[0] !== undefined)
				res.render("tasks");
			else
				res.render("othertasks");
		});
	}
	else
		res.render("othertasks");

}

exports.taskslistjson = function(req, res){
	task.getProjectTasksList(req, function(err, results){
		console.log("results - "+results);
		res.json(results);
	});
}

exports.addTask = function(req, res){
	task.addTask(req, function(err, results){
		console.log("results - "+results);
		res.json(results);
	});
}
exports.editTask = function(req, res){
	task.editTask(req, function(err, results){
		console.log("results - "+results);
		res.json(results);
	});
}

exports.deleteTask = function(req, res){
	task.deleteTask(req, function(err, results){
		console.log("results - "+results);
		res.json(results);
	});
}

